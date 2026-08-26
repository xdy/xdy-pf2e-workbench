import type { ActorPF2e, Coins, ItemPF2e } from "foundry-pf2e";
import { GameSystem, getSystemId } from "../../utils/systems.ts";
import { MODULENAME } from "../../constants.ts";
import { I18N_SHARED } from "./helpers.ts";
import { logWarn } from "../../utils/logging.ts";
import { getModuleSetting, tryOrDefault } from "../../utils.ts";
import { postLearnChatMessage } from "./spellChatUtils.ts";
import type { DeductionResult } from "./types.ts";

export const MASTER_EARN_INCOME_PER_DAY_GP: Readonly<Record<number, number>> = {
    0: 0.05,
    1: 0.2,
    2: 0.3,
    3: 0.5,
    4: 0.8,
    5: 1,
    6: 2,
    7: 2.5,
    8: 3,
    9: 4,
    10: 6,
    11: 8,
    12: 10,
    13: 15,
    14: 20,
    15: 28,
    16: 36,
    17: 45,
    18: 70,
    19: 100,
    20: 150,
};

const COIN_MULTIPLIERS = { cp: 1, sp: 10, credits: 10, gp: 100, pp: 1000 } as const;

function isSf2e(): boolean {
    return getSystemId() === GameSystem.SF2E;
}

function currencyToCp(currency: Coins): number {
    return (
        (currency.cp ?? 0) +
        (currency.sp ?? 0) * COIN_MULTIPLIERS.sp +
        (currency.gp ?? 0) * COIN_MULTIPLIERS.gp +
        (currency.pp ?? 0) * COIN_MULTIPLIERS.pp +
        (currency.credits ?? 0) * COIN_MULTIPLIERS.credits
    );
}

export function getCostDenominationMultiplier(): number {
    return isSf2e() ? COIN_MULTIPLIERS.credits : COIN_MULTIPLIERS.gp;
}

export function formatCostForDisplay(copper: number): string {
    const sf2e = isSf2e();
    const amount = sf2e ? Math.ceil(copper / COIN_MULTIPLIERS.credits) : copper / COIN_MULTIPLIERS.gp;
    return game.i18n.format(`${I18N_SHARED}.${sf2e ? "currencyCredits" : "currencyGp"}`, { amount });
}

function canAffordCost(actor: ActorPF2e, amountCopper: number): boolean {
    if (!actor.inventory) return false;
    return currencyToCp(actor.inventory.currency) >= amountCopper;
}

async function deductCostFromActor(actor: ActorPF2e, amountCopper: number): Promise<DeductionResult> {
    if (!actor.inventory) {
        logWarn("economyHandler: no inventory for actor; cannot deduct cost");
        return { ok: false, debt: amountCopper };
    }

    const inventory = actor.inventory;
    const beforeCp = currencyToCp(inventory.currency);
    const coins: Record<string, number> = isSf2e()
        ? { sp: Math.ceil(amountCopper / COIN_MULTIPLIERS.sp) }
        : { gp: Math.ceil(amountCopper / COIN_MULTIPLIERS.gp) };
    const removed = await tryOrDefault(
        () => inventory.removeCurrency(coins, { byValue: true }),
        false,
        "economyHandler: removeCurrency",
    );
    if (!removed) {
        return { ok: false, debt: amountCopper };
    }

    const afterCp = currencyToCp(inventory.currency);
    const deductedCp = beforeCp - afterCp;

    if (deductedCp >= amountCopper) {
        return { ok: true, debt: 0 };
    }

    const debt = amountCopper - deductedCp;
    logWarn(
        `economyHandler: insufficient funds to deduct ${formatCostForDisplay(amountCopper)}; ${formatCostForDisplay(debt)} remaining`,
    );
    return { ok: false, debt };
}

interface CostDeductionParams {
    actor: ActorPF2e;
    costCopper: number;
    insufficientFundsKey?: string;
    spellName?: string;
}

type DebtItemContext = Pick<CostDeductionParams, "spellName">;

function isBlockedByInsufficientFunds(params: CostDeductionParams): boolean {
    if (params.costCopper <= 0) return false;
    if (getModuleSetting<boolean>("allowDebtItems")) return false;
    if (canAffordCost(params.actor, params.costCopper)) return false;
    const i18nKey = params.insufficientFundsKey ?? "insufficientFundsForLearn";
    postLearnChatMessage(params.actor, `${I18N_SHARED}.${i18nKey}`, {
        actor: params.actor.name,
        cost: formatCostForDisplay(params.costCopper),
        ...(params.spellName ? { spellName: params.spellName } : {}),
    });
    return true;
}

function buildDebtDescription(amountCopper: number, context?: DebtItemContext): string {
    const amount = formatCostForDisplay(amountCopper);
    const spellName = context?.spellName;

    const key = spellName ? "debtItemDescriptionForSpell" : "debtItemDescriptionNoSpellbook";
    return game.i18n.format(`${I18N_SHARED}.${key}`, { amount, spellName });
}

async function createDebtItem(
    actor: ActorPF2e,
    amountCopper: number,
    context?: DebtItemContext,
): Promise<ItemPF2e | null> {
    const itemData = buildDebtItemData(amountCopper, context);

    return tryOrDefault(
        async () => {
            const created = await actor.createEmbeddedDocuments("Item", [itemData] as unknown as Record<
                string,
                unknown
            >[]);
            const item = (created?.[0] as ItemPF2e) ?? null;
            if (item) {
                notifyDebtCreated(actor, amountCopper, context);
            }
            return item;
        },
        null,
        "economyHandler: createDebtItem",
    );
}

function buildDebtItemData(amountCopper: number, context?: DebtItemContext): Record<string, unknown> {
    const amount = formatCostForDisplay(amountCopper);
    const name = game.i18n.format(`${I18N_SHARED}.debtItemName`, { amount });
    const description = buildDebtDescription(amountCopper, context);

    return {
        name,
        type: "equipment",
        img: "icons/sundries/misc/piggybank.webp",
        system: {
            description: { value: description },
            price: { value: { cp: 0, sp: 0, gp: 0, pp: 0 } },
            quantity: 1,
            slug: `${MODULENAME}-debt-item-${foundry.utils.randomID(8)}`,
        },
    };
}

function notifyDebtCreated(actor: ActorPF2e, amountCopper: number, context?: DebtItemContext): void {
    const amount = formatCostForDisplay(amountCopper);
    if (context?.spellName) {
        postLearnChatMessage(actor, `${I18N_SHARED}.debtItemCreated`, {
            actor: actor.name,
            amount,
            spellName: context.spellName,
        });
    }
}

export async function executeCostDeduction(params: CostDeductionParams): Promise<boolean> {
    if (isBlockedByInsufficientFunds(params)) {
        return false;
    }

    const result = await deductCostFromActor(params.actor, params.costCopper);
    if (!result.ok) {
        const debtItem = await createDebtItem(params.actor, result.debt, {
            spellName: params.spellName,
        });
        return !!debtItem;
    }

    return true;
}

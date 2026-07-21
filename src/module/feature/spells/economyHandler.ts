import { ActorPF2e, Coins, ItemPF2e } from "foundry-pf2e";
import { GameSystem, getSystemId } from "../../utils/systems.ts";
import { I18N } from "./helpers.ts";
import { logWarn } from "../../utils/logging.ts";
import { getModuleSetting, tryOrDefault } from "../../utils.ts";
import { postLearnChatMessage } from "./spellChatUtils.ts";
import type { DeductionResult } from "./types.ts";

const COIN_MULTIPLIERS = { cp: 1, sp: 10, credits: 10, gp: 100, pp: 1000 } as const;

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
    return getSystemId() === GameSystem.SF2E ? COIN_MULTIPLIERS.credits : COIN_MULTIPLIERS.gp;
}

export function formatCostForDisplay(copper: number): string {
    const isSf2e = getSystemId() === GameSystem.SF2E;
    if (isSf2e) {
        const credits = Math.ceil(copper / COIN_MULTIPLIERS.credits);
        return `${credits} ${credits === 1 ? "credit" : "credits"}`;
    }
    return `${copper / COIN_MULTIPLIERS.gp} gp`;
}

function canAffordCost(actor: ActorPF2e, amountCopper: number): boolean {
    const inventory = actor.inventory ?? null;
    if (!inventory) return false;
    return currencyToCp(inventory.currency) >= amountCopper;
}

async function deductCostFromActor(actor: ActorPF2e, amountCopper: number): Promise<DeductionResult> {
    const inventory = actor.inventory ?? null;
    if (!inventory) {
        logWarn("economyHandler: no inventory for actor; cannot deduct cost");
        return { ok: false, debt: amountCopper };
    }

    const beforeCp = currencyToCp(inventory.currency);
    const coins: Record<string, number> =
        getSystemId() === GameSystem.SF2E
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
    spellName?: string;
    collectionName?: string;
}

type DebtItemContext = Pick<CostDeductionParams, "spellName" | "collectionName">;

function checkAndNotifyInsufficientFunds(params: CostDeductionParams): boolean {
    if (params.costCopper <= 0) return false;
    if (getModuleSetting<boolean>("allowDebtItems")) return false;
    if (canAffordCost(params.actor, params.costCopper)) return false;
    postLearnChatMessage(params.actor, "insufficientFundsForLearn", {
        actor: params.actor.name,
        cost: formatCostForDisplay(params.costCopper),
        spellName: params.spellName,
        collectionName: params.collectionName,
    });
    return true;
}

function buildDebtDescription(amountCopper: number, context?: DebtItemContext): string {
    const amount = formatCostForDisplay(amountCopper);
    const spellName = context?.spellName;
    const collectionName = context?.collectionName;

    if (collectionName) {
        return spellName
            ? game.i18n.format(`${I18N}.debtItemDescription`, { amount, spells: spellName, collectionName })
            : game.i18n.format(`${I18N}.debtItemDescriptionNoSpells`, { amount, collectionName });
    }
    return spellName
        ? game.i18n.format(`${I18N}.debtItemDescriptionForSpell`, { amount, spellName })
        : game.i18n.format(`${I18N}.debtItemDescriptionNoSpellbook`, { amount });
}

async function createDebtItem(
    actor: ActorPF2e,
    amountCopper: number,
    context?: DebtItemContext,
): Promise<ItemPF2e | null> {
    const amount = formatCostForDisplay(amountCopper);
    const name = game.i18n.format(`${I18N}.debtItemName`, { amount });
    const description = buildDebtDescription(amountCopper, context);

    const itemData = {
        name,
        type: "equipment",
        img: "icons/sundries/misc/piggybank.webp",
        system: {
            description: { value: description },
            price: { value: { cp: 0, sp: 0, gp: 0, pp: 0 } },
            quantity: 1,
            slug: `xdy-spell-debt-item-${foundry.utils.randomID(8)}`,
        },
    };

    return tryOrDefault(
        async () => {
            // A bit ugly, but I'll use record here instead of a ts-expect-error that I'll never fix.
            const created = await actor.createEmbeddedDocuments("Item", [itemData] as unknown as Record<
                string,
                unknown
            >[]);
            const item = (created?.[0] as ItemPF2e) ?? null;
            if (item) {
                postLearnChatMessage(actor, "debtItemCreated", {
                    actor: actor.name,
                    amount,
                    spellName: context?.spellName,
                });
            }
            return item;
        },
        null,
        "economyHandler: createDebtItem",
    );
}

export async function executeCostDeduction(params: CostDeductionParams): Promise<boolean> {
    if (checkAndNotifyInsufficientFunds(params)) {
        return false;
    }

    const result = await deductCostFromActor(params.actor, params.costCopper);
    if (!result.ok) {
        const debtItem = await createDebtItem(params.actor, result.debt, {
            spellName: params.spellName,
            collectionName: params.collectionName,
        });
        // If a debt item was created, treat the deduction as satisfied.
        if (debtItem) return true;
        return false;
    }

    return true;
}

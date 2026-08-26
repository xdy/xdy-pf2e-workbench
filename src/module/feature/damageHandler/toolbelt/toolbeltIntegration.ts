import { MODULENAME } from "../../../constants.ts";
import { getModuleSetting } from "../../../utils.ts";
import * as systems from "../../../utils/systems.ts";
import { ChatMessagePF2e } from "foundry-pf2e";
import type { AutoRollDamageOptions } from "./toolbeltTypes.ts";
import {
    cacheToolbeltTargetHelperData,
    consumePendingInjection,
    deleteCachedToolbeltTargetHelperData,
    getEffectiveToolbeltTargetHelperData,
} from "./toolbeltCache.ts";

type LibWrapperApi = { register: (...args: unknown[]) => void };
type ChatMessageWrapper = (
    this: ChatMessagePF2e,
    wrapped: (...args: unknown[]) => Promise<unknown>,
    ...args: unknown[]
) => Promise<unknown>;

function wrapChatMessage(method: string, fn: ChatMessageWrapper): void {
    const api = (globalThis as unknown as { libWrapper?: LibWrapperApi }).libWrapper;
    api?.register(MODULENAME, method, fn, "WRAPPER");
}

let toolbeltWrappersRegistered = false;

export function isToolbeltIntegrationActive(): boolean {
    const autoRollSpell = getModuleSetting<string>("autoRollDamageForSpellWhenNotAnAttack");
    return (
        getModuleSetting<boolean>("experimentalToolbeltSaveIntegration") &&
        getModuleSetting<string>("autoRollDamageAllow") !== "none" &&
        ["saveSpell", "anySpell"].includes(autoRollSpell) &&
        !!game.modules.get("pf2e-toolbelt")?.active
    );
}

export function registerToolbeltWrappers(): void {
    if (toolbeltWrappersRegistered) {
        return;
    }

    if (!(globalThis as unknown as { libWrapper?: LibWrapperApi }).libWrapper) {
        return;
    }

    wrapChatMessage("ChatMessage.prototype.update", function (this, wrapped, changes, ...args) {
        cacheToolbeltTargetHelperData(this.id, readTargetHelperFromUpdate(changes as Record<string, unknown>));
        return wrapped(changes, ...args);
    });

    wrapChatMessage("ChatMessage.prototype.setFlag", function (this, wrapped, scope, key, value, ...args) {
        if (scope === "pf2e-toolbelt" && key === "targetHelper") {
            if (value && typeof value === "object") {
                cacheToolbeltTargetHelperData(this.id, value);
            } else {
                deleteCachedToolbeltTargetHelperData(this.id);
            }
        }
        return wrapped(scope, key, value, ...args);
    });

    wrapChatMessage("ChatMessage.prototype._preCreate", function (this, wrapped, data, ...args) {
        const originUuid = systems.getFlag<string>(this, "origin.uuid");
        if (this.isDamageRoll && originUuid) {
            const pending = consumePendingInjection(originUuid);
            if (pending) {
                this.updateSource({
                    flags: { "pf2e-toolbelt": { targetHelper: pending.targetHelperData } },
                });
            }
        }
        return wrapped(data, ...args);
    });

    toolbeltWrappersRegistered = true;
}

function readTargetHelperFromUpdate(changes: Record<string, unknown>): unknown {
    const flattened = changes["flags.pf2e-toolbelt.targetHelper"];
    if (flattened !== undefined) {
        return flattened;
    }

    const flags = changes.flags;
    if (!flags || typeof flags !== "object") {
        return undefined;
    }

    const pf2eToolbelt = (flags as Record<string, unknown>)["pf2e-toolbelt"];
    if (!pf2eToolbelt || typeof pf2eToolbelt !== "object") {
        return undefined;
    }

    return (pf2eToolbelt as Record<string, unknown>).targetHelper;
}

export function isExperimentalToolbeltSaveIntegrationEnabled(): boolean {
    return getModuleSetting<boolean>("experimentalToolbeltSaveIntegration");
}

export function shouldWaitForToolbeltTargetHelper(
    message: ChatMessagePF2e,
    rollForNonAttackSaveSpell: boolean,
    options: AutoRollDamageOptions,
): boolean {
    if (options.ignoreToolbeltTargetHelperWait) {
        return false;
    }

    return (
        isExperimentalToolbeltSaveIntegrationEnabled() &&
        rollForNonAttackSaveSpell &&
        getEffectiveToolbeltTargetHelperData(message)?.type === "spell"
    );
}

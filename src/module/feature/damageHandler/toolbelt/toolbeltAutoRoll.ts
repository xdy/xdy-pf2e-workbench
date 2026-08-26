import { MODULENAME } from "../../../constants.ts";
import { logError } from "../../../utils/logging.ts";
import { ChatMessagePF2e } from "foundry-pf2e";
import { autoRollDamage } from "../index.ts";
import type { ToolbeltRollSaveHookPayload } from "./toolbeltTypes.ts";
import {
    getEffectiveToolbeltTargetHelperData,
    getOrCreateToolbeltTrackerState,
    getToolbeltExpectedTargetIds,
    getToolbeltPayloadTargetId,
    getToolbeltSavedTargetIds,
    getToolbeltSaveOutcomes,
    isToolbeltBasicSave,
    isToolbeltSaveSuccessOutcome,
    shouldRollToolbeltSaveSpellDamage,
} from "./toolbeltCache.ts";
import { isToolbeltIntegrationActive } from "./toolbeltIntegration.ts";

export async function handlePf2eToolbeltRollSave(payload: ToolbeltRollSaveHookPayload): Promise<void> {
    if (!isToolbeltIntegrationActive()) {
        return;
    }

    const hookMessage = payload.message;
    const message = (game.messages.get(hookMessage.id) as ChatMessagePF2e | undefined) ?? hookMessage;
    const toolbeltData = getEffectiveToolbeltTargetHelperData(message);

    if (toolbeltData?.type !== "spell") {
        return;
    }

    const expectedTargetIds = getToolbeltExpectedTargetIds(toolbeltData);
    if (expectedTargetIds.size === 0) {
        return;
    }

    const state = getOrCreateToolbeltTrackerState(message.id, expectedTargetIds);

    if (state.completed) {
        return;
    }

    state.hasBasicSave ||= isToolbeltBasicSave(toolbeltData);
    for (const savedTargetId of getToolbeltSavedTargetIds(toolbeltData)) {
        state.savedTargetIds.add(savedTargetId);
    }
    for (const outcome of getToolbeltSaveOutcomes(toolbeltData)) {
        state.saveOutcomes.add(outcome);
    }
    const payloadTargetId = getToolbeltPayloadTargetId(payload.target);
    if (payloadTargetId) {
        state.savedTargetIds.add(payloadTargetId);
    }
    const payloadSuccessOutcome = isToolbeltSaveSuccessOutcome(payload.data?.success) ? payload.data?.success : null;
    if (payloadSuccessOutcome) {
        state.saveOutcomes.add(payloadSuccessOutcome);
    }
    state.updatedAt = Date.now();

    const toolbeltFlags = message.flags?.["pf2e-toolbelt"];
    const toolbeltFlagsCleared =
        !!toolbeltFlags && typeof toolbeltFlags === "object" && Object.keys(toolbeltFlags).length === 0;
    if (toolbeltFlagsCleared) {
        return;
    }

    const allSaved =
        state.expectedTargetIds.size > 0 && [...state.expectedTargetIds].every((id) => state.savedTargetIds.has(id));
    if (!allSaved) {
        return;
    }

    if (!shouldRollToolbeltSaveSpellDamage(state)) {
        state.completed = true;
        return;
    }

    await waitForToolbeltFlagFlush(message, state.expectedTargetIds.size);

    try {
        await autoRollDamage(message, {
            ignoreToolbeltTargetHelperWait: true,
            forceSaveSpellRoll: true,
            forcedDegreeOfSuccess: "failure",
        });
        state.completed = true;
    } catch (error) {
        logError(`${MODULENAME} | Toolbelt save spell auto-roll failed`, error);
        ui.notifications.error(
            game.i18n.format(`${MODULENAME}.toolbeltAutoRollFailed`, { spell: message.flavor ?? "" }),
        );
    }
}

async function waitForToolbeltFlagFlush(message: ChatMessagePF2e, expectedTargetCount: number): Promise<void> {
    const deadline = Date.now() + 2000;
    while (Date.now() < deadline) {
        const currentData = getEffectiveToolbeltTargetHelperData(message);
        if (currentData && getToolbeltSavedTargetIds(currentData).size >= expectedTargetCount) {
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
    }
}

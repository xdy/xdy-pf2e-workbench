import { handleAsync } from "../utils.js";
import {
    handlePf2eToolbeltRollSave,
    ToolbeltRollSaveHookPayload,
} from "../feature/damageHandler/toolbeltIntegration.ts";

export function pf2eToolbeltRollSaveHook(payload: ToolbeltRollSaveHookPayload): void {
    handleAsync(handlePf2eToolbeltRollSave(payload), "pf2eToolbeltRollSaveHook");
}

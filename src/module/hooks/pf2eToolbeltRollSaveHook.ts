import { fireAndForget } from "../utils.ts";
import {
    handlePf2eToolbeltRollSave,
    ToolbeltRollSaveHookPayload,
} from "../feature/damageHandler/toolbeltIntegration.ts";

export function pf2eToolbeltRollSaveHook(payload: ToolbeltRollSaveHookPayload): void {
    fireAndForget(handlePf2eToolbeltRollSave(payload), "pf2eToolbeltRollSaveHook");
}

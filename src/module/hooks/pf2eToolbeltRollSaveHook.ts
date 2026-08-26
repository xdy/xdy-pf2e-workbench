import { fireAndForget } from "../utils.ts";
import type { ToolbeltRollSaveHookPayload } from "../feature/damageHandler/toolbelt/toolbeltTypes.ts";
import { handlePf2eToolbeltRollSave } from "../feature/damageHandler/toolbelt/toolbeltAutoRoll.ts";

export function pf2eToolbeltRollSaveHook(payload: ToolbeltRollSaveHookPayload): void {
    fireAndForget(handlePf2eToolbeltRollSave(payload), "pf2eToolbeltRollSaveHook");
}

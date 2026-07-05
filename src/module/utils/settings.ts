import { MODULENAME } from "../constants.ts";

export function isAllowedFor(allowSettingKey: string, role: "player" | "gm"): boolean {
    const value = game.settings.get(MODULENAME, allowSettingKey) as string;
    if (value === "all") return true;
    if (role === "player") return value === "players";
    if (role === "gm") return value === "gm";
    return false;
}

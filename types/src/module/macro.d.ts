import { TokenPF2e } from "./canvas/index.ts";
import { ActorPF2e } from "./documents.ts";
export declare class MacroPF2e extends Macro {
    /** Raise permission requirement of world macro visibility to observer */
    get visible(): boolean;
    /** Wrap script `command` in curly braces to place macro-execution parameters in outer scope  */
    execute(scope?: {
        actor?: ActorPF2e;
        token?: TokenPF2e;
    } | undefined): unknown;
}

import { TokenPF2e } from "../token/index.ts";
export declare class TokenLayerPF2e<TToken extends TokenPF2e = TokenPF2e> extends TokenLayer<TToken> {
    /** Cycle Z indices of a hovered token stack */
    cycleStack(): boolean;
}

import type { CreaturePF2e } from "@actor/creature/document.ts";
import { PrototypeTokenPF2e } from "@actor/data/base.ts";
import type { TokenDocumentPF2e } from "@scene";
/** Check for auras containing newly-placed or moved tokens */
declare const checkAuras: () => void;
/** Assigns detection modes and sight settings for either a token or prototype token assuming RBV is enabled. */
declare function computeSightAndDetectionForRBV(token: TokenDocumentPF2e | PrototypeTokenPF2e<CreaturePF2e>): void;
export { checkAuras, computeSightAndDetectionForRBV };

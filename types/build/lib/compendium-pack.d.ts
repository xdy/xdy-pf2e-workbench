import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { RuleElementSource } from "@module/rules/index.ts";
import { PackError } from "./helpers.ts";
import { PackEntry } from "./types.ts";
interface PackMetadata {
    system: string;
    name: string;
    path: string;
    type: string;
}
/** A rule element, possibly an Aura, ChoiceSet, GrantItem */
interface REMaybeWithUUIDs extends RuleElementSource {
    effects?: unknown[];
    choices?: Record<string, string | {
        value?: string;
    }>;
    uuid?: unknown;
}
declare function isActorSource(docSource: PackEntry): docSource is ActorSourcePF2e;
declare function isItemSource(docSource: PackEntry): docSource is ItemSourcePF2e;
declare class CompendiumPack {
    #private;
    packId: string;
    packDir: string;
    documentType: string;
    systemId: string;
    data: PackEntry[];
    static outDir: string;
    private static namesToIds;
    private static packsMetadata;
    static LINK_PATTERNS: {
        world: RegExp;
        compendium: RegExp;
        uuid: RegExp;
    };
    constructor(packDir: string, parsedData: unknown[]);
    static loadJSON(dirPath: string): CompendiumPack;
    /** Convert UUIDs in REs to resemble links by name or back again */
    static convertRuleUUIDs(source: ItemSourcePF2e, { to, map }: {
        to: "ids" | "names";
        map: Map<string, Map<string, string>>;
    }): void;
    save(): number;
}
export { CompendiumPack, PackError, PackMetadata, isItemSource, isActorSource, REMaybeWithUUIDs };

import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { RuleElementSource } from "@module/rules";
interface PackMetadata {
    system: string;
    name: string;
    path: string;
    type: string;
}
declare const PackError: (message: string) => never;
/** A rule element, possibly an Aura, ChoiceSet, GrantItem */
interface REMaybeWithUUIDs extends RuleElementSource {
    effects?: unknown[];
    choices?: Record<string, string | {
        value?: string;
    }>;
    uuid?: unknown;
}
type CompendiumSource = CompendiumDocument["_source"];
declare function isActorSource(docSource: CompendiumSource): docSource is ActorSourcePF2e;
declare function isItemSource(docSource: CompendiumSource): docSource is ItemSourcePF2e;
declare class CompendiumPack {
    #private;
    packId: string;
    packDir: string;
    documentType: string;
    systemId: string;
    data: CompendiumSource[];
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

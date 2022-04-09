import { ItemSourcePF2e } from "@item/data";
import { ActorSourcePF2e } from "@actor/data";
import { RuleElementSource } from "@module/rules";
export interface PackMetadata {
    system: string;
    name: string;
    path: string;
    type: string;
}
export declare const PackError: (message: string) => never;
/** A rule element, possibly a ChoiceSet or GrantItem */
export interface REMaybeChoiceGrant extends RuleElementSource {
    choices?: Record<string, string | {
        value?: string;
    }>;
    uuid?: unknown;
}
declare type CompendiumSource = CompendiumDocument["data"]["_source"];
export declare function isActorSource(docSource: CompendiumSource): docSource is ActorSourcePF2e;
export declare function isItemSource(docSource: CompendiumSource): docSource is ItemSourcePF2e;
export declare class CompendiumPack {
    name: string;
    packDir: string;
    documentType: string;
    systemId: string;
    data: CompendiumSource[];
    static outDir: string;
    private static namesToIds;
    private static packsMetadata;
    private static worldItemLinkPattern;
    constructor(packDir: string, parsedData: unknown[]);
    static loadJSON(dirPath: string): CompendiumPack;
    private finalize;
    private sourceIdOf;
    /** Convert UUIDs in ChoiceSet/GrantItem REs to resemble links by name or back again */
    static convertRuleUUIDs(source: ItemSourcePF2e, { to, map }: {
        to: "ids" | "names";
        map: Map<string, Map<string, string>>;
    }): void;
    save(): number;
    private isDocumentSource;
    private isPackData;
}
export {};

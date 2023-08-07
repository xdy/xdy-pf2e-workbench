import type { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { RuleElementSource } from "@module/rules/index.ts";
import { PackError } from "./helpers.ts";
import { PackEntry } from "./types.ts";
import { DBFolder } from "./level-database.ts";
interface PackMetadata {
    system: string;
    name: string;
    path: string;
    type: CompendiumDocumentType;
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
    documentType: CompendiumDocumentType;
    systemId: string;
    data: PackEntry[];
    folders: DBFolder[];
    static outDir: string;
    static LINK_PATTERNS: {
        world: RegExp;
        compendium: RegExp;
        uuid: RegExp;
    };
    constructor(packDir: string, parsedData: unknown[], parsedFolders: unknown[]);
    static loadJSON(dirPath: string): CompendiumPack;
    finalizeAll(): PackEntry[];
    /** Convert UUIDs in REs to resemble links by name or back again */
    static convertRuleUUIDs(source: ItemSourcePF2e, { to, map }: {
        to: "ids" | "names";
        map: Map<string, Map<string, string>>;
    }): void;
    save(asJson?: boolean): Promise<number>;
    saveAsJSON(): Promise<number>;
}
export { CompendiumPack, PackError, PackMetadata, isItemSource, isActorSource, REMaybeWithUUIDs };
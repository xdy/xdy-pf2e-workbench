//Until using the full types, this file has minimal definitions

export interface RollOptionFlags {
    all: Record<string, boolean | undefined>;

    [key: string]: Record<string, boolean | undefined> | undefined;
}

type CompendiumUUID = `Compendium.${string}.${string}`;
type ActorUUID = `Actor.${string}` | CompendiumUUID;

interface ActorFlags {
    core?: {
        sourceId: ActorUUID;
    };

    [key: string]: Record<string, unknown> | undefined;
}

export interface ActorFlagsPF2e extends ActorFlags {
    pf2e: {
        rollOptions: RollOptionFlags;
        freeCrafting: boolean;
        quickAlchemy: boolean;
        [key: string]: unknown;
    };
}

export interface SpellData {
    level: number;
}

export interface SpellSource {
    readonly data: SpellData;
}

export interface SpellPF2e {
    readonly data: SpellSource;
}

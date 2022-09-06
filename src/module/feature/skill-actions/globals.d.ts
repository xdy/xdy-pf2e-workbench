import { ActorSkillAction } from "./skill-actions";

export type Rank = 0 | 1 | 2 | 3 | 4;

interface CharacterSkillData {
    label?: string;
    name: string;
    rank: Rank;
    value: number;
    modifiers: ModifierPF2e[];
}

export interface PF2eActorFlag {
    actions: Record<string, ActorSkillAction>;
    allVisible: boolean;
}

import { ActorSkillAction } from "./skill-actions";

export type Rank = 0 | 1 | 2 | 3 | 4;
export interface PF2eActorFlag {
    actions: Record<string, ActorSkillAction>;
    allVisible: boolean;
}

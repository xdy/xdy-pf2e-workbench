import { UserPF2e } from "@module/user";
import { ItemPF2e } from "../base";
import { ConditionData, ConditionSlug } from "./data";
export declare class ConditionPF2e extends ItemPF2e {
    static get schema(): typeof ConditionData;
    /** Forthcoming universal "effect badge" */
    get badge(): {
        value: number;
    } | null;
    get value(): number | null;
    get duration(): number | null;
    /** Is the condition currently active? */
    get isActive(): boolean;
    /** Is the condition from the pf2e system or a module? */
    get fromSystem(): boolean;
    /** Is the condition found in the token HUD menu? */
    get isInHUD(): boolean;
    /** Ensure value.isValued and value.value are in sync */
    prepareBaseData(): void;
    /** Set a self roll option for this condition */
    prepareActorData(this: Embedded<ConditionPF2e>): void;
    protected _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: ConditionModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _onCreate(data: this["data"]["_source"], options: DocumentModificationContext<this>, userId: string): void;
    protected _onUpdate(changed: DeepPartial<this["data"]["_source"]>, options: ConditionModificationContext<this>, userId: string): void;
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
export interface ConditionPF2e {
    readonly data: ConditionData;
    get slug(): ConditionSlug;
}
export interface ConditionModificationContext<T extends ConditionPF2e> extends DocumentModificationContext<T> {
    conditionValue?: number | null;
}

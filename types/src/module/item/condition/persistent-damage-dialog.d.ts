/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import { DamageType } from "@system/damage/types.ts";
declare class PersistentDamageDialog extends Application<PersistentDamageDialogOptions> {
    #private;
    private actor;
    constructor(actor: ActorPF2e, options?: Partial<PersistentDamageDialogOptions>);
    static get defaultOptions(): ApplicationOptions;
    /** Override to guarantee one persistent damage dialog per actor */
    get id(): string;
    get title(): string;
    getData(): Promise<PersistentDialogData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Overriden to autofocus on first render behavior */
    protected _injectHTML($html: JQuery<HTMLElement>): void;
}
interface PersistentDamageDialogOptions extends ApplicationOptions {
    editing?: string;
}
interface PersistentDialogData {
    existing: DamageEntryData[];
    damageTypes: DamageTypeData[];
}
interface DamageEntryData {
    id: string;
    bullet: string;
    active: boolean;
    formula: string;
    damageType: DamageType;
    dc: number;
}
interface DamageTypeData {
    type: string;
    iconClass: string;
    label: string;
}
export { PersistentDamageDialog as PersistentDialog };

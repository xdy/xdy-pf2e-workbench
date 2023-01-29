/** Disable Active Effects */
export declare class ActiveEffectPF2e extends ActiveEffect {
    constructor(data: DeepPartial<foundry.data.ActiveEffectSource>, context?: DocumentConstructionContext<ActiveEffectPF2e>);
    static createDocuments<T extends foundry.abstract.Document>(this: ConstructorOf<T>): Promise<T[]>;
}

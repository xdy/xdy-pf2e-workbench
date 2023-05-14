// I really shouldn't have to keep this, but, webpack complains if I use the pf2e one. Ah well...

export class ModifierPF2e {
    adjustments: any[];
    label: string;
    modifier: number;
    type: string;

    constructor(data: Pick<ModifierPF2e, "label" | "modifier" | "type">) {
        this.label = data.label;
        this.modifier = data.modifier;
        this.type = data.type;
        this.adjustments = data["adjustments"] ?? [];
    }

    update() {
        return undefined;
    }

    test() {
        return undefined;
    }
}

export declare class TokenEffect implements TemporaryEffect {
    data: {
        disabled: boolean;
        icon: string;
        tint: string;
    };
    readonly isTemporary = true;
    readonly flags: Record<string, Record<string, string | boolean | undefined>>;
    constructor(icon: string, overlay?: boolean, tint?: string | null | undefined);
    getFlag(scope: string, flag: string): string | boolean | undefined;
}

export declare class TokenEffect implements TemporaryEffect {
    disabled: boolean;
    icon: ImageFilePath;
    tint?: string;
    readonly isTemporary = true;
    readonly flags: Record<string, Record<string, string | boolean | undefined>>;
    constructor(icon: ImageFilePath, overlay?: boolean, tint?: string | null | undefined);
    getFlag(scope: string, flag: string): string | boolean | undefined;
}

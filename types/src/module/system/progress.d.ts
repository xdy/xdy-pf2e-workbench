/**
 * Quick and dirty API around the Loading bar.
 * Does not handle conflicts; multiple instances of this class will fight for the same loading bar, but once all but
 * once are completed, the bar should return to normal
 *
 * @category Other
 */
declare class Progress {
    value: number;
    readonly max: number;
    /** An initial label: overridable while advancing */
    label: string;
    constructor({ max, label }: {
        max: number;
        label?: string;
    });
    advance({ by, label }?: {
        by?: number;
        label?: string;
    }): void;
    close({ label }?: {
        label?: string | undefined;
    }): void;
}
export { Progress };

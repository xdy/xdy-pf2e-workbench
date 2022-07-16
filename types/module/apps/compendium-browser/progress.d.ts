/**
 * Quick and dirty API around the Loading bar.
 * Does not handle conflicts; multiple instances of this class will fight for the same loading bar, but once all but
 * once are completed, the bar should return to normal
 *
 * @category Other
 */
export declare class Progress {
    private steps;
    private counter;
    private label;
    constructor({ steps }?: {
        steps?: number | undefined;
    });
    advance(label: string): void;
    close(label?: string): void;
    private updateUI;
}

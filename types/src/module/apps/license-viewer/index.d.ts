export declare class LicenseViewer extends Application {
    static get defaultOptions(): ApplicationOptions & {
        id: string;
        title: string;
        template: string;
        width: number;
        height: number;
        resizable: boolean;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
    };
}

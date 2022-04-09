import "../../static/templates/**/*.html";
export declare class TemplatePreloader {
    /**
     * Preload a set of templates to compile and cache them for fast access during rendering
     */
    static preloadHandlebarsTemplates(): Promise<void>;
    static watch(): void;
}

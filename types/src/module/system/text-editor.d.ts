import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { UserVisibility } from "@scripts/ui/user-visibility";
/** Censor enriched HTML according to metagame knowledge settings */
declare class TextEditorPF2e extends TextEditor {
    #private;
    static enrichHTML(content?: string, options?: EnrichHTMLOptionsPF2e & {
        async?: false;
    }): string;
    static enrichHTML(content?: string, options?: EnrichHTMLOptionsPF2e & {
        async: true;
    }): Promise<string>;
    static enrichHTML(content?: string, options?: EnrichHTMLOptionsPF2e): string;
    static processUserVisibility(content: string, options: EnrichHTMLOptionsPF2e): string;
    static enrichString(data: RegExpMatchArray, options?: EnrichHTMLOptionsPF2e): Promise<HTMLElement | null>;
    /**
     * Convert an XML node into an HTML span element with data-visibility, data-whose, and class attributes
     * @param html    The HTML element containing the XML node: mutated by this method as part of node replacement
     * @param name    The name of the node to convert
     * @param options attributes to add to the generated span element
     * @returns The generated span element, or `null` if no `name` node was found
     */
    static convertXMLNode(html: HTMLElement, name: string, { visibility, whose, classes }: ConvertXMLNodeOptions): HTMLElement | null;
}
interface EnrichHTMLOptionsPF2e extends EnrichHTMLOptions {
    rollData?: {
        actor?: ActorPF2e | null;
        item?: ItemPF2e | null;
        mod?: number;
        [key: string]: unknown;
    };
}
interface ConvertXMLNodeOptions {
    /** The value of the data-visibility attribute to add to the span element */
    visibility?: UserVisibility | null;
    /**
     * Whether this piece of data belongs to the "self" actor or the target: used by UserVisibilityPF2e to
     * determine which actor's ownership to check
     */
    whose?: "self" | "target";
    /** Any additional classes to add to the span element */
    classes?: string[];
}
export { TextEditorPF2e, EnrichHTMLOptionsPF2e };

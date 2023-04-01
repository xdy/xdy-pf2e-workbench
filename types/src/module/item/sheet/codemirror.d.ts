import { EditorView } from "codemirror";
import { json } from "@codemirror/lang-json";
import { DataSchema } from "types/foundry/common/data/fields.mjs";
export declare const CodeMirror: {
    EditorView: typeof EditorView;
    basicSetup: import("@codemirror/state").Extension;
    json: typeof json;
    jsonLinter: () => import("@codemirror/state").Extension;
    keybindings: import("@codemirror/state").Extension;
    /** All language and autocomplete extensions for rule element editing */
    ruleElementExtensions: (options: RuleElementOptions) => import("@codemirror/state").Extension[];
};
interface RuleElementOptions {
    schema?: DataSchema;
}
export {};

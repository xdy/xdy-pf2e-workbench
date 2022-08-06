import { EditorView } from "codemirror";
import { json } from "@codemirror/lang-json";
export declare const CodeMirror: {
    EditorView: typeof EditorView;
    basicSetup: import("@codemirror/state").Extension;
    json: typeof json;
    jsonLinter: () => import("@codemirror/state").Extension;
    keybindings: import("@codemirror/state").Extension;
};

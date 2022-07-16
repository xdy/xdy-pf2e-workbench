import { EditorState, EditorView } from "@codemirror/basic-setup";
import { json } from "@codemirror/lang-json";
export declare const CodeMirror: {
    EditorState: typeof EditorState;
    EditorView: typeof EditorView;
    basicSetup: import("@codemirror/state").Extension;
    json: typeof json;
    jsonLinter: () => import("@codemirror/state").Extension;
    keybindings: import("@codemirror/state").Extension;
};

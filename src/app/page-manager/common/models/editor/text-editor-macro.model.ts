import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { TextEditorMacroPadding } from "./text-editor-macro-padding.model";

export class TextEditorMacro extends BaseModel{
    dbId: string;
    name: string;
    align: string;
    background: string;
    bold: boolean;
    color: string;
    font: string;
    size: string;
    textTransform: string;
    padding: TextEditorMacroPadding = {... new TextEditorMacroPadding()};
}

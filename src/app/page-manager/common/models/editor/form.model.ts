import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { Tag } from "../store/products.model";
import { CardComponentUrl } from "./card.model";

export class Form extends BaseModel{
  type: string = 'Form';
  dbId: string;
  name: string;
  rows: FormRow[] = [];
  form_color: string =  '#ffffff';
  form_section: string = 'Card';
  row_height: number;
  usePlaceholder: boolean;
  header?: FormHeader = {...new FormHeader()};
  button: FormButton = {...new FormButton()};
  submitted_form_id: string;
  position: string;
}

export class FormHeader {
  header_value?: string;
  sub_header_value?: string;
  line?: boolean;
  line_height?: number;
  line_width?: number;
  line_color?: string;
}

export class FormRow {
  distribution: string = 'Even';
  index: number;
  inputs: FormInputs[] = [];
  row_height;
}

export class FormButton {
  position: string;
  button_name: string;
  link_external?: boolean;
  button_style?: string;
  button_size?: number;
  button_border?: number;
  button_area?: string;
  button_margin_top?: number;
  button_margin_left?: number;
  link?: CardComponentUrl = {... new CardComponentUrl()};
}

export class FormInputs {
  dbId?: string;
  name?: string;
  overlay_image?: boolean = false;
  input_type?: string;
  span?: number = 100;
  text?: FormInputText = {...new FormInputText()};
  select?: FormInputSelect = {...new FormInputSelect()};
  textarea?: FormInputTextArea = {...new FormInputTextArea()};
  boolean?: FormInputBoolean = {...new FormInputBoolean()};
  date?: FormInputDate = {...new FormInputDate()};
  dateTime?: FormInputDateTime = {...new FormInputDateTime()};
  multipleCheckbox?: FormInputMultipleCheckbox = {...new FormInputMultipleCheckbox()};
  singleCheckbox?: FormInputSingleCheckbox = {...new FormInputSingleCheckbox()};
  number?: FormInputNumber = {...new FormInputNumber()};
  radioButtons?: FormInputRadioButtons = {...new FormInputRadioButtons()};
  result_order: number;
  required: boolean = false;
}
export class FormInputText {
  html: string;
  label: string;
  field_name: string;
}

export class FormInputSelect {
  label: string;
  select_values: Tag[] = [];
  field_name: string;
}

export class FormInputTextArea {
  label: string;
  height: number;
  field_name: string;
}

export class FormInputBoolean {
  label: string;
  field_name: string;
  on_value?: string;
  off_value?: string;
}
export class FormInputDate {
  label: string;
  field_name: string;
}
export class FormInputDateTime {
  label: string;
  field_name: string;
}
export class FormInputMultipleCheckbox {
  label: string;
  field_name: string;
  check_values: Tag[] = [];
}
export class FormInputSingleCheckbox {
  label: string;
  field_name: string;
}
export class FormInputNumber {
  label: string;
  field_name: string;
}
export class FormInputRadioButtons {
  label: string;
  field_name: string;
  radio_values: Tag[] = [];
}

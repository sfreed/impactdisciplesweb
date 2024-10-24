import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { Tag } from "../store/products.model";

export class Card extends BaseModel{
  type: string = 'Card';
  name: string;
  rows: CardRow[] = [];
  card_color: string =  '#ffffff';
  card_section: string = 'Card';
  line?: boolean;
  line_height?: number;
  line_width?: number;
  line_color?: string;

}

export class CardComponent extends BaseModel{
  name?: string;
  overlay_image?: boolean = false;
  card_type?: string;
  span?: number = 100;
  header?: CardComponentHeader = {...new CardComponentHeader()} ;
  content?: CardComponentContent = {...new CardComponentContent()} ;
  image?: CardComponentImage = {...new CardComponentImage()} ;
  video?: CardComponentVideo = {...new CardComponentVideo()} ;
  iframe?: CardComponentIFrame = {...new CardComponentIFrame()} ;
  custom_item?: CardComponentCustom = {...new CardComponentCustom()} ;
  gallery?: CardComponentGallery = {...new CardComponentGallery()} ;
  testimonial?: CardComponentTestimonial = {...new CardComponentTestimonial()};
  team_member?: CardComponentTeamMember = {...new CardComponentTeamMember()};
  form?: CardComponentForm = {...new CardComponentForm()};
  footer?: CardComponentFooter = {...new CardComponentFooter()} ;
  button?: CardComponentButton = {...new CardComponentButton()};
}

export class CardComponentButton {
  type?: string;
  link_external?: boolean;
  button_style?: string;
  button_name?: string;
  button_size?: number;
  button_border?: number;
  button_area?: string;
  button_margin_top?: number;
  button_margin_left?: number;
  link?: CardComponentUrl = {... new CardComponentUrl()};
}

export class CardRow {
  distribution: string = 'Even';
  index: number;
  components: CardComponent[] = [];
  row_height?: number;
}

export class CardComponentHeader {
  header_value?: string;
  sub_header_value?: string;
  line?: boolean;
  line_height?: number;
  line_width?: number;
  line_color?: string;
}

export class CardComponentFooter{
  type?: string;
  link_external?: boolean;
  image?: CardComponentImage = {... new CardComponentImage()};
  link?: CardComponentUrl = {... new CardComponentUrl()};
  button_style?: string;
  button_name?: string;
  html?: string;
}

export class CardComponentForm{
  name: string;
  items: CardComponentFormItem[] = [];
  width: number = 400;
  submitted_form_id: string;
  alignment: string;
  usePlaceholder: boolean;
  margin_top?: number;
  margin_bottom?: number;
  button?: boolean;
  type?: string;
  link_external?: boolean;
  button_style?: string;
  button_name?: string;
  button_size?: number;
  button_border?: number;
  button_area?: string;
  button_margin_top?: number;
  button_margin_left?: number;
  link?: CardComponentUrl = {... new CardComponentUrl()};
}

export class CardComponentFormItem{
  label: string;
  field_name: string;
  data_type: string;
  select_values: Tag[] = [];
  check_values: Tag[] = [];
  radio_values: Tag[] = [];
  on_value?: string;
  off_value?: string;
  height?: number;
}

export class CardComponentImage {
  name: string;
  url: string;
  height: number;
  width?: number;
  opacity?: number;
  color?: string;
  radius?: number;
  view?: string;
  link_external?: boolean;
  click_url?: string;
}

export class CardComponentIFrame {
  name: string;
  url: string;
  height: number;
  width?: number;
}

export class CardComponentUrl {
  label: string;
  link: string;
}

export class CardComponentCustom {
  html: string;
  script_source_file?: string;
  custom_script?: string;
}

export class CardComponentContent {
  html: string;
  margin_left?: string;
  margin_right?: string;
}

export class CardComponentGallery{
  items: GalleryItem[] = [];
  axis?: string = "horizontal";
  height?: number = 400;
  width?: number = 400;
}

export class CardComponentVideo {
  name:string;
  url: string;
  source?: string;
  width?: number = 800;
  height?: number = 450;
  autoplay?: boolean = false;
}

export class CardComponentTeamMember{
  name: string;
  title: string;
  linkedin: string;
  email: string;
  url: string;
}

export class GalleryItem {
  item_type?: string;
  item_name: string ="";
  item_url: string ="";
  item_source: string;
  width_ratio?: number = 1;
  height_ratio?: number = 1;
  item_height?: number;
  item_width?: number;
  item_radius?: number;
}

export class CardComponentTestimonial {
  items: TestimonialItem[] = [];
}

export class TestimonialItem {
  name: string = "";
  title: string = "";
  quote: string = "";
  url: string = "";
}



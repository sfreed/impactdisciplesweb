import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../../models/editor/card.model';
import { cta_type_values } from '../../../lists/card-fields.list';


@Component({
  selector: 'app-footer-view',
  templateUrl: './footer-view.component.html'
})
export class ComponentFooterViewComponent implements OnInit {
  @Input('component') component: CardComponent;

  @Input('view') view: string = "edit";

  ctaStyles: string[] = cta_type_values;


  constructor() { }

  ngOnInit(): void {
  }

}

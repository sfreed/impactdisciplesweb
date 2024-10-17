import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CardViewerComponent } from '../../card-administration/card-viewer/card-viewer.component';
import { CardSpacerComponent } from '../../common/content/card-spacer/card-spacer.component';
import { Page } from '../../common/models/editor/page.model';
import { FormViewerComponent } from '../../form-administration/form-viewer/form-viewer.component';

@Component({
  selector: 'app-page-viewer',
  styleUrls: ['./page-viewer.component.scss'],
  templateUrl: './page-viewer.component.html'
})
export class PageViewerComponent implements AfterViewInit {
  @ViewChild('carddiv', { read: ViewContainerRef })
  private vcr: ViewContainerRef;

  @Input('page') page: Page;

  @Input('mode') mode: string;

  constructor() {}

  ngAfterViewInit(): void {
    this.vcr.clear();

    if (this.page && this.page.cards) {
      this.vcr.createComponent(CardSpacerComponent);

      this.page.cards.forEach((card) => {
        console.log(card)
        if (card.type == 'Form') {
          let componentRef: ComponentRef<any> = this.vcr.createComponent(FormViewerComponent);
          let currentComponent = componentRef.instance;
          currentComponent.currentForm = card;
          currentComponent.mode = this.mode;
        }

        if (card.type == 'Card') {
          let componentRef: ComponentRef<any> = this.vcr.createComponent(CardViewerComponent);
          let currentComponent = componentRef.instance;
          currentComponent.card = card;
          currentComponent.mode = this.mode;
        }

        this.vcr.createComponent(CardSpacerComponent);
      });
    }
  }
}

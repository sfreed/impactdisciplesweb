import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { Subscription } from 'rxjs';
import { CardViewerComponent } from '../../card-administration/card-viewer/card-viewer.component';
import { CardSpacerComponent } from '../../common/content/card-spacer/card-spacer.component';
import { Page } from '../../common/models/editor/page.model';
import { PageService } from '../../common/services/page.service';
import { FormViewerComponent } from '../../form-administration/form-viewer/form-viewer.component';

@Component({
  selector: 'app-page-viewer',
  styleUrls: ['./page-viewer.component.scss'],
  templateUrl: './page-viewer.component.html'
})
export class PageViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carddiv', { read: ViewContainerRef })
  private vcr: ViewContainerRef;

  @Input('page') page: Page;

  @Input('mode') mode: string;

  index: number = 0;
  componentsReferences = [];

  $routeSubsciption: Subscription;

  constructor(
    private CFR: ComponentFactoryResolver,
    private pageService: PageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.$routeSubsciption = this.route.params.subscribe(
      (queryParams) => {
        this.vcr.clear();

        this.pageService.getById(queryParams['id']).then(
          (p) => {
            this.page = p;

            if (this.page && this.page.cards) {
              this.vcr.createComponent(CardSpacerComponent);

              this.page.cards.forEach((card) => {
                if (card.type == 'Form') {
                  let component: any = FormViewerComponent;

                  let componentFactory = this.CFR.resolveComponentFactory(component);
                  let componentRef: ComponentRef<any> = this.vcr.createComponent(componentFactory);
                  let currentComponent = componentRef.instance;
                  currentComponent.currentForm = card;
                  currentComponent.mode = this.mode;
                }

                if (card.type == 'Card') {
                  let component: any = CardViewerComponent;

                  let componentFactory = this.CFR.resolveComponentFactory(component);
                  let componentRef: ComponentRef<any> = this.vcr.createComponent(componentFactory);
                  let currentComponent = componentRef.instance;
                  currentComponent.currentCard = card;
                  currentComponent.mode = this.mode;
                }

                this.vcr.createComponent(CardSpacerComponent);
              });
            }
          },
          (err) => console.error('Error in Page Viewer Admin', err)
        );
      },
      (err) => console.error('Error in Page Viewer Admin', err)
    );
  }

  ngOnDestroy(): void {
    this.$routeSubsciption.unsubscribe();
  }
}

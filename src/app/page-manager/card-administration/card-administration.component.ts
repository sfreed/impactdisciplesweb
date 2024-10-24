import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { Page } from '../common/models/editor/page.model';
import { CardService } from '../common/services/card.service';
import { PageService } from '../common/services/page.service';
import { Card } from '../common/models/editor/card.model';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import DataSource from 'devextreme/data/data_source';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-administration.component.html'
})
export class CardAdministrationComponent {
  @ViewChild("cardTable") cardTable: DxDataGridComponent;

  datasource$: Observable<DataSource>;

  card: Card;

  public editCardVisible$ = new BehaviorSubject<boolean>(false);

  constructor(public service: CardService,
    public pageService: PageService,
    public toasterService: ToastrService){
    this.datasource$ = this.service.streamAll().pipe(
      map(
        (items) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new CustomStore({
              key: 'id',
              loadMode: 'raw',
              load: function (loadOptions: any) {
                return items;
              }
            })
          })
      )
    );
  }

  saveChanges = () => {
    if(this.card.id){
      this.service.update(this.card.id, this.card).then(card =>{
        this.toasterService.success('Card Updated Successfully')
        this.onEditCancel()
      });
    } else {
      this.service.add(this.card).then(card =>{
        this.toasterService.success('Card Created Successfully')
        this.onEditCancel()
      });
    }
  }

  publishCard = (e) => {
    this.card = e.row.data;

    confirm('<i>Are you sure you want to publish this card?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.pageService.getAll().then(async pages => {
          let pagesToUpdate: Page[] = [];

          pages.forEach(async page => {
            page.cards.forEach(card => {
              if(card && card.dbId == this.card.id) {
                Object.assign(card, this.card)
                pagesToUpdate.push(page);
              }
            });
          });

          return pagesToUpdate
        }).then(pagesToUpdate => {
          pagesToUpdate.forEach(async page => {
            await this.pageService.update(page.dbId, page);
          });
        }).then(() => {
          notify({
            message: 'Card Published Successfully',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  copyCard = (e) => {
    this.card = e.row.data;

    confirm('<i>Are you sure you want to copy this card?</i>', 'Confirm').then((dialogResult) => {
      let newCard = {...this.card};

      if (dialogResult) {
        newCard.name = 'Copy of ' + e.row.data.name;
        newCard.id = "";
        this.service.add(newCard).then(() => {
          this.cardTable.instance.refresh();
        });
      }
    })
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this card?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: 'Card Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  displayCardAdd = () => {
    this.card = {...new Card()};

    this.editCardVisible$.next(true);
  }

  displayCardEdit = (e) => {
    this.card = e.data;

    this.editCardVisible$.next(true);
  }

  onEditCancel() {
    this.editCardVisible$.next(false);
  }
}

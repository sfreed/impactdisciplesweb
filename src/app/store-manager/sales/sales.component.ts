import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { ProductModel } from 'impactdisciplescommon/src/models/utils/product.model';
import { SalesService } from 'impactdisciplescommon/src/services/utils/sales.service';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: CheckoutForm;

  itemType = 'Sale';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  public isSingleImageVisible$ = new BehaviorSubject<boolean>(false);

  productTags: any[] = [];

  series: any[] = [];

  constructor(private service: SalesService) {}

  ngOnInit() {
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

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));

    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new ProductModel()};

    this.isVisible$.next(true);
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: this.itemType + ' Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onSave(item: CheckoutForm) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);
      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Updated',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'success'
            });
          }
        })
      } else {
        this.service.add(item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Added',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'error'
            });
          }
        })
      }
    }
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }
}

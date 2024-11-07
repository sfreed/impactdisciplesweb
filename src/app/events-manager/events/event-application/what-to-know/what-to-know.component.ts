import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { FAQModel } from 'impactdisciplescommon/src/models/utils/faq.model';
import { FAQService } from 'impactdisciplescommon/src/services/data/faq.service';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { WhatToKnowModel } from 'impactdisciplescommon/src/models/utils/what-to-know.model';
import { WhatToKnowService } from 'impactdisciplescommon/src/services/data/what-to-know.service';

@Component({
  selector: 'app-what-to-know',
  templateUrl: './what-to-know.component.html',
  styleUrls: ['./what-to-know.component.css']
})
export class WhatToKnowComponent implements OnInit {
  @Input('event') event: EventModel;

  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: WhatToKnowModel;

  itemType = 'What To Know';

  selectedRows: string[] = [];

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private service: WhatToKnowService) { }

  ngOnInit() {
    let that = this;
    if(this.event?.id){
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
                },
                onLoaded: function(){
                  if(!that.event.whatToKnows){
                    that.event.whatToKnows = [];
                  }

                  that.selectedRows = that.event.whatToKnows.map(w2k => w2k.id)
                }
              })
            })
        ),
      );
    }
  }

  showEditModal = (e) => {
    this.selectedItem = (Object.assign({}, e.data));

    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new WhatToKnowModel()};

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

  onSave(item) {
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

  selectRow(e){
    this.event.whatToKnows = e.selectedRowsData;
  }
}

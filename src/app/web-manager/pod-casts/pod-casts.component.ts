import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { PodCastModel } from 'impactdisciplescommon/src/models/domain/pod-cast-model';
import { PodCastService } from 'impactdisciplescommon/src/services/pod-cast.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-pod-casts',
  templateUrl: './pod-casts.component.html',
  styleUrls: ['./pod-casts.component.css']
})
export class PodCastsComponent implements OnInit{
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  @Input() imageSelectVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  datasource$: Observable<DataSource>;
  selectedItem: PodCastModel;

  itemType = 'Pod Cast'

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private service: PodCastService) {}

  ngOnInit(): void {
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
    this.selectedItem = data
    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new PodCastModel()};
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

  onSave(item: PodCastModel) {
    item.date = Timestamp.now();

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

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }


  editImages(e){
    this.selectedItem = e.row.data;
    this.imageSelectVisible = true;
  }

  async closeItemWindow(e){
    if(this.selectedItem.id){
      this.selectedItem = await this.service.update(this.selectedItem.id, this.selectedItem);
    } else {
      this.selectedItem = await this.service.add(this.selectedItem);
    }

    this.imageSelectVisible = false;
    this.imageSelectClosed.emit(false);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PodCastModel } from 'impactdisciplescommon/src/models/domain/pod-cast-model';
import { PodCastService } from 'impactdisciplescommon/src/services/pod-cast.service';

@Component({
  selector: 'app-pod-casts',
  templateUrl: './pod-casts.component.html',
  styleUrls: ['./pod-casts.component.css']
})
export class PodCastsComponent {
  @Input() imageSelectVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  dataSource: any;

  constructor(private service: PodCastService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: PodCastModel) {
        return service.add(value);
      },
      update: function (key: any, value: PodCastModel) {
        return service.update(key, value)
      },
      remove: function (id: any) {
        return service.delete(id);
      },
    });
   }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

  selectedPodCast: PodCastModel;

  editImages(e){
    this.selectedPodCast = e.row.data;
    this.imageSelectVisible = true;
  }

  async closeItemWindow(e){
    if(this.selectedPodCast.id){
      this.selectedPodCast = await this.service.update(this.selectedPodCast.id, this.selectedPodCast);
    } else {
      this.selectedPodCast = await this.service.add(this.selectedPodCast);
    }

    this.imageSelectVisible = false;
    this.imageSelectClosed.emit(false);
  }
}

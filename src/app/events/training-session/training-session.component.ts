import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { TrainingSessionModel } from 'impactdisciplescommon/src/models/domain/training-session.model';
import { TrainingSessionService } from 'impactdisciplescommon/src/services/training-session.service';

@Component({
  selector: 'app-training-session',
  templateUrl: './training-session.component.html',
  styleUrls: ['./training-session.component.css']
})
export class TrainingSessionComponent {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  constructor(public trainingSessionService: TrainingSessionService){
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return trainingSessionService.getAll();
      },
      insert: function (value: TrainingSessionModel) {
        return trainingSessionService.add(value);
      },
      update: function (key: any, value: TrainingSessionModel) {
        return trainingSessionService.update(key, value)
      },
      remove: function (id: any) {
        return trainingSessionService.delete(id);
      },
    });
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}

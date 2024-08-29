import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { SeminarModel } from 'impactdisciplescommon/src/models/domain/seminar.model';
import { SeminarService } from 'impactdisciplescommon/src/services/seminar.service';

@Component({
  selector: 'app-seminar-manager',
  templateUrl: './seminar-manager.component.html',
  styleUrls: ['./seminar-manager.component.css']
})
export class SeminarManagerComponent {
  dataSource: any;

  constructor(service: SeminarService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: SeminarModel) {
        return service.add(value);
      },
      update: function (key: any, value: SeminarModel) {
        return service.update(key, value)
      },
      remove: function (id: any) {
        return service.delete(id);
      },
    });
   }

  ngOnInit() {
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}

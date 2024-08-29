import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { LunchAndLearnModel } from 'impactdisciplescommon/src/models/domain/lunch-and-learn.model';
import { LunchAndLearnService } from 'impactdisciplescommon/src/services/lunch-and-learn.service';

@Component({
  selector: 'app-lunch-and-learn-manager',
  templateUrl: './lunch-and-learn-manager.component.html',
  styleUrls: ['./lunch-and-learn-manager.component.css']
})
export class LunchAndLearnManagerComponent {
  dataSource: any;

  constructor(service: LunchAndLearnService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: LunchAndLearnModel) {
        return service.add(value);
      },
      update: function (key: any, value: LunchAndLearnModel) {
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

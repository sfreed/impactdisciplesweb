import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { WebConfigModel } from 'impactdisciplescommon/src/models/utils/web-config.model';
import { WebConfigService } from 'impactdisciplescommon/src/services/utils/web-config.service';

@Component({
  selector: 'app-web-config-manager',
  templateUrl: './web-config-manager.component.html',
  styleUrls: ['./web-config-manager.component.css']
})
export class WebConfigManagerComponent {
  dataSource: any;

  constructor(service: WebConfigService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: WebConfigModel) {
        return service.add(value);
      },
      update: function (key: any, value: WebConfigModel) {
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

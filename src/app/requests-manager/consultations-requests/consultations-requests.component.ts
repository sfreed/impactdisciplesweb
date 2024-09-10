import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ConsultationRequestModel } from 'impactdisciplescommon/src/models/domain/consultation-request.model';
import { ConsultationRequestService } from 'impactdisciplescommon/src/services/consultation-request.service';

@Component({
  selector: 'app-consultations-requests',
  templateUrl: './consultations-requests.component.html',
  styleUrls: ['./consultations-requests.component.css']
})
export class ConsultationsRequestsComponent {
  dataSource: any;

  constructor(private service: ConsultationRequestService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: ConsultationRequestModel) {
        return service.add(value);
      },
      update: function (key: any, value: ConsultationRequestModel) {
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
}

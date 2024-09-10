import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { ConsultationSurveyModel } from 'impactdisciplescommon/src/models/domain/consultation-survey.model';
import { ConsultationSurveyService } from 'impactdisciplescommon/src/services/consultation-survey.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';

@Component({
  selector: 'app-consultations-surveys',
  templateUrl: './consultations-surveys.component.html',
  styleUrls: ['./consultations-surveys.component.css']
})
export class ConsultationsSurveysComponent implements OnInit {
  dataSource: any;

  phone_types: PHONE_TYPES[];

  constructor(private service: ConsultationSurveyService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: ConsultationSurveyModel) {
        return service.add(value);
      },
      update: function (key: any, value: ConsultationSurveyModel) {
        return service.update(key, value)
      },
      remove: function (id: any) {
        return service.delete(id);
      },
    });
   }

   async ngOnInit(): Promise<void> {
    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

   onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}

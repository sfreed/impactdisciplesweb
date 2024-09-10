import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { TESTIMONIAL_TYPES } from 'impactdisciplescommon/src/lists/testimonial_types.enum';
import { TestimonialModel } from 'impactdisciplescommon/src/models/domain/testimonial.model';
import { TestimonialService } from 'impactdisciplescommon/src/services/utils/testimonial.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  dataSource: any;

  testimonials:TESTIMONIAL_TYPES[] = [];

  constructor(service: TestimonialService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: TestimonialModel) {
        return service.add(value);
      },
      update: function (key: any, value: TestimonialModel) {
        return service.update(key, value)
      },
      remove: function (id: any) {
        return service.delete(id);
      },
    });
   }

  async ngOnInit(): Promise<void> {
    this.testimonials = EnumHelper.getTestimonialTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}

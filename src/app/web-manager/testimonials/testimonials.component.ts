import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { TESTIMONIAL_TYPES } from 'impactdisciplescommon/src/lists/testimonial_types.enum';
import { TestimonialModel } from 'impactdisciplescommon/src/models/domain/testimonial.model';
import { TestimonialService } from 'impactdisciplescommon/src/services/utils/testimonial.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  dataSource: Observable<DataSource>;

  testimonials:TESTIMONIAL_TYPES[] = [];

  constructor(private service: TestimonialService) {
    this.dataSource = this.service.streamAll().pipe(
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
              insert: function (value: TestimonialModel) {
                return service.add(value);
              },
              update: function (key: any, value: TestimonialModel) {
                return service.update(key, value)
              },
              remove: function (id: any) {
                return service.delete(id);
              },
            })
          })
      )
    );
   }

  async ngOnInit(): Promise<void> {
    this.testimonials = EnumHelper.getTestimonialTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}

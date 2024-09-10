import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { CourseService } from 'impactdisciplescommon/src/services/course.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: Observable<DataSource>;

  constructor(public courseService: CourseService){
    this.dataSource = this.courseService.streamAll().pipe(
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
              insert: function (value: CourseModel) {
                return courseService.add(value);
              },
              update: function (key: any, value: CourseModel) {
                return courseService.update(key, value)
              },
              remove: function (id: any) {
                return courseService.delete(id);
              },
            })

          })
      )
    );
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
  }
}

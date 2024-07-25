import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { CourseService } from 'impactdisciplescommon/src/services/course.service';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  constructor(public courseService: CourseService){
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return courseService.getAll();
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
    });
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
  }
}

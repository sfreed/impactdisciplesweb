import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { BlogPostModel } from 'impactdisciplescommon/src/models/domain/blog-post.model';
import { BlogPostService } from 'impactdisciplescommon/src/services/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent {
  dataSource: any;

  constructor(service: BlogPostService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: BlogPostModel) {
        return service.add(value);
      },
      update: function (key: any, value: BlogPostModel) {
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

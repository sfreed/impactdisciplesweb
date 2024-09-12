import { Component, EventEmitter, Input, Output } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { BlogPostModel } from 'impactdisciplescommon/src/models/domain/blog-post.model';
import { BlogPostService } from 'impactdisciplescommon/src/services/blog-post.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent {
  @Input() imageSelectVisible: boolean = false;
  @Input() multiImageSelectVisible: boolean = false;
  @Input() editPostVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  dataSource: Observable<DataSource>;

  constructor(private service: BlogPostService) {
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
              insert: function (value: BlogPostModel) {
                return service.add(value);
              },
              update: function (key: any, value: BlogPostModel) {
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

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

  selectedBlog: BlogPostModel;

  editImage(e){
    this.selectedBlog = e.row.data;
    this.imageSelectVisible = true;
  }

  addImages(e){
    this.selectedBlog = e.row.data;
    this.multiImageSelectVisible = true;
  }

  editPost(e){
    this.selectedBlog = e.row.data;
    this.editPostVisible = true;
  }

  closeItemWindow(e){
    this.service.update(this.selectedBlog.id, this.selectedBlog).then(blog => {
      this.selectedBlog = blog;
      this.imageSelectVisible = false;
      this.multiImageSelectVisible = false;
      this.editPostVisible = false;
      this.imageSelectClosed.emit(false);
    })
  }
}

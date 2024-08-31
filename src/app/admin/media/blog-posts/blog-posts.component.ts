import { Component, EventEmitter, Input, Output } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { BlogPostModel } from 'impactdisciplescommon/src/models/domain/blog-post.model';
import { BlogPostService } from 'impactdisciplescommon/src/services/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent {
  @Input() imageSelectVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  dataSource: any;

  constructor(private service: BlogPostService) {
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

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

  selectedBlog: BlogPostModel;

  editImages(e){
    this.selectedBlog = e.row.data;
    this.imageSelectVisible = true;
  }

  async closeItemWindow(e){
    if(this.selectedBlog.id){
      this.selectedBlog = await this.service.update(this.selectedBlog.id, this.selectedBlog);
    } else {
      this.selectedBlog = await this.service.add(this.selectedBlog);
    }

    this.imageSelectVisible = false;
    this.imageSelectClosed.emit(false);
  }
}

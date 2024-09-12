import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { BlogPostModel } from 'impactdisciplescommon/src/models/domain/blog-post.model';
import { BlogTagModel } from 'impactdisciplescommon/src/models/domain/blog-tag.model';
import { BlogPostService } from 'impactdisciplescommon/src/services/blog-post.service';
import { BlogTagsService } from 'impactdisciplescommon/src/services/blog-tags.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  @Input() imageSelectVisible: boolean = false;
  @Input() multiImageSelectVisible: boolean = false;
  @Input() editPostVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  dataSource: Observable<DataSource>;

  blogTags: string[] = [];

  constructor(private service: BlogPostService, private blogTagService: BlogTagsService) {
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

  ngOnInit(){
    this.blogTagService.streamAll().subscribe(tags => {
      tags.forEach(tag => this.blogTags.push(tag.tag));
      return tags;
    });
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

  onCustomItemCreating(args: DxTagBoxTypes.CustomItemCreatingEvent) {
    if(args.text){
      let blogTag: BlogTagModel = {... new BlogTagModel()}
      blogTag.tag = args.text;

      const isItemInDataSource = this.blogTags.some((item) => item === blogTag.tag);
      if (!isItemInDataSource) {

        this.blogTagService.add(blogTag).then(tag => {
          this.blogTags.unshift(tag.tag);
        })
      }

      args.customItem = blogTag.tag;
    }
  }
}

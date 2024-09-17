import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { BlogPostModel } from 'impactdisciplescommon/src/models/domain/blog-post.model';
import { TagModel } from 'impactdisciplescommon/src/models/domain/tag.model';
import { BlogPostService } from 'impactdisciplescommon/src/services/blog-post.service';
import { BlogTagsService } from 'impactdisciplescommon/src/services/blog-tags.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;
  @Input() imageSelectVisible: boolean = false;
  @Input() multiImageSelectVisible: boolean = false;
  @Input() editPostVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  datasource$: Observable<DataSource>;
  selectedItem: BlogPostModel;

  itemType = 'Blog Post';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);
  public isSingleImageVisible$ = new BehaviorSubject<boolean>(false);
  public isMultipleImageVisible$ = new BehaviorSubject<boolean>(false);

  blogTags: string[] = [];

  selectedIndex: number = 0;
  selectedTab: string = 'Blog Post';

  tabs: Tab[] = [
    { id: 0, text: 'Blog Post', template: 'Blog Post' },
    { id: 1, text: 'Main Image', template: 'Main Image' },
    { id: 2, text: 'Other Images', template: 'Other Images' },
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }

  constructor(private service: BlogPostService, private blogTagService: BlogTagsService) {}

  ngOnInit() {
    this.datasource$ = this.service.streamAll().pipe(
      map(
        (data) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new ArrayStore({
              key: 'id',
              data
          })
        })
      )
    )

    this.blogTagService.streamAll().subscribe(tags => {
      tags.forEach(tag => this.blogTags.push(tag.tag));
      return tags;
    });
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = data
    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new BlogPostModel()};
    this.isVisible$.next(true);
  }

  showSingleImageModal = () => {
    this.isSingleImageVisible$.next(true);
  }

  closeSingleImageModal = () => {
    this.isSingleImageVisible$.next(false);
  }

  showMultipleImageModal = () => {
    this.isMultipleImageVisible$.next(true);
  }

  closeMultipleImageModal = () => {
    this.isMultipleImageVisible$.next(false);
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: this.itemType + ' Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onSave(item: BlogPostModel) {
    this.inProgress$.next(true);
    if(item.id) {
      this.service.update(item.id, item).then((item) => {
        if(item) {
          notify({
            message: this.itemType + ' Updated',
            position: 'top',
            width: 600,
            type: 'success'
          });
          this.onCancel();
        } else {
          this.inProgress$.next(false);
          notify({
            message: 'Some Error Occured',
            position: 'top',
            width: 600,
            type: 'success'
          });
        }
      })
    } else {
      this.service.add(item).then((item) => {
        if(item) {
          notify({
            message: this.itemType + ' Added',
            position: 'top',
            width: 600,
            type: 'success'
          });
          this.onCancel();
        } else {
          this.inProgress$.next(false);
          notify({
            message: 'Some Error Occured',
            position: 'top',
            width: 600,
            type: 'error'
          });
        }
      })
    }
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }


  onCustomItemCreating(args: DxTagBoxTypes.CustomItemCreatingEvent) {
    if(args.text){
      let blogTag: TagModel = {... new TagModel()}
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

  closeItemWindow(e){
    this.service.update(this.selectedItem.id, this.selectedItem).then(blog => {
      this.selectedItem = blog;
      this.imageSelectVisible = false;
      this.multiImageSelectVisible = false;
      this.editPostVisible = false;
      this.imageSelectClosed.emit(false);
    })
  }
}

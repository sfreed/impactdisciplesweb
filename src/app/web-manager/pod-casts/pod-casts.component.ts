import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { PodCastModel } from 'impactdisciplescommon/src/models/domain/pod-cast-model';
import { PodCastService } from 'impactdisciplescommon/src/services/pod-cast.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { Timestamp } from 'firebase/firestore';
import { BlogTagsService } from 'impactdisciplescommon/src/services/blog-tags.service';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';
import { TagModel } from 'impactdisciplescommon/src/models/domain/tag.model';

@Component({
  selector: 'app-pod-casts',
  templateUrl: './pod-casts.component.html',
  styleUrls: ['./pod-casts.component.css']
})
export class PodCastsComponent implements OnInit{
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: PodCastModel;

  itemType = 'Pod Cast'

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  public isSingleImageVisible$ = new BehaviorSubject<boolean>(false);

  blogTags: string[] = [];

  constructor(private service: PodCastService, private blogTagService: BlogTagsService) {}

  ngOnInit(): void {
      this.datasource$ = this.service.streamAll().pipe(
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
              }
            })
          })
      )
    );

    this.blogTagService.streamAll().subscribe(tags => {
      tags.forEach(tag => this.blogTags.push(tag.tag));
      return tags;
    });
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));
    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new PodCastModel()};
    this.isVisible$.next(true);
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

  onSave(item: PodCastModel) {
    item.date = Timestamp.now();

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

  showSingleImageModal = () => {
    this.isSingleImageVisible$.next(true);
  }

  closeSingleImageModal = () => {
    this.isSingleImageVisible$.next(false);
  }
}

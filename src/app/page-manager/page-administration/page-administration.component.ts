import { Component, ViewChild } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { Page } from '../common/models/editor/page.model';
import { PageService } from '../common/services/page.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-administration',
  templateUrl: './page-administration.component.html'
})
export class PageAdministrationComponent {
  @ViewChild("pageTable") pageTable: DxDataGridComponent;

  datasource$: Observable<DataSource>;

  page: Page;

  public editPageVisible$ = new BehaviorSubject<boolean>(false);
  public previewPageVisible$ = new BehaviorSubject<boolean>(false);

  constructor(public service: PageService,
    public toasterService: ToastrService
  ) {
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
  }

  saveChanges = () => {
    if(this.page.id){
      this.service.update(this.page.id, this.page).then(page =>{
        this.toasterService.success('Page Updated Successfully')
        this.onEditCancel()
      });
    } else {
      this.service.add(this.page).then(page =>{
        this.toasterService.success('Page Created Successfully')
        this.onEditCancel()
      });
    }
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this page?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: 'Page Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }
  displayPageAdd = () => {
    this.page = {...new Page()};

    this.editPageVisible$.next(true);
  }

  displayPageEdit = (e) => {
    this.page = e.row.data;

    this.editPageVisible$.next(true);
  }

  onEditCancel() {
    this.editPageVisible$.next(false);
  }

  displayPagePreview = (e) => {
    this.page = e.row.data;

    this.previewPageVisible$.next(true);
  }

  onPreviewCancel() {
    this.previewPageVisible$.next(false);
  }

  displayPageEditPreview = (e) => {
    this.previewPageVisible$.next(true);
  }

  onEditPreviewCancel() {
    this.previewPageVisible$.next(false);
  }
}

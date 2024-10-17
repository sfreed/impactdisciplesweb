import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { Form } from '../common/models/editor/form.model';
import { Page } from '../common/models/editor/page.model';
import { FormService } from '../common/services/forms.service';
import { PageService } from '../common/services/page.service';
import DataSource from 'devextreme/data/data_source';
import { BehaviorSubject, Observable, map } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-form-administration',
  templateUrl: './form-administration.component.html'
})
export class FormAdministrationComponent {
  datasource$: Observable<DataSource>;

  form: Form;

  public editFormVisible$ = new BehaviorSubject<boolean>(false);
  public previewFormVisible$ = new BehaviorSubject<boolean>(false);
  public resultsFormVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private service: FormService,
    private pageService: PageService,
    private toasterService: ToastrService,) {
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
    if(this.form.id){
      this.service.update(this.form.id, this.form).then(card =>{
        this.toasterService.success('Form Updated Successfully')
        this.onEditCancel()
      });
    } else {
      this.service.add(this.form).then(card =>{
        this.toasterService.success('Form Created Successfully')
        this.onEditCancel()
      });
    }
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this card?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: 'Card Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  displayFormAdd = () => {
    this.form = {...new Form()};

    this.editFormVisible$.next(true);
  }

  displayFormPreview = (e) => {
    this.form = e.row.data;

    this.previewFormVisible$.next(true);
  }

  onPreviewCancel() {
    this.previewFormVisible$.next(false);
  }

  displayFormEdit = (e) => {
    this.form = e.row.data;

    this.editFormVisible$.next(true);
  }

  onEditCancel() {
    this.editFormVisible$.next(false);
  }

  displayFormEditPreview = (e) => {
    this.form = e.row.data;

    this.previewFormVisible$.next(true);
  }

  onEditPreviewCancel() {
    this.previewFormVisible$.next(false);
  }

  viewFormResults(e){
    this.form = e.row.data;
    this.resultsFormVisible$.next(true);
  }

  onFormResultsCancel() {
    this.resultsFormVisible$.next(false);
  }

  publishForm(e){
    let pagesToUpdate: Page[] = [];

    new Promise((resolve, reject) => {
      this.pageService.getAll().then(async pages => {
        await pages.forEach(async page => {
          await page.cards.forEach(card => {
            if(card.dbId == this.form.id) {
              Object.assign(card, this.form)
              pagesToUpdate.push(page);
            }
          });
        });
        resolve(pagesToUpdate);
      },err => console.error('Error in Form Admin', err))
    }).then( p => {
      pagesToUpdate.forEach(page => {
        this.pageService.update(page.dbId, page);
      });
    }).then(()=>{
      this.toasterService.success('Form successfully published!');
    });
  }

}

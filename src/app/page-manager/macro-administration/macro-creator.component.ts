import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { TextEditorMacro } from '../common/models/editor/text-editor-macro.model';
import { MacroService } from '../common/services/macro.service';
import DataSource from 'devextreme/data/data_source';
import { BehaviorSubject, map, Observable } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-macro-creator',
  templateUrl: './macro-creator.component.html',
  styleUrls: ['./macro-creator.component.scss']
})
export class MacroCreatorComponent {
  datasource$: Observable<DataSource>;

  public editMacroVisible$ = new BehaviorSubject<boolean>(false);

  macro: TextEditorMacro = {... new TextEditorMacro()};

  mode: string = 'edit'

  constructor(private service: MacroService,
    private toasterService: ToastrService,
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
    if(this.macro.id){
      this.service.update(this.macro.id, this.macro).then(macro =>{
        this.toasterService.success('Macro Updated Successfully')
        this.onEditCancel()
      });
    } else {
      this.service.add(this.macro).then(macro =>{
        this.toasterService.success('Macro Created Successfully')
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

  displayMacroAdd = () => {
    this.macro = {...new TextEditorMacro()};

    this.editMacroVisible$.next(true);
  }

  displayMacroEdit = (e) => {
    this.macro = e.row.data;

    this.editMacroVisible$.next(true);
  }

  onEditCancel() {
    this.editMacroVisible$.next(false);
  }
}

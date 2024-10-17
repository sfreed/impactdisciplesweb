import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FormService } from '../../common/services/forms.service';
import { PageService } from '../../common/services/page.service';
import { Form } from '../../common/models/editor/form.model';

@Component({
  selector: 'app-form-results',
  templateUrl: './form-results.component.html'
})
export class FormResultsComponent implements OnInit {
  @Input('form') form: Form;

  dataSource: {}[] = [];

  displayCols: string[] = [];

  resultVisible = false;

  constructor(public formService: FormService,
    public pageService: PageService,
    public ngZone: NgZone,
    public router: Router,
    private route: ActivatedRoute,
    public toster: ToastrService,) {}

  ngOnInit(): void {



    let columns: any[] = [];

    this.form.rows.forEach(row => {
      row.inputs.forEach(input => {
        if(input.boolean.field_name){
          columns.push({name: input.boolean.field_name, order: input.result_order});
        } else if (input.date.field_name){
          columns.push({name: input.date.field_name, order: input.result_order});
        } else if (input.dateTime.field_name){
          columns.push({name: input.dateTime.field_name, order: input.result_order});
        } else if (input.multipleCheckbox.field_name){
          columns.push({name: input.multipleCheckbox.field_name, order: input.result_order});
        } else if (input.number.field_name){
          columns.push({name: input.number.field_name, order: input.result_order});
        } else if (input.radioButtons.field_name){
          columns.push({name: input.radioButtons.field_name, order: input.result_order});
        } else if (input.select.field_name){
          columns.push({name: input.select.field_name, order: input.result_order});
        } else if (input.singleCheckbox.field_name){
          columns.push({name: input.singleCheckbox.field_name, order: input.result_order});
        } else if (input.text.field_name){
          columns.push({name: input.text.field_name, order: input.result_order});
        } else if (input.textarea.field_name){
          columns.push({name: input.textarea.field_name, order: input.result_order});
        }
      })
    });

    columns.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0)

    this.displayCols.push('submitted_by_display_name');
    this.displayCols.push('submitted_by_email');
    this.displayCols.push('submitted_date');

    columns.forEach(col => this.displayCols.push(col.name));
  }

  displayResult(e: any){
    this.form = e.row.data;
    this.resultVisible = true;
  }

  closeResults(){
    this.resultVisible = false;
  }

  getScreenHeight(): number{
    return window.innerHeight*.7;
  }

}

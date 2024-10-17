import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Form } from '../../common/models/editor/form.model';
import { FormService } from '../../common/services/forms.service';

@Component({
  selector: 'app-form-maker',
  templateUrl: './form-maker.component.html'
})
export class FormMakerComponent {
  @Input('form') form: Form;
  @Input('mode') mode: string;

  confirmPageSaveVisible = false;

  confirmPageCancelVisible = false;

  htmlContent: string;

  constructor(private route: ActivatedRoute,
    public ngZone: NgZone,
    public router: Router,
    public formService: FormService) { }

  returnToFormAdministrator(){
    this.ngZone.run(() => {
      this.router.navigate(['/forms/form-administration']);
    });
  }

  showSavePopup(){
    this.confirmPageSaveVisible = true;
  }

  showCancelPopup(){
    this.confirmPageCancelVisible = true;
  }

  saveChanges(){
    this.formService.update(this.form.id, this.form);
    this.returnToFormAdministrator();

    this.closeSaveChanges();
  }

  closeSaveChanges(){
    this.confirmPageSaveVisible = false;
  }

  cancelChanges(){
    this.closeCancelChanges();
    this.returnToFormAdministrator();
  }

  closeCancelChanges(){
    this.confirmPageCancelVisible = false;
  }

  preview(){
    if(this.mode == "edit"){
      this.mode = 'preview'
    } else if(this.mode == 'preview'){
      this.mode = 'edit';
    }
  }
}

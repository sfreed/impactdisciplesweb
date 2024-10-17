import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../../common/models/editor/form.model';
import { FormService } from '../../common/services/forms.service';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html'
})
export class FormViewerComponent {
  @Input('form') form: Form;
  @Input('mode') mode: string;

  constructor() { }
}

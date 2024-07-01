import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'impactdisciplescommon/src/app/shared/services/auth.service';
import { SessionService } from 'impactdisciplescommon/src/app/shared/services/session.service';

@Component({
  selector: 'app-capture-password-form',
  templateUrl: './capture-password-form.component.html',
  styleUrls: ['./capture-password-form.component.scss']
})
export class CapturePasswordFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, public tostrService: ToastrService, private sessionService: SessionService) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { password } = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(this.sessionService.currentUser.email, password);

    if (!result.isOk) {
      this.tostrService.error('There was an error trying to log in: ' + result.message);
    }

    this.loading = false;
  }
}

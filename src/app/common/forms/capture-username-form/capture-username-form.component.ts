import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-capture-username-form',
  templateUrl: './capture-username-form.component.html',
  styleUrls: ['./capture-username-form.component.scss']
})
export class CaptureUsernameFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router, public tostrService: ToastrService, private sessionService: SessionService) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.findUser(email);

    if (!result) {
      this.loading = false;
      this.tostrService.error('A User account associated with that Email Address could not be found. Please Contact JBH Administrator for help.')
    } else {
      this.sessionService.currentUser = result;

      if(result.firebaseUID){
        this.loading = false;
        this.router.navigate(['capture-password-form'])
      } else {
        this.loading = false;
        this.router.navigate(['create-auth-form'])
      }
    }
  }
}

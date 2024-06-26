import { Component } from '@angular/core';
import { SessionService } from 'src/app/shared/services/singleton/session.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-create-auth-form',
  templateUrl: './create-auth-form.component.html',
  styleUrls: ['./create-auth-form.component.scss']
})
export class CreateAuthFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService, public tostrService: ToastrService) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { password, password2 } = this.formData;
    this.loading = true;

    if(password != password2){
      this.loading = false;
      this.tostrService.error('Passwords do not match. Please try again.')
    } else {
        const result = await this.authService.createAccount(this.sessionService.currentUser.email, password);

        if(result.isOk){
          this.tostrService.success('Your account has been created. Please login using your new credentials.')

          this.sessionService.currentUser = null;

          this.router.navigate(['capture-username-form'])
        }
  
        this.loading = false;
    }
  }
}

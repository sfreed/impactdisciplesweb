import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { FireAuthDao } from '../dao/FireAuthDao.dao';
import { UserCredential } from 'firebase/auth';
import { LogMessage } from '../models/util/log-message.model';
import { LoggerService } from './util/logger.service';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from '../models/admin/user.model';
import { AppUserService } from './admin/user.service';
import { SessionService } from './singleton/session.service';

const defaultPath = '/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: AppUser;

  get loggedIn(): boolean {
    return !!this.user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, public dao: FireAuthDao, public userService: AppUserService,
    public loggerService: LoggerService, public tostrService: ToastrService, private sessionService: SessionService) { }

  async findUser(email: string) {
    return this.userService.getAllByValue('email', email).then(user => {
      if(user && user.length == 1){
        return user[0];
      } else {
        this.logMessage('LOGIN', email, 'The email address (' + email + ') is not recognized.', []).then(
          (ec: any) => {
            this.tostrService.error(
              'The email address (' +
                email +
                ') is not recognized. Correct the Email Address and Try again. If the problem continues, please contact your Admin for assistance with this code: ' +
                ec,
              'Login Error',
              { disableTimeOut: true }
            );
          }
        );
        return null;
      }
    })
  }

  async logIn(email: string, password: string) {
    try {
      return this.dao.signIn(email.toLowerCase(), password).then((result: UserCredential) => {
        if(result.user){
          return this.userService.getAllByValue('email', email).then(user => {
            if(user && user.length == 1) {
              this.user = user[0];
              this.router.navigate([this._lastAuthenticatedPath]);
    
              return {
                isOk: true,
                data: this.user,
                message: "Authentication success"
              };
            } else {
              return {
                isOk: false,
                data: null,
                message: "Authentication failed"
              };
            }
          })
        } else {
          return {
            isOk: false,
            data: null,
            message: "Authentication failed"
          };
        }
      },
      (err) => {
        if (err.code == 'auth/wrong-password') {
          this.logMessage('LOGIN', email, 'You have entered an incorrect password for this email address.', [
            { ...err }
          ]).then((ec: any) => {
            this.tostrService.error(
              'You have entered an incorrect password for this email address. If you have forgotten your password, enter your Email Address and press the "Forgot Password" button. If the problem continues, please contact Alliance Group for assistance with this code: ' +
                ec,
              'Login Error',
              { disableTimeOut: true }
            );
          });
        } else if (err.code == 'auth/user-not-found') {
          this.logMessage('LOGIN', email, 'The email address (' + email + ') is not recognized.', [{ ...err }]).then(
            (ec: any) => {
              this.tostrService.error(
                'The email address (' +
                  email +
                  ') is not recognized. Correct the Email Address and Try again. If the problem continues, please contact your Admin for assistance with this code: ' +
                  ec,
                'Login Error',
                { disableTimeOut: true }
              );
            }
          );
        } else if (err.code == 'auth/too-many-requests') {
          this.logMessage('LOGIN', email, 'Too many failed attempts. The account is temporarily locked.', [
            { ...err }
          ]).then((ec: any) => {
            this.tostrService.error(
              'There have been too many failed logins to this account. Please reset your password by going to the login screen, entering your password, and pressing the "Forgot Password" button. If the problem continues, please contact your Admin for assistance with this code: ' +
                ec,
              'Login Error',
              { disableTimeOut: true }
            );
          });
        } else {
          this.logMessage('LOGIN', email, 'The email address (' + email + ') is not recognized.', [{ ...err }]).then(
            (ec: any) => {
              this.tostrService.error(
                'There was an Error accessing your account. Please contact your Admin for Assistance with this code: ' +
                  ec,
                'Login Error',
                { disableTimeOut: true }
              );
            }
          );
        }

        return {
          isOk: false,
          data: null,
          message: "Authentication failed"
        };
      })
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    return this.user;
  }

  async createAccount(email: string, password: string) {
    try {
      return this.dao.register(email.toLowerCase(), password).then((result: UserCredential) =>{
        if(result.user){
          return this.userService.getAllByValue('email', email).then(async appuser => {
            if(appuser && appuser.length == 1){
              let u: AppUser = appuser[0];

              u.firebaseUID = result.user.uid;

              this.userService.update(u.id, u);
              
              return {
                isOk: true,
                message: "Account Successfully Created"
              };
            } else {
              return {
                isOk: false,
                message: "More than 1 User Account was found for this email address"
              };
            }
          })
        } else {
          console.log(result)
          return {
            isOk: false,
            message: "Failed to create account: "
          };
        }
      })
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this.sessionService.currentUser = null;
    this.user = null;
    this.router.navigate(['/capture-username-form']);
  }

  private logMessage(type: string, created_by: string, message: string, data?: any) {
    try {
      let ec = this.generateErrorCode();
      let logMessage: LogMessage = { ...new LogMessage(type, created_by, message, ec, data) };
      logMessage.id = this.generateErrorCode()

      return this.loggerService.add(logMessage).then(() => {
        return ec;
      });
    } catch (err) {
      console.error(err);

      return Promise.resolve(true);
    }
  }

  private generateErrorCode() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
      'capture-username-form',
      'capture-password-form',
      'create-auth-form'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/capture-username-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}

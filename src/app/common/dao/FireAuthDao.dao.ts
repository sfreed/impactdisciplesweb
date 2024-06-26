import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  User,
  UserCredential
} from 'firebase/auth';
import { BehaviorSubject, Observable, fromEventPattern } from 'rxjs';

import { UserPermissionService } from '../services/user-permissions.service';
import { Firestore } from '@angular/fire/firestore';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { UserPermission } from '../models/utils/user-permission.model';
import { AppUser } from '../models/admin/user.model';
import { AppUserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { QueryParam, WhereFilterOperandKeys } from './tracer.dao';


const AUTH_COOKIE_NAME = 'crm_auth';
const USER_COOKIE_NAME = 'crm_user';
const ID_TOKEN_COOKIE_NAME = 'crm_token';

@Injectable({
  providedIn: 'root'
})
export class FireAuthDao {
  public auth: Auth;
  public authSate$ = new BehaviorSubject<boolean>(false);
  public currentUser$: Observable<User>;
  public loggedInUser$: Observable<AppUser>;
  public readonly userPermissions$: Observable<UserPermission[]>;

  public currentAgent$: BehaviorSubject<AppUser> = new BehaviorSubject(undefined);

  constructor(
    public fs: Firestore,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    public userService: AppUserService,
    private cookieService: CookieService,
    private userPermissionService: UserPermissionService
  ) {
    this.auth = getAuth(this.fs.app);
    this.authSate$.next(this.cookieService.check(ID_TOKEN_COOKIE_NAME));

    this.currentUser$ = fromEventPattern(
      (handler) => this.auth.onAuthStateChanged(handler),
      (_handler, unsubscribe) => {
        unsubscribe();
      }
    );

    this.loggedInUser$ = this.currentUser$.pipe(
      mergeMap((user: User) => {
        const qp: QueryParam[] = [];

        if (!!user) {
          qp.push(new QueryParam('email', WhereFilterOperandKeys.equal, user.email));
        }
        return this.userService.getAllByValue('email', user.email);
      }),
      map((users) => {
        if (!Array.isArray(users) || users?.length > 1) {
          throw new Error('More than 1 user found with this email address');
        }

        if (!users[0]) {
          this.logOut();

          throw new Error('No Record Found');
        } else {
          this.currentAgent$.next(users[0]);
        }

        return users[0];
      }),
      shareReplay(1)
    );

    this.userPermissions$ = this.loggedInUser$.pipe(
      mergeMap((agent) => {
        return this.userPermissionService.getAllByValue('owner', agent.id);
      })
    );
  }

  public signIn(email: string, password: string): Promise<UserCredential> {
    this.auth.onAuthStateChanged((user) => {
      this.authSate$.next(!!user);
      if (!user) {
        this.cookieService.delete(AUTH_COOKIE_NAME);
        this.cookieService.delete(USER_COOKIE_NAME);
        this.cookieService.delete(ID_TOKEN_COOKIE_NAME);
      }
    });

    return setPersistence(this.auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
  }

  public authLogin(provider: any): Promise<UserCredential> {
    return setPersistence(this.auth, browserSessionPersistence).then(() => {
      return signInWithPopup(this.auth, provider);
    });
  }

  public register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredentials) => {
        sendEmailVerification(userCredentials.user);
        setPersistence(this.auth, browserSessionPersistence);
        return userCredentials;
      })
      .catch((error) => {
        throw error;
      });
  }

  public async logOut() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    try {
      await this.router.navigate(["loginForm"]);
      await signOut(this.auth);
    } catch (error) {
      console.error('Error in Auth Service.', error);
    }
  }

  public forgotPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail);
  }

  public resetPassword(newPassword: string) {
    let that = this;

    if(this.auth.currentUser){
      updatePassword(this.auth.currentUser, newPassword).then(() => {
        that.toster.info('Password Successfully changed.');
        return true;
      }).catch(function (error) {
        that.toster.error(error);
        return false;
      });

    }
  }
}

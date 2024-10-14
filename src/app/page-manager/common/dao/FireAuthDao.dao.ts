import { Injectable, NgZone } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Agent, AgentKeys, BaseModelKeys, UserPermission } from 'ag-common-lib/public-api';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
  UserCredential,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  EMPTY,
  filter,
  from,
  fromEventPattern,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { AgentService, QueryParam, WhereFilterOperandKeys } from 'ag-common-svc/public-api';
import { AgentPermission } from 'ag-common-lib/lib/models/utils/agent-permission.model';
import { UserPermissionService } from 'ag-common-svc/lib/services/user-permissions.service';
import { AppRoutes } from 'src/app/app.model';

const USER_COOKIE_NAME = 'ag_portal_user';
const ID_TOKEN_COOKIE_NAME = 'ag_portal_token';

@Injectable({
  providedIn: 'root',
})
export class FireAuthDao {
  auth = getAuth(initializeApp(environment.firebaseConfig));

  public user: Agent;
  public currentUser$: Observable<User>;
  public currentAgent$: BehaviorSubject<Agent> = new BehaviorSubject(undefined);
  public agentPermissions$: BehaviorSubject<AgentPermission[]> = new BehaviorSubject(undefined);
  public userPermissions$: Observable<UserPermission[]> = new BehaviorSubject(undefined);
  public loggedInAgent$: Observable<Agent>;

  constructor(
    private agentService: AgentService,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService,

    private userPermissionService: UserPermissionService,
  ) {
    this.currentUser$ = fromEventPattern(
      (handler) => this.auth.onAuthStateChanged(handler),
      (_handler, unsubscribe) => {
        unsubscribe();
      },
    );

    this.loggedInAgent$ = this.currentUser$.pipe(
      mergeMap((user) => {
        const qp: QueryParam[] = [];

        if (!!user) {
          qp.push(new QueryParam(AgentKeys.p_email, WhereFilterOperandKeys.equal, user.email));
        }

        return iif(
          () => !!user,
          this.agentService.getList(qp).pipe(
            map((agents) => {
              return agents[0];
            }),
          ),
          of(null).pipe(
            mergeMap(() => {
              return this.router.navigate([AppRoutes.LoginForm]);
            }),
            map(() => null),
          ),
        );
      }),
      map((agent) => {
        this.currentAgent$.next(agent);
        return agent;
      }),
      shareReplay(1),
    );

    this.loggedInAgent$.pipe(
      filter(Boolean),
      mergeMap((agent) => {
        return this.userPermissionService.getList(agent[BaseModelKeys.dbId]);
      }),
    );
  }

  public signIn(email, password): Promise<UserCredential> {
    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        localStorage.removeItem(USER_COOKIE_NAME);
        this.cookieService.delete(ID_TOKEN_COOKIE_NAME);
      }
    });

    return setPersistence(this.auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
  }

  public register(form: UntypedFormGroup) {
    return createUserWithEmailAndPassword(this.auth, form.value.email, form.value.password)
      .then((userCredentials) => {
        sendEmailVerification(userCredentials.user);
        setPersistence(this.auth, browserLocalPersistence);
        return userCredentials;
      })
      .catch((error) => {
        throw error;
      });
  }

  public preRegister(user: Agent) {
    return createUserWithEmailAndPassword(this.auth, user.p_email, 'password').then(() => {
      return setPersistence(this.auth, browserLocalPersistence);
    });
  }

  public signOut() {
    this.currentAgent$.next(undefined);
    this.agentPermissions$.next(undefined);
    return signOut(this.auth);
  }

  public resendVerificationEmail(user: Agent) {}

  public forgotPassword(passwordResetEmail) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail);
  }

  public resetPassword(newPassword: string) {
    let that = this;

    updatePassword(this.auth.currentUser, newPassword)
      .then(() => {
        that.toster.info('Password Successfully changed for ', this.auth.currentUser.displayName);
        return true;
      })
      .catch(function (error) {
        that.toster.error(error);
        return false;
      });
  }

  signInAnonymously(): Promise<any> {
    return this.signInAnonymously();
  }
}

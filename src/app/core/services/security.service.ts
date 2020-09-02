import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../software-modules/user-management/software-features/authentication/services/authentication.service';
import {AuthenticationCommand} from '../../software-modules/user-management/software-features/authentication/services/commands/authentication-command';
import {UseCaseCommand} from '../domain/use-case-command';
import {LocaleService} from './locale.service';
import {AuthenticatedUser} from '../../software-modules/user-management/software-features/authentication/domain/authenticated-user';
import {UtilityDialogService} from '../../shares/utilities/utility-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private hasPermissionToLogin = new BehaviorSubject<boolean>(false);
  private loginMessage = new BehaviorSubject<string>('');
  private isWaitingForResponse = new BehaviorSubject<boolean>(false);
  private authenticatedUser = new BehaviorSubject<AuthenticatedUser>(null);
  private username: string;
  private password: string;

  public loginUserTitle = new BehaviorSubject<string>('');
  public userRoleNames = new BehaviorSubject<Array<string>>(Array.of());
  public userChanged = new BehaviorSubject<boolean>(false);
  public isSalesChannelSupervisor = new BehaviorSubject<boolean>(false);
  public isSalesChannelManager = new BehaviorSubject<boolean>(false);
  public userId = 0;

  constructor(private authenticationService: AuthenticationService,
              private localeService: LocaleService,
              private utilityDialogService: UtilityDialogService) {
  }

  login(username, password): void {
    this.stayInWaitingForResponse();
    // send authentication request
    this.authenticationService.authenticate(
      new UseCaseCommand<AuthenticationCommand>(
        new AuthenticationCommand(username, password),
        this.localeService.getLocale().getValue()
      )
    ).subscribe(fruit => {
      this.releaseFromWaitingForResponse();
      console.log(fruit);
      if (fruit.isSuccessful && fruit.fruit.authenticated) {
        this.userId = fruit.fruit.authenticatedUser.userId;
        this.username = username;
        this.password = password;
        this.authenticatedUser.next(fruit.fruit.authenticatedUser);
        this.userRoleNames.next(fruit.fruit.authenticatedUser.authenticatedRoleList.map(value => value.userRoleName));
        this.loginUserTitle.next(fruit.fruit.authenticatedUser.firstName + ' ' + fruit.fruit.authenticatedUser.lastName);
        this.hasPermissionToLogin.next(true);
        this.userChanged.next(true);
        this.evaluateRoles();
      } else {
        this.hasPermissionToLogin.next(false);
        this.loginMessage.next(fruit.message);
      }
    }, error => {
      this.releaseFromWaitingForResponse();
      this.utilityDialogService.showQuickServerErrorDialog(error.message);
    });
  }

  logout(): void {
    this.hasPermissionToLogin.next(false);
  }

  permissionToLogin(): BehaviorSubject<boolean> {
    return this.hasPermissionToLogin;
  }

  message(): BehaviorSubject<string> {
    return this.loginMessage;
  }

  getSecuredJsonHttpOptions(): {} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
  }

  getSecuredFileHttpOptions(): {} {
    return {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
  }

  stayInWaitingForResponse(): void {
    this.isWaitingForResponse.next(true);
  }

  releaseFromWaitingForResponse(): void {
    this.isWaitingForResponse.next(false);
  }

  waitingForResponse(): BehaviorSubject<boolean> {
    return this.isWaitingForResponse;
  }

  private evaluateRoles(): void {
    this.isSalesChannelSupervisor.next(this.isRole('SalesChannelSupervisor'));
    this.isSalesChannelManager.next(this.isRole('SalesChannelManager'));
  }

  private isRole(roleName: string): boolean {
    const roles = this.authenticatedUser.getValue().authenticatedRoleList;
    console.log('Roles size = ' + roles.length);
    for (const role of roles) {
      console.log('Role Name = ' + role.name);
      if (role.name === roleName) {
        return true;
      }
    }
    return false;
  }

  getSecuredFileUploadHttpOptions(): {} {
    return {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
  }

  getSecuredFileDownloadHttpOptions(): {} {
    return {
      responseType: 'blob',
      headers: {
        authorization: 'Basic ' + btoa(this.username + ':' + this.password)
      }
    };
  }
}

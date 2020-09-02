import {Injectable} from '@angular/core';
import {UseCaseCommand} from '../../../../../core/domain/use-case-command';
import {AuthenticationCommand} from './commands/authentication-command';
import {Observable} from 'rxjs';
import {AuthenticationFruit} from './fruits/authentication-fruit';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UseCaseFruit} from '../../../../../core/domain/use-case-fruit';
import {SecurityService} from '../../../../../core/services/security.service';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  basicUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(command: UseCaseCommand<AuthenticationCommand>): Observable<UseCaseFruit<AuthenticationFruit>> {
    const url = this.basicUrl + '/user/login';
    return this.httpClient.post<UseCaseFruit<AuthenticationFruit>>(url, command, this.getJsonHttpOptions());
  }

  getJsonHttpOptions(): {} {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }
}

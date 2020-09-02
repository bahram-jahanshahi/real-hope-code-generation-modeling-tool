import {Component, OnInit} from '@angular/core';
import {LocaleService} from '../../services/locale.service';
import {SecurityService} from '../../services/security.service';
import {environment} from '../../../../environments/environment';
import {FormControl} from '@angular/forms';
import {PreferencesService} from '../../services/preferences.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isProduction = environment.production;
  usernameFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  loginMessage: string;
  // loading progress for being in waiting for response.
  waitingForResponse = false;

  // login page or registration page
  isRegistrationPage = false;
  dark = true;

  constructor(private localeService: LocaleService,
              private securityService: SecurityService,
              private preferencesService: PreferencesService) {
    this.securityService.message().subscribe(value => this.loginMessage = value);
    this.securityService.waitingForResponse().subscribe(value => this.waitingForResponse = value);
    this.preferencesService.darkTheme.subscribe(dark => this.dark = dark);
  }

  ngOnInit() {
  }

  login() {
    this.securityService.login(this.usernameFormControl.value, this.passwordFormControl.value);
  }

  fa() {
    this.localeService.fa();
  }

  en() {
    this.localeService.en();
  }
}

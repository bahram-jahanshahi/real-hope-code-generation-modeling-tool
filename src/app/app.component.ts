import { Component } from '@angular/core';
import {LocaleService} from './core/services/locale.service';
import {PreferencesService} from './core/services/preferences.service';
import {SecurityService} from './core/services/security.service';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {NavigationService} from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rtl: boolean;
  permissionToLogin: boolean;
  dark = true;

  constructor(private localeService: LocaleService,
              private preferencesService: PreferencesService,
              private securityService: SecurityService,
              private router: Router,
              private adapter: DateAdapter<any>,
              private navigationService: NavigationService) {
    // Default routed page after login
    securityService.permissionToLogin().subscribe(permission => {
      this.permissionToLogin = permission;
      if (permission) {
        this.navigationService.navigateTo(this.navigationService.DASHBOARD);
      }
    });
    // Default direction
    localeService.rtl().subscribe(rtl => this.rtl = rtl);
    // Default Theme
    this.preferencesService.darkTheme.subscribe(dark => this.dark = dark);
    // Default Language
    localeService.fa();
    // Date picker adapter locale
    this.localeService.getLocale().subscribe(locale => {
      this.adapter.setLocale(locale);
    });
  }
}

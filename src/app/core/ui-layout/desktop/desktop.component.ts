import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from '../../services/responsive.service';
import {LocaleService} from '../../services/locale.service';
import {SecurityService} from '../../services/security.service';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  isSideBarOpened = true;
  sideNavMode = 'side';
  isMediumWeb = true;
  isLargeWeb = true;
  isSideBarMinimized = false;
  isRtl: boolean;
  mobileView = false;

  constructor(private responsiveService: ResponsiveService,
              private localeService: LocaleService,
              private securityService: SecurityService,
              private navigationService: NavigationService) {
    this.isRtl = localeService.rtl().getValue();
    localeService.rtl().subscribe(value => {
      this.isRtl = value;
    });
  }

  ngOnInit(): void {
    // Medium Observation
    this.responsiveService.isWebMedium
      .subscribe(matched => {
        this.isMediumWeb = matched;
        if (matched) {
          this.changeSideNavMode('side');
          this.mobileView = false;
        } else {
          this.changeSideNavMode('over');
          this.mobileView = true;
        }
      });
    // Large Observation
    this.responsiveService.isWebLarge
      .subscribe(matched => {
        this.isLargeWeb = matched;
      });
  }

  sideBarClicked(to: string): void {
    if (!this.isMediumWeb) {
      this.closeSideBar();
    }
    this.navigateTo(to);
  }

  changeSideNavMode(mode: string): void {
    this.sideNavMode = mode;
    if (mode === 'side') {
      this.openSideBar();
    }
    if (mode === 'over') {
      this.closeSideBar();
    }
  }

  closeSideBar(): void {
    this.isSideBarOpened = false;
  }

  openSideBar(): void {
    this.isSideBarOpened = true;
  }

  toggleSideBar(isMinimized: boolean): void {
    this.isSideBarMinimized = isMinimized;
  }

  directionChanged($event: string): void {
    if ($event === 'RTL') {
      this.localeService.fa();
    }
    if ($event === 'LTR') {
      this.localeService.en();
    }
  }

  logout($event: boolean): void {
    if ($event === true) {
      this.securityService.logout();
    }
  }

  navigateTo(destination: string): void {
    switch (destination) {
      case 'dashboard': {
        this.url(this.navigationService.DASHBOARD);
        break;
      }
      case 'preferences': {
        this.url(this.navigationService.PREFERENCES);
        break;
      }
      case 'list-software-by-project-manager': {
        this.url(this.navigationService.LIST_SOFTWARE_BY_PROJECT_MANAGER);
        break;
      }
      case 'list-use-case-data-attribute-by-project-manager': {
        this.url(this.navigationService.LIST_USE_CASE_DATA_ATTRIBUTE_BY_PROJECT_MANAGER);
        break;
      }
      case 'list-use-case-by-project-manager': {
        this.url(this.navigationService.LIST_USE_CASE_BY_PROJECT_MANAGER);
        break;
      }
    }
  }

  private url(url: string): void {
    this.navigationService.navigateTo(url);
  }

}

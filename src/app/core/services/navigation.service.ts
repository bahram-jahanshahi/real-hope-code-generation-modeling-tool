import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public DASHBOARD = 'DASHBOARD';
  public PREFERENCES = 'PREFERENCES';
  public LIST_SOFTWARE_BY_PROJECT_MANAGER = 'LIST_SOFTWARE_BY_PROJECT_MANAGER';
  constructor(private router: Router) {
  }

  navigateTo(destination: string): void {
    switch (destination) {
      case this.DASHBOARD: {
        this.url('app/dashboard');
        break;
      }
      case this.PREFERENCES: {
        this.url('app/view/preferences');
        break;
      }
      case this.LIST_SOFTWARE_BY_PROJECT_MANAGER : {
        this.url('app/admin/software/list-software-by-project-manager');
        break;
      }
    }
  }

  private url(url: string): void {
    this.router.navigate([url]).then();
  }
}

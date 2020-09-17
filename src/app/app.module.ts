import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from './core/ui-layout/login-form/login-form.component';
import {DesktopComponent} from './core/ui-layout/desktop/desktop.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {PreferencesService} from './core/services/preferences.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MaterialPersianDateModule} from './shares/jalali_date/material/material-persian-date.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterModule, Routes} from '@angular/router';
import {TopMenuLargeComponent} from './core/ui-layout/desktop/top-menu-large/top-menu-large.component';
import {environment} from '../environments/environment';
import {SampleDialogComponent} from './shares/components/dialogs/sample-dialog/sample-dialog.component';
import {ConfirmationDialogComponent} from './shares/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {SuccessDialogComponent} from './shares/components/dialogs/success-dialog/success-dialog.component';
import {ErrorDialogComponent} from './shares/components/dialogs/error-dialog/error-dialog.component';
import {SubmitButtonBarComponent} from './shares/components/buttons/submit-button-bar/submit-button-bar.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {DashboardComponent} from './core/ui-layout/dashboard/dashboard.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ListSoftwareByProjectManagerComponent} from './software-modules/software-design/software-features/software/components/list-software-by-project-manager/list-software-by-project-manager.component';
import {AddNewSoftwareByProjectManagerComponent} from './software-modules/software-design/software-features/software/components/add-new-software-by-project-manager/add-new-software-by-project-manager.component';
import {DeleteSoftwareByProjectManagerComponent} from './software-modules/software-design/software-features/software/components/delete-software-by-project-manager/delete-software-by-project-manager.component';
import {UpdateSoftwareByProjectManagerComponent} from './software-modules/software-design/software-features/software/components/update-software-by-project-manager/update-software-by-project-manager.component';
import {ViewSoftwareByProjectManagerComponent} from './software-modules/software-design/software-features/software/components/view-software-by-project-manager/view-software-by-project-manager.component';
import {ListUseCaseDataAttributeByProjectManagerComponent} from './software-modules/software-design/software-features/use-case-data-attribute/components/list-use-case-data-attribute-by-project-manager/list-use-case-data-attribute-by-project-manager.component';
import {SearchButtonBarComponent} from './shares/components/buttons/search-button-bar/search-button-bar.component';
import {ViewUseCaseDataAttributeByProjectManagerComponent} from './software-modules/software-design/software-features/use-case-data-attribute/components/view-use-case-data-attribute-by-project-manager/view-use-case-data-attribute-by-project-manager.component';
import {UpdateUseCaseDataAttributeByProjectManagerComponent} from './software-modules/software-design/software-features/use-case-data-attribute/components/update-use-case-data-attribute-by-project-manager/update-use-case-data-attribute-by-project-manager.component';
import {AddNewUseCaseDataAttributeByProjectManagerComponent} from './software-modules/software-design/software-features/use-case-data-attribute/components/add-new-use-case-data-attribute-by-project-manager/add-new-use-case-data-attribute-by-project-manager.component';
import {ListUseCaseByProjectManagerComponent} from './software-modules/software-design/software-features/use-case/components/list-use-case-by-project-manager/list-use-case-by-project-manager.component';
import {ViewUseCaseByProjectManagerComponent} from './software-modules/software-design/software-features/use-case/components/view-use-case-by-project-manager/view-use-case-by-project-manager.component';
import {AddNewUseCaseByProjectManagerComponent} from './software-modules/software-design/software-features/use-case/components/add-new-use-case-by-project-manager/add-new-use-case-by-project-manager.component';
import {UpdateUseCaseByProjectManagerComponent} from './software-modules/software-design/software-features/use-case/components/update-use-case-by-project-manager/update-use-case-by-project-manager.component';
import {DeleteUseCaseByProjectManagerComponent} from './software-modules/software-design/software-features/use-case/components/delete-use-case-by-project-manager/delete-use-case-by-project-manager.component';
import { UseCaseDataTableViewComponent } from './software-modules/software-design/software-features/use-case/components/view-use-case-by-project-manager/use-case-data-table-view/use-case-data-table-view.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader { // TranslateHttpLoader {
  const baseHref = environment.baseHref;
  return new MultiTranslateHttpLoader(http, [
    {prefix: baseHref + '/assets/i18n/', suffix: '.json'},
    {prefix: baseHref + '/assets/i18n/', suffix: '.gen.json'},
  ]);
  /*return new TranslateHttpLoader(http, baseHref + '/assets/i18n/', '.json');*/
}

const appRoutes: Routes = [
  {path: 'app/dashboard', component: DashboardComponent},
  {path: 'app/admin/software/list-software-by-project-manager', component: ListSoftwareByProjectManagerComponent},
  {
    path: 'app/admin/use-case-data-attribute/list-use-case-data-attribute-by-project-manager',
    component: ListUseCaseDataAttributeByProjectManagerComponent
  },
  {
    path: 'app/admin/use-case/list-use-case-by-project-manager',
    component: ListUseCaseByProjectManagerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DesktopComponent,
    TopMenuLargeComponent,
    SampleDialogComponent,
    ConfirmationDialogComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    SubmitButtonBarComponent,
    DashboardComponent,
    SearchButtonBarComponent,
    AddNewSoftwareByProjectManagerComponent,
    DeleteSoftwareByProjectManagerComponent,
    ListSoftwareByProjectManagerComponent,
    UpdateSoftwareByProjectManagerComponent,
    ViewSoftwareByProjectManagerComponent,
    ListUseCaseDataAttributeByProjectManagerComponent,
    ViewUseCaseDataAttributeByProjectManagerComponent,
    UpdateUseCaseDataAttributeByProjectManagerComponent,
    AddNewUseCaseDataAttributeByProjectManagerComponent,
    ListUseCaseByProjectManagerComponent,
    ViewUseCaseByProjectManagerComponent,
    AddNewUseCaseByProjectManagerComponent,
    UpdateUseCaseByProjectManagerComponent,
    DeleteUseCaseByProjectManagerComponent,
    UseCaseDataTableViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatRippleModule,
    MatTabsModule,
    MatBadgeModule,
    MatDatepickerModule,
    FormsModule,
    /*MatMomentDateModule*/
    /*MatNativeDateModule,*/ // before Material Persian Date Module
    MaterialPersianDateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer, private preferencesService: PreferencesService) {
    overlayContainer.getContainerElement().classList.add('dark-theme');
    preferencesService.darkTheme.subscribe(dark => {
      if (dark) {
        overlayContainer.getContainerElement().classList.add('dark-theme');
      } else {
        overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
  }
}

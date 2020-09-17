import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NavigationService} from '../../../../../../core/services/navigation.service';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {ResponsiveService} from '../../../../../../core/services/responsive.service';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';
import {UseCaseSeedsCommand} from '../../../../../../core/domain/use-case-seeds-command';
import {PaginationCommand} from '../../../../../../core/domain/pagination-command';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {SelectEnum} from '../../../../../../core/domain/select-enum';
import {UtilityDateService} from '../../../../../../shares/utilities/utility-date.service';
import {
  ListUseCaseByProjectManagerPlant,
  ListUseCaseByProjectManagerService,
  ListUseCaseByProjectManagerFruitSeeds,
  ListUseCaseByProjectManagerSeedsCommand,
} from '../../services/list-use-case-by-project-manager.service';
import {UseCase4ProjectManager} from '../../domain/use-case4-project-manager';
import {ViewUseCaseByProjectManagerComponent} from '../view-use-case-by-project-manager/view-use-case-by-project-manager.component';
import {AddNewUseCaseByProjectManagerComponent} from '../add-new-use-case-by-project-manager/add-new-use-case-by-project-manager.component';

@Component({
  selector: 'app-list-use-case-by-project-manager',
  templateUrl: './list-use-case-by-project-manager.component.html',
  styleUrls: ['./list-use-case-by-project-manager.component.css']
})
export class ListUseCaseByProjectManagerComponent implements OnInit {

  loading = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = [
    'Id',
    'UseCaseName',
    'UserInterfaceType',
    'SoftwareName',
    'SoftwareModuleName',
    'SoftwareFeatureName',
    'SoftwareRole',
    'GenerationEnable'
  ];

  dataSource = new MatTableDataSource<UseCase4ProjectManager>();
  dataArray = new Array<UseCase4ProjectManager>();


  realTimeSearchEnabled = true;
  // form controls
    useCaseNameFormControl = new FormControl(null);

  isWebMedium = false;

  constructor(private useCase: ListUseCaseByProjectManagerService,
              private navigationService: NavigationService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              private dateService: UtilityDateService,
              private responsiveService: ResponsiveService) {
    this.responsiveService.isWebMedium.subscribe(value => this.isWebMedium = value);
  }

  ngOnInit(): void {
    this.paginator.pageSize = 10;
    this.paginator.page.subscribe(() => this.search());
    this.prepare();
    this.realTime(this.useCaseNameFormControl);
  }

  realTime(formControl: FormControl): void {
    formControl.valueChanges.pipe(debounceTime(800), distinctUntilChanged())
      .subscribe(() => {
        if (this.realTimeSearchEnabled) {
          this.search();
        }
      });
  }

  search(): void {
    this.loading = true;
    const useCaseNameInput = this.useCaseNameFormControl.value;
    this.useCase
      .cultivate(
        new UseCaseCommand<ListUseCaseByProjectManagerPlant>(
          new ListUseCaseByProjectManagerPlant(
            useCaseNameInput,
            new PaginationCommand(this.paginator.pageIndex, this.paginator.pageSize)
          ),
          this.localeService.getLocale().getValue()
        )
      )
      .subscribe(fruit => {
        this.loading = false;
        if (fruit.isSuccessful) {
          this.dataSource.data = fruit.fruit.dataArray;
          this.dataArray = fruit.fruit.dataArray;
          this.paginator.length = fruit.fruit.pagedResultFruit.totalElements;
        } else {
          this.dialogService.showErrorDialog(new ErrorDialogData('', Array.of(fruit.message)));
        }
      }, error => {
        this.loading = false;
        this.dialogService.showQuickServerErrorDialog('Error: ' + error.message);
      });
  }

  prepare(): void {
    this.useCase
      .prepare(new UseCaseSeedsCommand<ListUseCaseByProjectManagerSeedsCommand>(
        new ListUseCaseByProjectManagerSeedsCommand(null),
        this.localeService.getLocale().getValue()
      ))
      .subscribe(fruitSeeds => {
        if (fruitSeeds.isSuccessful) {
          this.search();
        } else {
          this.dialogService.showErrorDialog(new ErrorDialogData('', Array.of(fruitSeeds.message)));
        }
      }, error => {
        this.dialogService.showQuickServerErrorDialog(error.message);
      });
  }

  resetSearchForm(): void {
    this.search();
  }

  realTimeSearchChanged($event: boolean): void {
    this.realTimeSearchEnabled = $event;
  }

  view(row: any): void {
    this.dialogService
      .quickPopupDialog(ViewUseCaseByProjectManagerComponent, row.id)
      .afterClosed()
      .subscribe(value => this.search());
  }

  addNew(): void {
    this.dialogService
      .quickPopupDialog(AddNewUseCaseByProjectManagerComponent, null)
      .afterClosed()
      .subscribe(value => this.search());
  }

}

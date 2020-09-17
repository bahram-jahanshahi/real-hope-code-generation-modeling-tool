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
  ListUseCaseDataAttributeByProjectManagerPlant,
  ListUseCaseDataAttributeByProjectManagerService,
  ListUseCaseDataAttributeByProjectManagerFruitSeeds,
  ListUseCaseDataAttributeByProjectManagerSeedsCommand,
} from '../../services/list-use-case-data-attribute-by-project-manager.service';
import {UseCaseDataAttribute4ProjectManager} from '../../domain/use-case-data-attribute4-project-manager';
import {ViewUseCaseDataAttributeByProjectManagerComponent} from '../view-use-case-data-attribute-by-project-manager/view-use-case-data-attribute-by-project-manager.component';
import {AddNewUseCaseDataAttributeByProjectManagerComponent} from '../add-new-use-case-data-attribute-by-project-manager/add-new-use-case-data-attribute-by-project-manager.component';

@Component({
  selector: 'app-list-use-case-data-attribute-by-project-manager',
  templateUrl: './list-use-case-data-attribute-by-project-manager.component.html',
  styleUrls: ['./list-use-case-data-attribute-by-project-manager.component.css']
})
export class ListUseCaseDataAttributeByProjectManagerComponent implements OnInit {

  loading = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = [
    'Id',
    'UseCaseName',
    'UseCaseDataName',
    'Name',
    'UseCaseUsageEnum',
    'AttributeCategory'
  ];

  dataSource = new MatTableDataSource<UseCaseDataAttribute4ProjectManager>();
  dataArray = new Array<UseCaseDataAttribute4ProjectManager>();


  realTimeSearchEnabled = true;
  // form controls
    useCaseDataAttributeNameFormControl = new FormControl(null);

  isWebMedium = false;

  constructor(private useCase: ListUseCaseDataAttributeByProjectManagerService,
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
    this.realTime(this.useCaseDataAttributeNameFormControl);
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
    const useCaseDataAttributeNameInput = this.useCaseDataAttributeNameFormControl.value;
    this.useCase
      .cultivate(
        new UseCaseCommand<ListUseCaseDataAttributeByProjectManagerPlant>(
          new ListUseCaseDataAttributeByProjectManagerPlant(
            useCaseDataAttributeNameInput,
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
      .prepare(new UseCaseSeedsCommand<ListUseCaseDataAttributeByProjectManagerSeedsCommand>(
        new ListUseCaseDataAttributeByProjectManagerSeedsCommand(null),
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
      .quickPopupDialog(ViewUseCaseDataAttributeByProjectManagerComponent, row.id)
      .afterClosed()
      .subscribe(value => this.search());
  }

  addNew(): void {
    this.dialogService
      .quickPopupDialog(AddNewUseCaseDataAttributeByProjectManagerComponent, null)
      .afterClosed()
      .subscribe(value => this.search());
  }

}

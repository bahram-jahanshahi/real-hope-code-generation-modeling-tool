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
import {SelectEntity} from '../../../../../../core/domain/select-entity';
import {UtilityDateService} from '../../../../../../shares/utilities/utility-date.service';
import {
  ListSoftwareByProjectManagerPlant,
  ListSoftwareByProjectManagerService,
  ListSoftwareByProjectManagerFruitSeeds,
  ListSoftwareByProjectManagerSeedsCommand,
} from '../../services/list-software-by-project-manager.service';
import {Software4ProjectManager} from '../../domain/software4-project-manager';
import {ViewSoftwareByProjectManagerComponent} from '../view-software-by-project-manager/view-software-by-project-manager.component';
import {AddNewSoftwareByProjectManagerComponent} from '../add-new-software-by-project-manager/add-new-software-by-project-manager.component';

@Component({
  selector: 'app-list-software-by-project-manager',
  templateUrl: './list-software-by-project-manager.component.html',
  styleUrls: ['./list-software-by-project-manager.component.css']
})
export class ListSoftwareByProjectManagerComponent implements OnInit {

  loading = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = [
    'Id',
    'Name',
    'Title'
  ];

  dataSource = new MatTableDataSource<Software4ProjectManager>();
  dataArray = new Array<Software4ProjectManager>();


  realTimeSearchEnabled = true;
  // form controls
    softwareNameFormControl = new FormControl(null);
    softwareTitleFormControl = new FormControl(null);

  isWebMedium = false;

  constructor(private useCase: ListSoftwareByProjectManagerService,
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
    this.realTime(this.softwareNameFormControl);
    this.realTime(this.softwareTitleFormControl);
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
    const softwareNameInput = this.softwareNameFormControl.value;
    const softwareTitleInput = this.softwareTitleFormControl.value;
    this.useCase
      .cultivate(
        new UseCaseCommand<ListSoftwareByProjectManagerPlant>(
          new ListSoftwareByProjectManagerPlant(
            softwareNameInput,
            softwareTitleInput,
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
      .prepare(new UseCaseSeedsCommand<ListSoftwareByProjectManagerSeedsCommand>(
        new ListSoftwareByProjectManagerSeedsCommand(null),
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
      .quickPopupDialog(ViewSoftwareByProjectManagerComponent, row.id)
      .afterClosed()
      .subscribe(value => this.search());
  }

  addNew(): void {
    this.dialogService
      .quickPopupDialog(AddNewSoftwareByProjectManagerComponent, null)
      .afterClosed()
      .subscribe(value => this.search());
  }

}

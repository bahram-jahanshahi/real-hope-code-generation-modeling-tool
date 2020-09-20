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
  GridListSampleBByProjectManagerPlant,
  GridListSampleBByProjectManagerService,
  GridListSampleBByProjectManagerFruitSeeds,
  GridListSampleBByProjectManagerSeedsCommand,
} from '../../services/grid-list-sample-b-by-project-manager.service';
import {SampleB4ProjectManager} from '../../domain/sample-b4-project-manager';
import {ViewSampleBByProjectManagerComponent} from '../view-sample-b-by-project-manager/view-sample-b-by-project-manager.component';
import {AddNewSampleBByProjectManagerComponent} from '../add-new-sample-b-by-project-manager/add-new-sample-b-by-project-manager.component';

@Component({
  selector: 'app-grid-list-sample-b-by-project-manager',
  templateUrl: './grid-list-sample-b-by-project-manager.component.html',
  styleUrls: ['./grid-list-sample-b-by-project-manager.component.css']
})
export class GridListSampleBByProjectManagerComponent implements OnInit {

  loading = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = [
    'Id',
    'Name',
    'Active',
    'CreateDate',
    'Value',
    'SampleStatus',
    'SampleA'
  ];

  dataSource = new MatTableDataSource<SampleB4ProjectManager>();
  dataArray = new Array<SampleB4ProjectManager>();

  sampleStatusEnumArray = new Array<SelectEnum>();

  sampleAArray = new Array<SelectEntity>();

  realTimeSearchEnabled = true;
  // form controls
    idFormControl = new FormControl(null);
    nameFormControl = new FormControl(null);
    activeFormControl = new FormControl(null);
    createDateBeginFormControl = new FormControl(null);
    createDateEndFormControl = new FormControl(null);
    valueBeginFormControl = new FormControl(null);
    valueEndFormControl = new FormControl(null);
    sampleStatusFormControl = new FormControl(null);
    sampleAFormControl = new FormControl(null);

  isWebMedium = false;

  constructor(private useCase: GridListSampleBByProjectManagerService,
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
    this.realTime(this.idFormControl);
    this.realTime(this.nameFormControl);
    this.realTime(this.activeFormControl);
    this.realTime(this.createDateBeginFormControl);
    this.realTime(this.createDateEndFormControl);
    this.realTime(this.valueBeginFormControl);
    this.realTime(this.valueEndFormControl);
    this.realTime(this.sampleStatusFormControl);
    this.realTime(this.sampleAFormControl);
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
    const idInput = this.idFormControl.value;
    const nameInput = this.nameFormControl.value;
    const activeInput = this.activeFormControl.value;
    const createDateBeginInput = this.dateService.getJavaDateOfMoment(this.createDateBeginFormControl.value);
    const createDateEndInput = this.dateService.getJavaDateOfMoment(this.createDateEndFormControl.value);
    const valueBeginInput = this.valueBeginFormControl.value;
    const valueEndInput = this.valueEndFormControl.value;
    const sampleStatusInput = new SelectEnum(null, this.sampleStatusFormControl.value);
    const sampleAInput = new SelectEntity(null, this.sampleAFormControl.value);
    this.useCase
      .cultivate(
        new UseCaseCommand<GridListSampleBByProjectManagerPlant>(
          new GridListSampleBByProjectManagerPlant(
            idInput,
            nameInput,
            activeInput,
            createDateBeginInput,
            createDateEndInput,
            valueBeginInput,
            valueEndInput,
            sampleStatusInput,
            sampleAInput,
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
      .prepare(new UseCaseSeedsCommand<GridListSampleBByProjectManagerSeedsCommand>(
        new GridListSampleBByProjectManagerSeedsCommand(null),
        this.localeService.getLocale().getValue()
      ))
      .subscribe(fruitSeeds => {
        if (fruitSeeds.isSuccessful) {
          this.sampleStatusEnumArray = fruitSeeds.fruitSeeds.sampleStatusEnumArray;
          this.sampleAArray = fruitSeeds.fruitSeeds.sampleAArray;
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
      .quickPopupDialog(ViewSampleBByProjectManagerComponent, row.id)
      .afterClosed()
      .subscribe(value => this.search());
  }

  addNew(): void {
    this.dialogService
      .quickPopupDialog(AddNewSampleBByProjectManagerComponent, null)
      .afterClosed()
      .subscribe(value => this.search());
  }

}

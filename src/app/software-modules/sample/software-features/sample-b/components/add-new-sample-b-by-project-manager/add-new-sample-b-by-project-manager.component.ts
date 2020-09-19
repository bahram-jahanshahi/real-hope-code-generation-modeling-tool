import {Component, Inject, OnInit} from '@angular/core';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {UtilityDateService} from '../../../../../../shares/utilities/utility-date.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UseCaseSeedsCommand} from '../../../../../../core/domain/use-case-seeds-command';
import {ConfirmationDialogData} from '../../../../../../shares/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  AddNewSampleBByProjectManagerPlant,
  AddNewSampleBByProjectManagerSeedsCommand,
  AddNewSampleBByProjectManagerFruitSeeds,
  AddNewSampleBByProjectManagerService
} from '../../services/add-new-sample-b-by-project-manager.service';
import {SelectEnum} from '../../../../../../core/domain/select-enum';
import {SelectEntity} from '../../../../../../core/domain/select-entity';

@Component({
  selector: 'app-add-new-sample-b-by-project-manager',
  templateUrl: './add-new-sample-b-by-project-manager.component.html',
  styleUrls: ['./add-new-sample-b-by-project-manager.component.css']
})
export class AddNewSampleBByProjectManagerComponent implements OnInit {
  entityId: number;
  readyToUpdate = false;
  loading = false;
  reactiveForm: FormGroup;

  sampleStatusEnumArray: Array<SelectEnum>;
  sampleAArray: Array<SelectEntity>;

  constructor(private useCase: AddNewSampleBByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              private dateService: UtilityDateService,
              public dialogRef: MatDialogRef<AddNewSampleBByProjectManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.entityId = data;
  }

  ngOnInit(): void {
    this.prepare();
  }

  init(fruitSeeds: AddNewSampleBByProjectManagerFruitSeeds): void {
    const idFruitSeeds = fruitSeeds.id;
    const nameFruitSeeds = fruitSeeds.name;
    const activeFruitSeeds = fruitSeeds.active;
    const createDateFruitSeeds = this.dateService.getMomentOfJavaDate(fruitSeeds.createDate);
    const valueFruitSeeds = fruitSeeds.value;
    const sampleStatusEnumFruitSeeds = fruitSeeds.sampleStatusEnum;
    this.sampleStatusEnumArray = fruitSeeds.sampleStatusEnumArray;
    const sampleAFruitSeeds = fruitSeeds.sampleA;
    this.sampleAArray = fruitSeeds.sampleAArray;
    this.reactiveForm = new FormGroup({
      id: new FormControl(idFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(1), Validators.max(100000000)]),
      name: new FormControl(nameFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      active: new FormControl(activeFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      createDate: new FormControl(createDateFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      value: new FormControl(valueFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(1), Validators.max(100000000)]),
      sampleStatusEnum: new FormControl(sampleStatusEnumFruitSeeds.value, [Validators.nullValidator, Validators.required]),
      sampleA: new FormControl(sampleAFruitSeeds.value, [Validators.nullValidator, Validators.required])
    });
    this.readyToUpdate = true;
  }

  public submit(): void {
    this.dialogService
      .showQuickConfirmationDialog()
      .afterClosed()
      .subscribe(value => {
        if (value === 'Yes') {
          this.cultivate();
        }
      });
  }

  private cultivate(): void {
    const idInput = this.reactiveForm.get('id').value;
    const nameInput = this.reactiveForm.get('name').value;
    const activeInput = this.reactiveForm.get('active').value;
    const createDateInput = this.dateService.getJavaDateOfMoment(this.reactiveForm.get('createDate').value);
    const valueInput = this.reactiveForm.get('value').value;
    const sampleStatusInput = new SelectEnum(null, this.reactiveForm.get('sampleStatusEnum').value);
    const sampleAInput = new SelectEntity(null, this.reactiveForm.get('sampleA').value);
    this.useCase
      .cultivate(new UseCaseCommand<AddNewSampleBByProjectManagerPlant>(
        new AddNewSampleBByProjectManagerPlant(
          idInput,
          nameInput,
          activeInput,
          createDateInput,
          valueInput,
          sampleStatusInput,
          sampleAInput
        ),
        this.localeService.getLocale().getValue()
      ))
      .subscribe(fruit => {
        if (fruit.isSuccessful) {
          this.close();
        } else {
          this.dialogService.showErrorDialog(new ErrorDialogData('', Array.of(fruit.message)));
        }
      }, error => {
        this.dialogService.showQuickServerErrorDialog(error.message);
      });
  }

  private prepare(): void {
    this.useCase
      .prepare(new UseCaseSeedsCommand<AddNewSampleBByProjectManagerSeedsCommand>(
        new AddNewSampleBByProjectManagerSeedsCommand(this.entityId),
        this.localeService.getLocale().getValue()
      ))
      .subscribe(fruitSeeds => {
        if (fruitSeeds.isSuccessful) {
          this.init(fruitSeeds.fruitSeeds);
        } else {
          this.dialogService.showErrorDialog(new ErrorDialogData('', Array.of(fruitSeeds.message)));
        }
      }, error => {
        this.dialogService.showQuickServerErrorDialog(error.message);
      });
  }

  public close(): void {
    this.dialogRef.close();
  }

}

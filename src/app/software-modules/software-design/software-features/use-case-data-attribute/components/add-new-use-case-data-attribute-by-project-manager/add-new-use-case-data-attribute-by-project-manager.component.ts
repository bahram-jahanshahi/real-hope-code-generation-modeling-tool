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
  AddNewUseCaseDataAttributeByProjectManagerPlant,
  AddNewUseCaseDataAttributeByProjectManagerSeedsCommand,
  AddNewUseCaseDataAttributeByProjectManagerFruitSeeds,
  AddNewUseCaseDataAttributeByProjectManagerService
} from '../../services/add-new-use-case-data-attribute-by-project-manager.service';
import {SelectEnum} from '../../../../../../core/domain/select-enum';
import {SelectEntity} from '../../../../../../core/domain/select-entity';

@Component({
  selector: 'app-add-new-use-case-data-attribute-by-project-manager',
  templateUrl: './add-new-use-case-data-attribute-by-project-manager.component.html',
  styleUrls: ['./add-new-use-case-data-attribute-by-project-manager.component.css']
})
export class AddNewUseCaseDataAttributeByProjectManagerComponent implements OnInit {
  entityId: number;
  readyToUpdate = false;
  loading = false;
  reactiveForm: FormGroup;

  useCaseUsageEnumEnumArray: Array<SelectEnum>;
  attributeQuantityEnumArray: Array<SelectEnum>;
  attributeCategoryEnumArray: Array<SelectEnum>;
  primitiveAttributeTypeEnumArray: Array<SelectEnum>;
  domainEntityAttributeTypeArray: Array<SelectEntity>;
  dataEntityAttributeTypeArray: Array<SelectEntity>;
  useCaseDataArray: Array<SelectEntity>;
  fruitSeedsAttributeArray: Array<SelectEntity>;
  dataEnumArray: Array<SelectEntity>;

  constructor(private useCase: AddNewUseCaseDataAttributeByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              private dateService: UtilityDateService,
              public dialogRef: MatDialogRef<AddNewUseCaseDataAttributeByProjectManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.entityId = data;
  }

  ngOnInit(): void {
    this.prepare();
  }

  init(fruitSeeds: AddNewUseCaseDataAttributeByProjectManagerFruitSeeds): void {
    const idFruitSeeds = fruitSeeds.id;
    const nameFruitSeeds = fruitSeeds.name;
    const titleFruitSeeds = fruitSeeds.title;
    const faTitleFruitSeeds = fruitSeeds.faTitle;
    const descriptionFruitSeeds = fruitSeeds.description;
    const uiRowFruitSeeds = fruitSeeds.uiRow;
    const uiColumnFruitSeeds = fruitSeeds.uiColumn;
    const useCaseUsageEnumEnumFruitSeeds = fruitSeeds.useCaseUsageEnumEnum;
    this.useCaseUsageEnumEnumArray = fruitSeeds.useCaseUsageEnumEnumArray;
    const attributeQuantityEnumFruitSeeds = fruitSeeds.attributeQuantityEnum;
    this.attributeQuantityEnumArray = fruitSeeds.attributeQuantityEnumArray;
    const attributeCategoryEnumFruitSeeds = fruitSeeds.attributeCategoryEnum;
    this.attributeCategoryEnumArray = fruitSeeds.attributeCategoryEnumArray;
    const primitiveAttributeTypeEnumFruitSeeds = fruitSeeds.primitiveAttributeTypeEnum;
    this.primitiveAttributeTypeEnumArray = fruitSeeds.primitiveAttributeTypeEnumArray;
    const setterOfUpdatePathFruitSeeds = fruitSeeds.setterOfUpdatePath;
    const getterOfUpdatePathFruitSeeds = fruitSeeds.getterOfUpdatePath;
    const nullableFruitSeeds = fruitSeeds.nullable;
    const requiredFruitSeeds = fruitSeeds.required;
    const minLengthFruitSeeds = fruitSeeds.minLength;
    const maxLengthFruitSeeds = fruitSeeds.maxLength;
    const minFruitSeeds = fruitSeeds.min;
    const maxFruitSeeds = fruitSeeds.max;
    const errorTipFruitSeeds = fruitSeeds.errorTip;
    const domainEntityAttributeTypeFruitSeeds = fruitSeeds.domainEntityAttributeType;
    this.domainEntityAttributeTypeArray = fruitSeeds.domainEntityAttributeTypeArray;
    const dataEntityAttributeTypeFruitSeeds = fruitSeeds.dataEntityAttributeType;
    this.dataEntityAttributeTypeArray = fruitSeeds.dataEntityAttributeTypeArray;
    const useCaseDataFruitSeeds = fruitSeeds.useCaseData;
    this.useCaseDataArray = fruitSeeds.useCaseDataArray;
    const fruitSeedsAttributeFruitSeeds = fruitSeeds.fruitSeedsAttribute;
    this.fruitSeedsAttributeArray = fruitSeeds.fruitSeedsAttributeArray;
    const dataEnumFruitSeeds = fruitSeeds.dataEnum;
    this.dataEnumArray = fruitSeeds.dataEnumArray;
    this.reactiveForm = new FormGroup({
      id: new FormControl(idFruitSeeds, [Validators.nullValidator, Validators.required]),
      name: new FormControl(nameFruitSeeds, [Validators.nullValidator, Validators.required]),
      title: new FormControl(titleFruitSeeds, [Validators.nullValidator, Validators.required]),
      faTitle: new FormControl(faTitleFruitSeeds, [Validators.nullValidator, Validators.required]),
      description: new FormControl(descriptionFruitSeeds, [Validators.nullValidator, Validators.required]),
      uiRow: new FormControl(uiRowFruitSeeds, [Validators.nullValidator, Validators.required]),
      uiColumn: new FormControl(uiColumnFruitSeeds, [Validators.nullValidator, Validators.required]),
      useCaseUsageEnumEnum: new FormControl(useCaseUsageEnumEnumFruitSeeds.value, [Validators.nullValidator, Validators.required]),
      attributeQuantityEnum: new FormControl(attributeQuantityEnumFruitSeeds.value, [Validators.nullValidator, Validators.required]),
      attributeCategoryEnum: new FormControl(attributeCategoryEnumFruitSeeds.value, [Validators.nullValidator, Validators.required]),
      primitiveAttributeTypeEnum: new FormControl(primitiveAttributeTypeEnumFruitSeeds.value, [Validators.nullValidator, Validators.required]),
      setterOfUpdatePath: new FormControl(setterOfUpdatePathFruitSeeds, []),
      getterOfUpdatePath: new FormControl(getterOfUpdatePathFruitSeeds, []),
      nullable: new FormControl(nullableFruitSeeds, [Validators.nullValidator, Validators.required]),
      required: new FormControl(requiredFruitSeeds, [Validators.nullValidator, Validators.required]),
      minLength: new FormControl(minLengthFruitSeeds, [Validators.nullValidator, Validators.required]),
      maxLength: new FormControl(maxLengthFruitSeeds, [Validators.nullValidator, Validators.required]),
      min: new FormControl(minFruitSeeds, [Validators.nullValidator, Validators.required]),
      max: new FormControl(maxFruitSeeds, [Validators.nullValidator, Validators.required]),
      errorTip: new FormControl(errorTipFruitSeeds, [Validators.nullValidator, Validators.required]),
      domainEntityAttributeType: new FormControl(domainEntityAttributeTypeFruitSeeds.value, []),
      dataEntityAttributeType: new FormControl(dataEntityAttributeTypeFruitSeeds.value, []),
      useCaseData: new FormControl(useCaseDataFruitSeeds.value, [Validators.nullValidator, Validators.required]),
      fruitSeedsAttribute: new FormControl(fruitSeedsAttributeFruitSeeds.value, []),
      dataEnum: new FormControl(dataEnumFruitSeeds.value, [])
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
    const titleInput = this.reactiveForm.get('title').value;
    const faTitleInput = this.reactiveForm.get('faTitle').value;
    const descriptionInput = this.reactiveForm.get('description').value;
    const uiRowInput = this.reactiveForm.get('uiRow').value;
    const uiColumnInput = this.reactiveForm.get('uiColumn').value;
    const useCaseUsageEnumInput = new SelectEnum(null, this.reactiveForm.get('useCaseUsageEnumEnum').value);
    const attributeQuantityInput = new SelectEnum(null, this.reactiveForm.get('attributeQuantityEnum').value);
    const attributeCategoryInput = new SelectEnum(null, this.reactiveForm.get('attributeCategoryEnum').value);
    const primitiveAttributeTypeInput = new SelectEnum(null, this.reactiveForm.get('primitiveAttributeTypeEnum').value);
    const setterOfUpdatePathInput = this.reactiveForm.get('setterOfUpdatePath').value;
    const getterOfUpdatePathInput = this.reactiveForm.get('getterOfUpdatePath').value;
    const nullableInput = this.reactiveForm.get('nullable').value;
    const requiredInput = this.reactiveForm.get('required').value;
    const minLengthInput = this.reactiveForm.get('minLength').value;
    const maxLengthInput = this.reactiveForm.get('maxLength').value;
    const minInput = this.reactiveForm.get('min').value;
    const maxInput = this.reactiveForm.get('max').value;
    const errorTipInput = this.reactiveForm.get('errorTip').value;
    const domainEntityAttributeTypeInput = new SelectEntity(null, this.reactiveForm.get('domainEntityAttributeType').value);
    const dataEntityAttributeTypeInput = new SelectEntity(null, this.reactiveForm.get('dataEntityAttributeType').value);
    const useCaseDataInput = new SelectEntity(null, this.reactiveForm.get('useCaseData').value);
    const fruitSeedsAttributeInput = new SelectEntity(null, this.reactiveForm.get('fruitSeedsAttribute').value);
    const dataEnumInput = new SelectEntity(null, this.reactiveForm.get('dataEnum').value);
    this.useCase
      .cultivate(new UseCaseCommand<AddNewUseCaseDataAttributeByProjectManagerPlant>(
        new AddNewUseCaseDataAttributeByProjectManagerPlant(
          idInput,
          nameInput,
          titleInput,
          faTitleInput,
          descriptionInput,
          uiRowInput,
          uiColumnInput,
          useCaseUsageEnumInput,
          attributeQuantityInput,
          attributeCategoryInput,
          primitiveAttributeTypeInput,
          setterOfUpdatePathInput,
          getterOfUpdatePathInput,
          nullableInput,
          requiredInput,
          minLengthInput,
          maxLengthInput,
          minInput,
          maxInput,
          errorTipInput,
          domainEntityAttributeTypeInput,
          dataEntityAttributeTypeInput,
          useCaseDataInput,
          fruitSeedsAttributeInput,
          dataEnumInput
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
      .prepare(new UseCaseSeedsCommand<AddNewUseCaseDataAttributeByProjectManagerSeedsCommand>(
        new AddNewUseCaseDataAttributeByProjectManagerSeedsCommand(this.entityId),
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

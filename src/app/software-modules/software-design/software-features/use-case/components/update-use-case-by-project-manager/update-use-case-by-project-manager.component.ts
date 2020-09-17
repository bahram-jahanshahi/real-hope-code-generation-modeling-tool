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
  UpdateUseCaseByProjectManagerPlant,
  UpdateUseCaseByProjectManagerSeedsCommand,
  UpdateUseCaseByProjectManagerFruitSeeds,
  UpdateUseCaseByProjectManagerService
} from '../../services/update-use-case-by-project-manager.service';
import {SelectEnum} from '../../../../../../core/domain/select-enum';
import {SelectEntity} from '../../../../../../core/domain/select-entity';

@Component({
  selector: 'app-update-use-case-by-project-manager',
  templateUrl: './update-use-case-by-project-manager.component.html',
  styleUrls: ['./update-use-case-by-project-manager.component.css']
})
export class UpdateUseCaseByProjectManagerComponent implements OnInit {
  entityId: number;
  readyToUpdate = false;
  loading = false;
  reactiveForm: FormGroup;

  userInterfaceTypeEnumArray: Array<SelectEnum>;
  softwareFeatureArray: Array<SelectEntity>;
  softwareApplicationPanelArray: Array<SelectEntity>;
  softwareRoleArray: Array<SelectEntity>;
  dataEntityArray: Array<SelectEntity>;

  constructor(private useCase: UpdateUseCaseByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              private dateService: UtilityDateService,
              public dialogRef: MatDialogRef<UpdateUseCaseByProjectManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.entityId = data;
  }

  ngOnInit(): void {
    this.prepare();
  }

  init(fruitSeeds: UpdateUseCaseByProjectManagerFruitSeeds): void {
    const idFruitSeeds = fruitSeeds.id;
    const nameFruitSeeds = fruitSeeds.name;
    const titleFruitSeeds = fruitSeeds.title;
    const faTitleFruitSeeds = fruitSeeds.faTitle;
    const descriptionFruitSeeds = fruitSeeds.description;
    const userInterfaceTypeEnumFruitSeeds = fruitSeeds.userInterfaceTypeEnum;
    this.userInterfaceTypeEnumArray = fruitSeeds.userInterfaceTypeEnumArray;
    const softwareFeatureFruitSeeds = fruitSeeds.softwareFeature;
    this.softwareFeatureArray = fruitSeeds.softwareFeatureArray;
    const softwareApplicationPanelFruitSeeds = fruitSeeds.softwareApplicationPanel;
    this.softwareApplicationPanelArray = fruitSeeds.softwareApplicationPanelArray;
    const softwareRoleFruitSeeds = fruitSeeds.softwareRole;
    this.softwareRoleArray = fruitSeeds.softwareRoleArray;
    const dataEntityFruitSeeds = fruitSeeds.dataEntity;
    this.dataEntityArray = fruitSeeds.dataEntityArray;
    const generationEnableFruitSeeds = fruitSeeds.generationEnable;
    this.reactiveForm = new FormGroup({
      id: new FormControl(idFruitSeeds, [Validators.minLength(1), Validators.maxLength(100), Validators.min(1), Validators.max(10000000)]),
      name: new FormControl(nameFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      title: new FormControl(titleFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      faTitle: new FormControl(faTitleFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      description: new FormControl(descriptionFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      userInterfaceTypeEnum: new FormControl(userInterfaceTypeEnumFruitSeeds.value, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      softwareFeature: new FormControl(softwareFeatureFruitSeeds.value, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(1), Validators.max(1)]),
      softwareApplicationPanel: new FormControl(softwareApplicationPanelFruitSeeds.value, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.min(0), Validators.max(0)]),
      softwareRole: new FormControl(softwareRoleFruitSeeds.value, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      dataEntity: new FormControl(dataEntityFruitSeeds.value, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)]),
      generationEnable: new FormControl(generationEnableFruitSeeds, [Validators.nullValidator, Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.min(0), Validators.max(0)])
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
    const userInterfaceTypeInput = new SelectEnum(null, this.reactiveForm.get('userInterfaceTypeEnum').value);
    const softwareFeatureInput = new SelectEntity(null, this.reactiveForm.get('softwareFeature').value);
    const softwareApplicationPanelInput = new SelectEntity(null, this.reactiveForm.get('softwareApplicationPanel').value);
    const softwareRoleInput = new SelectEntity(null, this.reactiveForm.get('softwareRole').value);
    const dataEntityInput = new SelectEntity(null, this.reactiveForm.get('dataEntity').value);
    const generationEnableInput = this.reactiveForm.get('generationEnable').value;
    this.useCase
      .cultivate(new UseCaseCommand<UpdateUseCaseByProjectManagerPlant>(
        new UpdateUseCaseByProjectManagerPlant(
          idInput,
          nameInput,
          titleInput,
          faTitleInput,
          descriptionInput,
          userInterfaceTypeInput,
          softwareFeatureInput,
          softwareApplicationPanelInput,
          softwareRoleInput,
          dataEntityInput,
          generationEnableInput
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
      .prepare(new UseCaseSeedsCommand<UpdateUseCaseByProjectManagerSeedsCommand>(
        new UpdateUseCaseByProjectManagerSeedsCommand(this.entityId),
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

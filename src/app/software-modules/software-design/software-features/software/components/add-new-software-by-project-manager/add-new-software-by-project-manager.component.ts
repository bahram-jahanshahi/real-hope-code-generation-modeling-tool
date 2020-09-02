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
  AddNewSoftwareByProjectManagerPlant,
  AddNewSoftwareByProjectManagerSeedsCommand,
  AddNewSoftwareByProjectManagerFruitSeeds,
  AddNewSoftwareByProjectManagerService
} from '../../services/add-new-software-by-project-manager.service';
import {SelectEnum} from '../../../../../../core/domain/select-enum';
import {SelectEntity} from '../../../../../../core/domain/select-entity';

@Component({
  selector: 'app-add-new-software-by-project-manager',
  templateUrl: './add-new-software-by-project-manager.component.html',
  styleUrls: ['./add-new-software-by-project-manager.component.css']
})
export class AddNewSoftwareByProjectManagerComponent implements OnInit {
  entityId: number;
  readyToUpdate = false;
  loading = false;
  reactiveForm: FormGroup;


  constructor(private useCase: AddNewSoftwareByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              private dateService: UtilityDateService,
              public dialogRef: MatDialogRef<AddNewSoftwareByProjectManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.entityId = data;
  }

  ngOnInit(): void {
    this.prepare();
  }

  init(fruitSeeds: AddNewSoftwareByProjectManagerFruitSeeds): void {
    const idFruitSeeds = fruitSeeds.id;
    const softwareNameFruitSeeds = fruitSeeds.softwareName;
    const softwareTitleFruitSeeds = fruitSeeds.softwareTitle;
    const springBootProjectPathFruitSeeds = fruitSeeds.springBootProjectPath;
    const springBootProjectMainPackageFruitSeeds = fruitSeeds.springBootProjectMainPackage;
    const springBootJavaSrcPathFruitSeeds = fruitSeeds.springBootJavaSrcPath;
    this.reactiveForm = new FormGroup({
      id: new FormControl(idFruitSeeds, [Validators.nullValidator, Validators.required]),
      softwareName: new FormControl(softwareNameFruitSeeds, [Validators.nullValidator, Validators.required]),
      softwareTitle: new FormControl(softwareTitleFruitSeeds, [Validators.nullValidator, Validators.required]),
      springBootProjectPath: new FormControl(springBootProjectPathFruitSeeds, [Validators.nullValidator, Validators.required]),
      springBootProjectMainPackage: new FormControl(springBootProjectMainPackageFruitSeeds, [Validators.nullValidator, Validators.required]),
      springBootJavaSrcPath: new FormControl(springBootJavaSrcPathFruitSeeds, [Validators.nullValidator, Validators.required])
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
    const softwareNameInput = this.reactiveForm.get('softwareName').value;
    const softwareTitleInput = this.reactiveForm.get('softwareTitle').value;
    const springBootProjectPathInput = this.reactiveForm.get('springBootProjectPath').value;
    const springBootProjectMainPackageInput = this.reactiveForm.get('springBootProjectMainPackage').value;
    const springBootJavaSrcPathInput = this.reactiveForm.get('springBootJavaSrcPath').value;
    this.useCase
      .cultivate(new UseCaseCommand<AddNewSoftwareByProjectManagerPlant>(
        new AddNewSoftwareByProjectManagerPlant(
          idInput,
          softwareNameInput,
          softwareTitleInput,
          springBootProjectPathInput,
          springBootProjectMainPackageInput,
          springBootJavaSrcPathInput
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
      .prepare(new UseCaseSeedsCommand<AddNewSoftwareByProjectManagerSeedsCommand>(
        new AddNewSoftwareByProjectManagerSeedsCommand(this.entityId),
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

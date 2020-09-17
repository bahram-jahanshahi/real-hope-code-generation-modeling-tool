import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {NavigationService} from '../../../../../../core/services/navigation.service';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {ResponsiveService} from '../../../../../../core/services/responsive.service';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ViewUseCaseByProjectManagerPlant,
  ViewUseCaseByProjectManagerService
} from '../../services/view-use-case-by-project-manager.service';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';
import {UseCase4ProjectManager} from '../../domain/use-case4-project-manager';
import {UpdateUseCaseByProjectManagerComponent} from '../update-use-case-by-project-manager/update-use-case-by-project-manager.component';
import {DeleteUseCaseByProjectManagerComponent} from '../delete-use-case-by-project-manager/delete-use-case-by-project-manager.component';

@Component({
  selector: 'app-view-use-case-by-project-manager',
  templateUrl: './view-use-case-by-project-manager.component.html',
  styleUrls: ['./view-use-case-by-project-manager.component.css']
})
export class ViewUseCaseByProjectManagerComponent implements OnInit {

  entityId: number;
  entity: UseCase4ProjectManager;
  readyToView = false;

  constructor(private useCase: ViewUseCaseByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              public dialogRef: MatDialogRef<ViewUseCaseByProjectManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.entityId = data;
  }
  ngOnInit(): void {
    this.cultivate();
  }

  close(): void {
    this.dialogRef.close();
  }
  private cultivate(): void {
    this.useCase
      .cultivate(
        new UseCaseCommand<ViewUseCaseByProjectManagerPlant>(
          new ViewUseCaseByProjectManagerPlant(
            this.entityId
          ),
          this.localeService.getLocale().getValue()
        )
      )
      .subscribe(fruit => {
        if (fruit.isSuccessful) {
          this.entity = fruit.fruit.entity;
          this.readyToView = true;
        } else {
          this.dialogService.showErrorDialog( new ErrorDialogData('', Array.of(fruit.message)));
        }
      }, error => {
        this.dialogService.showQuickServerErrorDialog('Error: ' + error.message);
      });
  }

  updateUseCase(): void {
    this.dialogService
      .quickPopupDialog(UpdateUseCaseByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

  deleteUseCase(): void {
    this.dialogService
      .quickPopupDialog(DeleteUseCaseByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

}


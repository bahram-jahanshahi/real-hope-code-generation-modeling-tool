import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {NavigationService} from '../../../../../../core/services/navigation.service';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {ResponsiveService} from '../../../../../../core/services/responsive.service';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  DeleteSoftwareByProjectManagerPlant,
  DeleteSoftwareByProjectManagerService
} from '../../services/delete-software-by-project-manager.service';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';

@Component({
  selector: 'app-delete-software-by-project-manager',
  templateUrl: './delete-software-by-project-manager.component.html',
  styleUrls: ['./delete-software-by-project-manager.component.css']
})
export class DeleteSoftwareByProjectManagerComponent implements OnInit {

  entityId: number;
  readyToDelete = false;

  constructor(private useCase: DeleteSoftwareByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              public dialogRef: MatDialogRef<DeleteSoftwareByProjectManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    this.entityId = data;
  }

  ngOnInit(): void {
    this.prepare();
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
    this.useCase
      .cultivate(
        new UseCaseCommand<DeleteSoftwareByProjectManagerPlant>(
          new DeleteSoftwareByProjectManagerPlant(
            this.entityId
          ),
          this.localeService.getLocale().getValue()
        )
      )
      .subscribe(fruit => {
        if (fruit.isSuccessful) {
          this.close();
        } else {
          this.dialogService.showErrorDialog( new ErrorDialogData('', Array.of(fruit.message)));
        }
      }, error => {
        this.dialogService.showQuickServerErrorDialog('Error: ' + error.message);
      });
  }

  private prepare(): void {
    this.readyToDelete = true;
  }

  close(): void {
    this.dialogRef.close();
  }
}

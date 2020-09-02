import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {NavigationService} from '../../../../../../core/services/navigation.service';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {ResponsiveService} from '../../../../../../core/services/responsive.service';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ViewSoftwareByProjectManagerPlant,
  ViewSoftwareByProjectManagerService
} from '../../services/view-software-by-project-manager.service';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';
import {Software4ProjectManager} from '../../domain/software4-project-manager';
import {UpdateSoftwareByProjectManagerComponent} from '../update-software-by-project-manager/update-software-by-project-manager.component';
import {DeleteSoftwareByProjectManagerComponent} from '../delete-software-by-project-manager/delete-software-by-project-manager.component';

@Component({
  selector: 'app-view-software-by-project-manager',
  templateUrl: './view-software-by-project-manager.component.html',
  styleUrls: ['./view-software-by-project-manager.component.css']
})
export class ViewSoftwareByProjectManagerComponent implements OnInit {

  entityId: number;
  entity: Software4ProjectManager;
  readyToView = false;

  constructor(private useCase: ViewSoftwareByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              public dialogRef: MatDialogRef<ViewSoftwareByProjectManagerComponent>,
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
        new UseCaseCommand<ViewSoftwareByProjectManagerPlant>(
          new ViewSoftwareByProjectManagerPlant(
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

  editSoftware(): void {
    this.dialogService
      .quickPopupDialog(UpdateSoftwareByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

  deleteSoftware(): void {
    this.dialogService
      .quickPopupDialog(DeleteSoftwareByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

}


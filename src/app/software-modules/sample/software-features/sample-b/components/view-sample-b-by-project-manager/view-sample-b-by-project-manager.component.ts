import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {NavigationService} from '../../../../../../core/services/navigation.service';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {ResponsiveService} from '../../../../../../core/services/responsive.service';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ViewSampleBByProjectManagerPlant,
  ViewSampleBByProjectManagerService
} from '../../services/view-sample-b-by-project-manager.service';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';
import {SampleB4ProjectManager} from '../../domain/sample-b4-project-manager';
import {UpdateSampleBByProjectManagerComponent} from '../update-sample-b-by-project-manager/update-sample-b-by-project-manager.component';
import {DeleteSampleBByProjectManagerComponent} from '../delete-sample-b-by-project-manager/delete-sample-b-by-project-manager.component';

@Component({
  selector: 'app-view-sample-b-by-project-manager',
  templateUrl: './view-sample-b-by-project-manager.component.html',
  styleUrls: ['./view-sample-b-by-project-manager.component.css']
})
export class ViewSampleBByProjectManagerComponent implements OnInit {

  entityId: number;
  entity: SampleB4ProjectManager;
  readyToView = false;

  constructor(private useCase: ViewSampleBByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              public dialogRef: MatDialogRef<ViewSampleBByProjectManagerComponent>,
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
        new UseCaseCommand<ViewSampleBByProjectManagerPlant>(
          new ViewSampleBByProjectManagerPlant(
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

  updateSampleBByProjectManager(): void {
    this.dialogService
      .quickPopupDialog(UpdateSampleBByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

  deleteSampleBByProjectManager(): void {
    this.dialogService
      .quickPopupDialog(DeleteSampleBByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

}


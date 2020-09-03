import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {NavigationService} from '../../../../../../core/services/navigation.service';
import {UtilityDialogService} from '../../../../../../shares/utilities/utility-dialog.service';
import {LocaleService} from '../../../../../../core/services/locale.service';
import {ResponsiveService} from '../../../../../../core/services/responsive.service';
import {ErrorDialogData} from '../../../../../../shares/components/dialogs/error-dialog/error-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ViewUseCaseDataAttributeByProjectManagerPlant,
  ViewUseCaseDataAttributeByProjectManagerService
} from '../../services/view-use-case-data-attribute-by-project-manager.service';
import {UseCaseCommand} from '../../../../../../core/domain/use-case-command';
import {UseCaseDataAttribute4ProjectManager} from '../../domain/use-case-data-attribute4-project-manager';
import {UpdateUseCaseDataAttributeByProjectManagerComponent} from '../update-use-case-data-attribute-by-project-manager/update-use-case-data-attribute-by-project-manager.component';

@Component({
  selector: 'app-view-use-case-data-attribute-by-project-manager',
  templateUrl: './view-use-case-data-attribute-by-project-manager.component.html',
  styleUrls: ['./view-use-case-data-attribute-by-project-manager.component.css']
})
export class ViewUseCaseDataAttributeByProjectManagerComponent implements OnInit {

  entityId: number;
  entity: UseCaseDataAttribute4ProjectManager;
  readyToView = false;

  constructor(private useCase: ViewUseCaseDataAttributeByProjectManagerService,
              private dialogService: UtilityDialogService,
              private localeService: LocaleService,
              public dialogRef: MatDialogRef<ViewUseCaseDataAttributeByProjectManagerComponent>,
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
        new UseCaseCommand<ViewUseCaseDataAttributeByProjectManagerPlant>(
          new ViewUseCaseDataAttributeByProjectManagerPlant(
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

  updateUseCaseDataAttribute(): void {
    this.dialogService
      .quickPopupDialog(UpdateUseCaseDataAttributeByProjectManagerComponent, this.entityId)
      .afterClosed()
      .subscribe(value => this.cultivate());
  }

}


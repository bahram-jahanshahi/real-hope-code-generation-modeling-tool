import {Component, Input, OnInit} from '@angular/core';
import {UseCaseDataAttribute4ProjectManager} from '../../../../use-case-data-attribute/domain/use-case-data-attribute4-project-manager';
import {UtilityDialogService} from '../../../../../../../shares/utilities/utility-dialog.service';
import {ViewUseCaseDataAttributeByProjectManagerComponent} from '../../../../use-case-data-attribute/components/view-use-case-data-attribute-by-project-manager/view-use-case-data-attribute-by-project-manager.component';
import {AddNewUseCaseDataAttributeByProjectManagerComponent} from '../../../../use-case-data-attribute/components/add-new-use-case-data-attribute-by-project-manager/add-new-use-case-data-attribute-by-project-manager.component';

@Component({
  selector: 'app-use-case-data-table-view',
  templateUrl: './use-case-data-table-view.component.html',
  styleUrls: ['./use-case-data-table-view.component.css']
})
export class UseCaseDataTableViewComponent implements OnInit {

  @Input() dataArray: Array<UseCaseDataAttribute4ProjectManager>;

  constructor(private dialogService: UtilityDialogService) {
  }

  ngOnInit(): void {
  }

  view(id: number): void {
    this.dialogService
      .quickPopupDialog(ViewUseCaseDataAttributeByProjectManagerComponent, id);
  }

  addNew(): void {
    this.dialogService
      .quickPopupDialog(AddNewUseCaseDataAttributeByProjectManagerComponent, 0);
  }
}

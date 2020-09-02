import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent, ErrorDialogData} from '../components/dialogs/error-dialog/error-dialog.component';
import {SuccessContent, SuccessDialogComponent} from '../components/dialogs/success-dialog/success-dialog.component';
import {SampleDialogComponent, SampleDialogData} from '../components/dialogs/sample-dialog/sample-dialog.component';
import {LocaleService} from '../../core/services/locale.service';
import {ComponentType} from '@angular/cdk/portal';
import {ResponsiveService} from '../../core/services/responsive.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityDialogService {

  constructor(private dialog: MatDialog, private localeService: LocaleService, private responsiveService: ResponsiveService) {
  }

  showConfirmDialog(confirmationDialogData: ConfirmationDialogData): MatDialogRef<any> {
    return this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: confirmationDialogData.width,
        height: confirmationDialogData.height,
        direction: this.localeService.rtl().getValue() ? 'rtl' : 'ltr',
        data: confirmationDialogData
      }
    );
  }

  showErrorDialog(errorDialogData: ErrorDialogData): MatDialogRef<any> {
    const responsiveWidth = !this.responsiveService.isWebMedium.getValue() ? '100%' : '50%';
    return this.dialog.open(
      ErrorDialogComponent,
      {
        width: errorDialogData.width === undefined ? responsiveWidth : errorDialogData.width,
        height: errorDialogData.height === undefined ? 'auto' : errorDialogData.height,
        direction: this.localeService.rtl().getValue() ? 'rtl' : 'ltr',
        data: errorDialogData
      }
    );
  }

  showSuccessDialog(title: string, message: string): MatDialogRef<any> {
    return this.dialog.open(
      SuccessDialogComponent,
      SuccessContent.create(title, message)
    );
  }

  showSampleDialog(sampleDialogData: SampleDialogData): MatDialogRef<any> {
    return this.dialog.open(
      SampleDialogComponent,
      {
        width: sampleDialogData.width,
        height: sampleDialogData.height,
        direction: this.localeService.rtl().getValue() ? 'rtl' : 'ltr',
        data: sampleDialogData
      }
    );
  }

  quickPopupDialog(componentOrTemplateRef: ComponentType<any>, dialogData: any, width?: string, height?: string): MatDialogRef<any> {
    const responsiveWidth = !this.responsiveService.isWebMedium.getValue() ? '100%' : '50%';
    return this.dialog.open(
      componentOrTemplateRef,
      {
        width: width === undefined ? responsiveWidth : width,
        height: height === undefined ? 'auto' : height,
        direction: this.localeService.rtl().getValue() ? 'rtl' : 'ltr',
        data: dialogData
      }
    );
  }

  showQuickServerErrorDialog(message?: string): MatDialogRef<any> {
    const messages = Array.of(
      'خطایی در ارتباط با سرور صورت گرفته است.',
      'خواهشمند است دوباره تلاش کنید و در صورتی که موفقیت آمیز نبود با پشتیبانی تماس بگیرید.'
    );
    if (message !== undefined) {
      messages.push(message);
    }
    return this.showErrorDialog(
      new ErrorDialogData(
        'خطا در ارتباط با سرور',
        messages,
        'auto',
        'auto'
      )
    );
  }

  showQuickConfirmationDialog(message?: string): MatDialogRef<any> {
    const messages = Array.of(
      'آیا از تصمیم خود اطمینان دارید؟',
    );
    if (message !== undefined) {
      messages.push(message);
    }
    return this.showConfirmDialog(
      new ConfirmationDialogData(
        'آیا از تصمیم خود اطمینان دارید؟',
        messages,
        'auto',
        'auto'
      )
    );
  }
}

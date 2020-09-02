import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  confirmationDialogData: ConfirmationDialogData;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    this.confirmationDialogData = data;
  }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close('Yes');
  }

  no() {
    this.dialogRef.close('No');
  }
}

export class ConfirmationDialogData {
  title: string;
  content: Array<string>;
  width = '50%';
  height = '96%';
  mobileViewWidth = '100%';
  mobileViewHeight = '100%';


  constructor(title: string, content: Array<string>, width?: string, height?: string) {
    this.title = title;
    this.content = content;
    this.width = width === undefined ? '50%' : width;
    this.height = height === undefined ? '96%' : height;
  }
}


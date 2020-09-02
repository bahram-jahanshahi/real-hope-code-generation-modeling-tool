import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  errorDialogData: ErrorDialogData;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {
    this.errorDialogData = data;
  }

  ngOnInit(): void {
  }

  understand(): void {
    this.dialogRef.close();
  }
}

export class ErrorDialogData {
  title: string;
  content: Array<string>;
  width = '50%';
  height = 'auto';
  mobileViewWidth = '100%';
  mobileViewHeight = '100%';

  constructor(title: string, content: Array<string>, width?: string, height?: string) {
    this.title = title;
    this.content = content;
    this.width = width === undefined ? '50%' : width;
    this.height = height === undefined ? 'auto' : height;
  }
}

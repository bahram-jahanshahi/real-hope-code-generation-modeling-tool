import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SuccessContent) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close();
  }
}

export class SuccessContent {
  title: string;
  message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }

  static create(title: string, message: string): any {
    return {data: new SuccessContent(title, message)};
  }
}

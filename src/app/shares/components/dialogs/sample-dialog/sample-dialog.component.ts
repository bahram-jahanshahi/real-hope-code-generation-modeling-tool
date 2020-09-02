import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sample-dialog',
  templateUrl: './sample-dialog.component.html',
  styleUrls: ['./sample-dialog.component.css']
})
export class SampleDialogComponent implements OnInit {

  sampleDialogData: SampleDialogData;

  constructor(public dialogRef: MatDialogRef<SampleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SampleDialogData) {
    this.sampleDialogData = data;
  }

  ngOnInit(): void {
  }

  ok() {
    this.dialogRef.close();
  }
}

export class SampleDialogData {
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

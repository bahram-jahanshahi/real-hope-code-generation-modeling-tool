import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-submit-button-bar',
  templateUrl: './submit-button-bar.component.html',
  styleUrls: ['./submit-button-bar.component.css']
})
export class SubmitButtonBarComponent implements OnInit {

  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Input() submitButtonTitle: string;
  @Input() cancelButtonTitle: string;
  @Output() clickOnSubmit = new EventEmitter();
  @Output() clickOnCancel = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    this.clickOnSubmit.emit();
  }

  cancel() {
    this.clickOnCancel.emit();
  }

}

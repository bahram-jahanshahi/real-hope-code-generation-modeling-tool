import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocaleService} from './locale.service';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar, private localeService: LocaleService) { }

  open(message, action, time) {
    this.snackBar.open(message, action, {
      duration: time
    });
  }

  justMessage(message, durationSecond?: number) {
    this.snackBar.open(message, 'باشه', {
      duration: durationSecond === undefined ? 3000 : (durationSecond * 1000),
      direction: this.localeService.rtl().getValue() ? 'rtl' : 'ltr'
    });
  }
}

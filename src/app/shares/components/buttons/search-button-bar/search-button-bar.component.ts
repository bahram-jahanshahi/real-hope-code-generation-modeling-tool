import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {SnackBarService} from '../../../../core/services/snack-bar.service';
import {ResponsiveService} from '../../../../core/services/responsive.service';

@Component({
  selector: 'app-search-button-bar',
  templateUrl: './search-button-bar.component.html',
  styleUrls: ['./search-button-bar.component.css']
})
export class SearchButtonBarComponent implements OnInit {
  realtimeSearch = true;

  @Input() loading: boolean;
  @Output() clickOnSearch = new EventEmitter();
  @Output() realTimeSearchChanged = new EventEmitter();
  @Output() resetSearch = new EventEmitter();
  @Output() downloadExcel = new EventEmitter();

  isMedium = false;

  constructor(private snackBarService: SnackBarService, private responsiveService: ResponsiveService) {
    this.responsiveService.isWebMedium.subscribe(value => this.isMedium = value);
  }

  ngOnInit(): void {
  }

  search() {
    this.clickOnSearch.emit();
  }

  realTimeSearchToggle($event: MatSlideToggleChange) {
    this.realtimeSearch = $event.checked;
    this.realTimeSearchChanged.emit(this.realtimeSearch);
    if ($event.checked) {
      this.snackBarService.justMessage('جستجو خودکار شد');
    } else {
      this.snackBarService.justMessage('جستجو پس از کلیک روی دکمه «بیاب» صورت خواهد گرفت');
    }
  }

  reset(): void {
    this.resetSearch.emit();
  }

  excel() {
    this.downloadExcel.emit();
  }
}

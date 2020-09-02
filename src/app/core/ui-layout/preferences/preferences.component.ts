import {Component, OnInit} from '@angular/core';
import {LocaleService} from '../../services/locale.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {PreferencesService} from '../../services/preferences.service';

@Component({
    selector: 'app-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

    fa: boolean;
    dark: boolean;

    constructor(private localeService: LocaleService, private preferencesService: PreferencesService) {
        localeService.getLocale().subscribe(locale => this.fa = locale === 'fa');
        this.preferencesService.darkTheme.subscribe(dark => this.dark = dark);
    }

    ngOnInit(): void {
    }

    faChanged($event: MatSlideToggleChange) {
        if ($event.checked) {
            this.localeService.fa();
        }else{
            this.localeService.en();
        }
    }

    enChanged($event: MatSlideToggleChange) {
        if ($event.checked) {
            this.localeService.en();
        }else{
            this.localeService.fa();
        }
    }

    darkThemeChanged($event: MatSlideToggleChange) {
        if ($event.checked) {
            this.preferencesService.dark();
        } else {
            this.preferencesService.light();
        }
    }
}

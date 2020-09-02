import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from './material-persian-date-adapter';
import {LocaleService} from '../../../core/services/locale.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MaterialMultiPurposeDateAdapter} from './material-multi-purpose-date-adapter';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        /*{provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},*/
        {
            provide: DateAdapter, useFactory: chooseProvider, deps: [MAT_DATE_LOCALE, LocaleService]
        },
        /*{provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS}*/
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    ]
})
export class MaterialPersianDateModule {

    constructor() {
    }
}

export function chooseProvider(locale, localeService: LocaleService) {
    console.log('Choose Provider : ' + localeService.getLocale().getValue());
    if (localeService.getLocale().getValue() === 'fa') {
        // return new MaterialPersianDateAdapter();
        return new MaterialMultiPurposeDateAdapter(localeService);
    } else {
        // return new MaterialPersianDateAdapter();
        return new MomentDateAdapter('en-US');
    }
}

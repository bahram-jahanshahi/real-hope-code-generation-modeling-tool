import {DateAdapter} from '@angular/material/core';
import {MaterialPersianDateAdapter} from './material-persian-date-adapter';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import * as jalaliMoment from 'jalali-moment';
import {LocaleService} from '../../../core/services/locale.service';

export class MaterialMultiPurposeDateAdapter extends DateAdapter<Moment> {
    persian = new MaterialPersianDateAdapter();
    english = new MomentDateAdapter('en-US');
    locale = 'en';

    constructor(private localeService: LocaleService) {
        super();
    }

    fa(): boolean {
        return this.locale === 'fa';
    }

    en(): boolean {
        return this.locale === 'en';
    }

    setLocale(locale: any): void {
        super.setLocale(locale);
    }

    addCalendarDays(date: Moment, days: number): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.addCalendarDays(date, days);
        }
        // @ts-ignore
        return this.english.addCalendarDays(date, days);
    }

    addCalendarMonths(date: Moment, months: number): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.addCalendarMonths(date, months);
        }
        // @ts-ignore
        return this.english.addCalendarMonths(date, months);
    }

    addCalendarYears(date: Moment, years: number): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.addCalendarYears(date, years);
        }
        // @ts-ignore
        return this.english.addCalendarYears(date, years);
    }

    clone(date: Moment): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.clone(date);
        }
        // @ts-ignore
        return this.english.clone(date as Moment);
    }

    createDate(year: number, month: number, date: number): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.createDate(year, month, date);
        }
        // @ts-ignore
        return this.english.createDate(year, month, date);
    }

    format(date: Moment, displayFormat: string): string {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.format(date, displayFormat);
        }
        // @ts-ignore
        return this.english.format(date, displayFormat);
    }

    getDate(date: Moment): number {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getDate(date);
        }
        // @ts-ignore
        return this.english.getDate(date);
    }

    getDateNames(): string[] {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getDateNames();
        }
        // @ts-ignore
        return this.english.getDateNames();
    }

    getDayOfWeek(date: Moment): number {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getDayOfWeek(date);
        }
        // @ts-ignore
        return this.english.getDayOfWeek(date);
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getDayOfWeekNames(style);
        }
        // @ts-ignore
        return this.english.getDayOfWeekNames(style);
    }

    getFirstDayOfWeek(): number {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getFirstDayOfWeek();
        }
        // @ts-ignore
        return this.english.getFirstDayOfWeek();
    }

    getMonth(date: Moment): number {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getMonth(date);
        }
        // @ts-ignore
        return this.english.getMonth(date);
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getMonthNames(style);
        }
        // @ts-ignore
        return this.english.getMonthNames(style);
    }

    getNumDaysInMonth(date: Moment): number {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getNumDaysInMonth(date);
        }
        // @ts-ignore
        return this.english.getNumDaysInMonth(date);
    }

    getYear(date: Moment): number {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getYear(date);
        }
        // @ts-ignore
        return this.english.getYear(date);
    }

    getYearName(date: Moment): string {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.getYearName(date);
        }
        // @ts-ignore
        return this.english.getYearName(date);
    }

    invalid(): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.invalid();
        }
        // @ts-ignore
        return this.english.invalid();
    }

    isDateInstance(obj: any): boolean {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.isDateInstance(obj);
        }
        // @ts-ignore
        return this.english.isDateInstance(obj);
    }

    isValid(date: any): boolean {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.isValid(date);
        }
        // @ts-ignore
        return this.english.isValid(date);
    }

    parse(value: any, parseFormat: string): Moment | null {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.parse(value, parseFormat);
        }
        // @ts-ignore
        return this.english.parse(value, parseFormat);
    }

    toIso8601(date: Moment): string {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.toIso8601(date);
        }
        // @ts-ignore
        return this.english.toIso8601(date);
    }

    today(): Moment {
        if (this.fa()) {
            // @ts-ignore
            return this.persian.today();
        }
        // @ts-ignore
        return this.english.today();
    }
}

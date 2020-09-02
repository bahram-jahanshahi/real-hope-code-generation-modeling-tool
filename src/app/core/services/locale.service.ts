import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LocaleService {

    private isRtl = new BehaviorSubject<boolean>(true);
    private locale = new BehaviorSubject<string>('fa');
    public loc = 'fa';

    constructor(private translate: TranslateService) {
    }

    fa() {
        this.translate.setDefaultLang('fa');
        this.locale.next('fa');
        this.isRtl.next(true);
    }

    en() {
        this.translate.setDefaultLang('en');
        this.locale.next('en');
        this.isRtl.next(false);
    }

    rtl(): BehaviorSubject<boolean> {
        return this.isRtl;
    }

    getLocale(): BehaviorSubject<string> {
        return this.locale;
    }
}

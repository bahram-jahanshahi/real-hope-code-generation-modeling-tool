import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    darkTheme = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    dark() {
        this.darkTheme.next(true);
    }

    light() {
        this.darkTheme.next(false);
    }
}

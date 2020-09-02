import {Injectable} from '@angular/core';
import {Moment} from 'jalali-moment';
import {JavaDate} from '../../core/domain/java-date';
import * as moment from 'jalali-moment';

@Injectable({
  providedIn: 'root'
})
export class UtilityDateService {

  constructor() {
  }

  getMomentOfJavaDate(javaDate: JavaDate): moment.Moment {
    if (javaDate === null) {
      return null;
    }
    return moment([
      javaDate.year,
      javaDate.month,
      javaDate.day
    ]);
  }

  getJavaDateOfMoment(jMoment: moment.Moment): JavaDate {
    if (jMoment === null) {
      return null;
    }
    const date = new Date(jMoment.toISOString());
    return new JavaDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment-timezone';

const moment = moment_;

@Pipe({ name: 'momentDateTime' })
export class MomentDateTimeFormatPipe implements PipeTransform {
  transform(value: string, format: {
    date: string,
    timeZone: string,
    timeFormat: string
  }): string {
    return moment(value).tz(format.timeZone).
      format(`${format.date} ${format.timeFormat !== null ? 'hh:mm:ss A' : 'HH:mm:ss'}`);
  }
}

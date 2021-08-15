import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment_ from 'moment';

const moment = moment_;

export class CustomeValidators {

  static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
    return (formGroup: AbstractControl): any | null => {
      const fromDate = formGroup.get(fromDateField)?.value;
      const toDate = formGroup.get(toDateField)?.value;
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if ((fromDate !== null && toDate !== null) && moment(fromDate).isAfter(moment(toDate))) {
        return { [errorName]: true };
      }
      return null;
    };
  }

  static fromToTime(
    fromTimeField: string,
    toTimeField: string,
    fromDateField: string,
    toDateField: string,
    errorName: string = 'fromToTime'): ValidatorFn {
    return (formGroup: AbstractControl): any | null => {
      const fromTime = formGroup.get(fromTimeField)?.value;
      const toTime = formGroup.get(toTimeField)?.value;
      const fromDate = formGroup.get(fromDateField)?.value;
      const toDate = formGroup.get(toDateField)?.value;
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if (moment(fromDate).isSame(moment(toDate))) {
        if ((fromTime !== null && toTime !== null) &&
          Date.parse(`01/01/2011 ${toTime}`) < Date.parse(`01/01/2011 ${fromTime}`)) {
            return { [errorName]: true };
        }
      }
      return null;
    };
  }

}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    // @ts-ignore
    return control.parent.invalid;
  }
}

import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig, FormConfig, Validatorconfig } from '../models/field-config.model';
import { CustomeValidators } from '../validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  // tslint:disable-next-line: typedef
  toFormGroup(formConfig: FormConfig) {
    const group: any = {};
    formConfig.fields.forEach(field => {
      group[field.name] = new FormControl(field.initialValue || null);
    });
    // @ts-ignore
    return new FormGroup(group, this.getValidators(formConfig.validators));
  }

  // tslint:disable-next-line: typedef
  getValidators(formValidators: Validatorconfig[]) {
    const validators: any[] = [];
    if (formValidators && formValidators.length > 0) {
      formValidators.forEach((va) => {
        // @ts-ignore
        validators.push(CustomeValidators[va.validator_name](...va.validator_fields));
      });
    }
    return validators;
  }
}

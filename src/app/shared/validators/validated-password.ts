import {AbstractControl, ValidationErrors ,ValidatorFn} from '@angular/forms';

export function validatePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const parent = control.parent?.value.password

    if (value == parent) {
      return null
    }
    return {passwordError: true}
  }
}

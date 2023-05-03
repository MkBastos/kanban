import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateLessThanToday(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const currentDate = new Date();
    let day = currentDate.getDay();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let input = value.split('/');
    let inputedDay = input[0];
    let inputedMonth = input[1];
    let inputedYear = input[2];

    if (inputedDay < day && inputedMonth <= month && inputedYear <= year) {
      return { invalidDate: true };
    } else if (
      inputedDay <= day &&
      inputedMonth < month &&
      inputedYear <= year
    ) {
      return { invalidDate: true };
    } else if (
      inputedDay <= day &&
      inputedMonth <= month &&
      inputedYear < year
    ) {
      return { invalidDate: true };
    } else if (inputedYear < year) {
      return {invalidDate: true}
    }

    return null;
  };
}

import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('userAccount.password')?.value;
  const confirmPassword = control.get('userAccount.confirmPassword')?.value;
  if (password && confirmPassword && password !== confirmPassword) {
    return {passwordsDoNotMatch: true};
  } else {
    return null;
  }
};

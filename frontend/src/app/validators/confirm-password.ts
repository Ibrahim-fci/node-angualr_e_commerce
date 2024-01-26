import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['confirmPassword']) {
      // Don't run validation if there is already an error on the matching control
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPassword: true });
      return { confirmPassword: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const value: string = control.value;

  const hasNonAlphanumeric = /[^\w\s]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasUppercase = /[A-Z]/.test(value);

  if (hasNonAlphanumeric && hasDigit && hasUppercase) {
    return null;
  } else {
    return {
      passwordRequirements: true,
      PasswordRequiresNonAlphanumeric: !hasNonAlphanumeric,
      PasswordRequiresDigit: !hasDigit,
      PasswordRequiresUpper: !hasUppercase,
    };
  }
}

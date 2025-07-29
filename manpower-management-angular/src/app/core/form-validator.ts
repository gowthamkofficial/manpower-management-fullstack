import { AbstractControl, FormControl } from '@angular/forms';

export function getErrorType(
  control: FormControl,
  label: String,
  type?: 'select' | 'provide',
  number?: any
) {
  if ((control.touched || control.dirty) && control.invalid) {
    switch (true) {
      case control.hasError('required'):
        return `Kindly ${type} the ${label}`;
      case control.hasError('email'):
      case control.hasError('pattern'):
        return `Kindly ${type} a valid ${label}`;
      case control.hasError('minlength'):
        return `${label.toLocaleUpperCase()} should have at least ${number} characters.`;
      case control.hasError('maxlength'):
        return `${label.toLocaleUpperCase()} should not exceed ${number} characters.`;
    }
  }

  return '';
}

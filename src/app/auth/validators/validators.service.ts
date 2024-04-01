import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidatorsService implements AsyncValidator {

  public emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const valid = this.emailPattern.test(email);

    if (valid) {
      return of(null);
    } else {
      return of({ invalidEmail: true });
    }
  };


  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  };


  public isConfirmedPassword(password1: string, password2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordValue1 = formGroup.get(password1)?.value;
      const passwordValue2 = formGroup.get(password2)?.value;

      if (passwordValue1 !== passwordValue2) {
        formGroup.get(password2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(password2)?.setErrors(null);
      return null;
    };
  };

}

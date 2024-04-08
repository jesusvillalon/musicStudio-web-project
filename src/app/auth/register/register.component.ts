import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserData } from 'src/environments/interfaces/userData.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public userData: UserData = {
    name: '',
    lastname: '',
    type: 0,
    dni: '',
    address: '',
    city: '',
    province: '',
    zip_code: '',
    phone_number: '',
    email: ''
  };
  public currentUserId?: number;

  public userForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validator: [
        this.validatorsService.isConfirmedPassword(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  redirectToRegister() {
    this.router.navigate(['/login']);
  }

  get isEmailValid(): boolean {
    return this.userForm.get('email')?.valid as boolean;
  }

  isValidField(field: string){
    return this.validatorsService.isValidField(this.userForm, field);
  }

  getFieldMessageError(field: string): string | null {
    if (!this.userForm.controls[field]) return null;

    const errors = this.userForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'emailTaken':
          return 'El email ya existe.';
      }
    }
    return null;
  }

  get currentUser(): UserData {
    const user: UserData = { ...this.userForm.value, id: this.currentUserId };
    return user;
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();
    this.userData = this.userForm.value;

    this.authService.registerUser(this.userData).subscribe(
      (user) => {
      this.router.navigate(['/login']);
      },
      (error) => {
        console.error('error al registrar usuario:', error)
      }
    );
    this.userForm.reset();
  }
}

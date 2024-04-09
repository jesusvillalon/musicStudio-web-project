import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ValidatorsService } from 'src/app/auth/validators/validators.service';
import { UserData } from 'src/environments/interfaces/userData.interface';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public user?: UserData;
  public openEdit: boolean = false;
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
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getUserData().subscribe(
      (response: UserData) => {
        this.user = response;
        this.userForm.patchValue({
          name: response.name,
          lastname: response.lastname,
          dni: response.dni,
          phone_number: response.phone_number,
          address: response.address,
          city: response.city,
          province: response.province,
          zip_code: response.zip_code,
          email: response.email,
          password: '',
          confirmPassword: '',
        });
      },
      (error) => {
        console.log('Este es el error', error);
      }
    );
  }

  openEditButton() {
    this.openEdit = !this.openEdit;
  }

  get isEmailValid(): boolean {
    return this.userForm.get('email')?.valid as boolean;
  }

  isValidField(field: string) {
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

  saveUserData() {
    if (this.userForm.valid || this.isPasswordFieldEmpty()) {
      let editedUserData = this.userForm.value;
      if(this.isPasswordFieldEmpty()){
        delete editedUserData.password;
        delete editedUserData.confirmPassword;
      }
      this.authService.editUserData(editedUserData).subscribe(
        (response) => {
          console.log('Datos editados:', response);
          this.getUserProfile();
          this.openEditButton();
        },
        (error) => {
          console.error('Error al editar datos:', error);
        }
      );
    }
  }

  private isPasswordFieldEmpty(): boolean{
    const password = this.userForm.get('password')?.value;
    const confirmPassword = this.userForm.get('confirmPassword')?.value;
    return !password.trim() && !confirmPassword.trim();
  }

}

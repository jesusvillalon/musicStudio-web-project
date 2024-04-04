import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ValidatorsService } from '../validators/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService){
    this.login();
  }

  redirectToRegister() {
    this.router.navigate(['/register'])
  }

  login(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  get isEmailValid(): boolean {
    return this.loginForm.get('email')?.valid as boolean;
  }

  isValidField(field: string){
    return this.validatorsService.isValidField(this.loginForm, field);
  }

  onSubmit(){
    if(this.loginForm.valid){
      const userData = this.loginForm.value;
      this.authService.loginUser(userData).subscribe(
        (response: {user: any}) => {
          this.authService.setUserId(response.user.user_id);
          this.router.navigate([`/userProfile`]);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

}

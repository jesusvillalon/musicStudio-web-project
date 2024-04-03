import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  redirectToRegister() {
    this.router.navigate(['/register'])
  }

  onSubmit(){
    if(this.loginForm.valid){
      const userData = this.loginForm.value;
      this.authService.loginUser(userData).subscribe(
        (response: {token: string}) => {
          this.authService.setAuthToken(response.token)
          this.router.navigate(['/userProfile'])
        },
        (error) => {
          console.error('Login failed', error);
        }
      )
    }
  }
}

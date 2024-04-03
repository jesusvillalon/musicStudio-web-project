import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from '../../../../environments/interfaces/userData.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  public isUserLoggedIn: boolean = false;
  public isUserAuthenticated: boolean = false;
  public userData: UserData | undefined;
  public isDropdownOpen: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService
    ){}

    ngOnInit(): void {
      this.getUserLogged();

    }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }

  logOut(){
    this.authService.removeAuthToken();
    this.isUserAuthenticated = false;
    this.userData = undefined;
    this.router.navigate(['/'])
  }

  getUserLogged(){
    this.isUserAuthenticated = this.authService.isAuthenticated();
      if(this.isUserAuthenticated){
        this.authService.getUserData().subscribe(
          (userData: UserData) => {
            this.userData = userData;
          },
          (error) => {
            console.error('Error al obtener los datos del usuario:', error);
          }
        );
      }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}

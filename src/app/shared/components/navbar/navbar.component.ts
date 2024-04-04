import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from '../../../../environments/interfaces/userData.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef;

  public isUserLoggedIn: boolean = false;
  public isUserAuthenticated: boolean = false;
  public user?: UserData;
  public isDropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getUserLogged();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target) && !this.dropdown.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  logOut() {
    this.authService.removeAuthToken();
    this.authService.removeUserIdFromStorage();
    this.isUserAuthenticated = false;
    this.user = undefined;
    this.router.navigate(['/']);
  }

  getUserLogged() {
    this.isUserAuthenticated = this.authService.isAuthenticated();
    if (this.isUserAuthenticated) {
      this.authService.getUserData().subscribe(
        (response: UserData) => {
          this.user = response;
        },
        (error) => {
          console.log("Este es el error", error);
        }
      );
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

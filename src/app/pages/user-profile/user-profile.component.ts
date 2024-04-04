import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from 'src/environments/interfaces/userData.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public isUserAuthenticated: boolean = false;
  public user?: UserData;

  constructor(private authService: AuthService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getUserData().subscribe(
      (response: UserData) => {
        this.user = response;
      },
      error => {
        console.log("Este es el error", error);
      }
    );
  }

}

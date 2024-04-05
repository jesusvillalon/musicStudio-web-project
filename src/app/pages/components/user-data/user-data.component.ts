import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from 'src/environments/interfaces/userData.interface';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit{
  public isUserAuthenticated: boolean = false;
  public user?: UserData;

  constructor(private authService: AuthService
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

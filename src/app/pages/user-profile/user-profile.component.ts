import { Component } from '@angular/core';
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

  constructor(private authService: AuthService
    ) {}

  ngOnInit(): void {

  }



}

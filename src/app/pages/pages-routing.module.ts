import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'userProfile/:user_id', component: UserProfileComponent},
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

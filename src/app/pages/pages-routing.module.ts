import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDataComponent } from './user-data/user-data.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateWishListComponent } from './create-wish-list/create-wish-list.component';
import { CheckOrderStatusComponent } from './check-order-status/check-order-status.component';



const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'userProfile', component: UserProfileComponent,
  children: [
    { path: '', component: UserDataComponent },
    { path: 'createWishlist', component: CreateWishListComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'checkOrderStatus', component: CheckOrderStatusComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
  ]},
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { UserDataComponent } from './user-data/user-data.component';

import { CreateWishListComponent } from './create-wish-list/create-wish-list.component';
import { CheckOrderStatusComponent } from './check-order-status/check-order-status.component';

@NgModule({
  declarations: [
    HomePageComponent,
    UserProfileComponent,
    WishlistComponent,
    OrdersComponent,
    UserDataComponent,
    CreateWishListComponent,
    CheckOrderStatusComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}

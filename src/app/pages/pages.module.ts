import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { UserDataComponent } from './components/user-data/user-data.component';

import { CreateWishListComponent } from './components/create-wish-list/create-wish-list.component';
import { CheckOrderStatusComponent } from './components/check-order-status/check-order-status.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';

@NgModule({
  declarations: [
    HomePageComponent,
    UserProfileComponent,
    WishlistComponent,
    OrdersComponent,
    UserDataComponent,
    CreateWishListComponent,
    CheckOrderStatusComponent,
    ShoppingCartComponent,
    ProductsComponent,
    OneProductComponent,
    ProductCategoryComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}

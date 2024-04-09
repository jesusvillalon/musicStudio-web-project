import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateWishListComponent } from './components/create-wish-list/create-wish-list.component';
import { CheckOrderStatusComponent } from './components/check-order-status/check-order-status.component';
import { ProductsComponent } from './products/products.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { OneWishlistComponent } from './components/one-wishlist/one-wishlist.component';



const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'userProfile', component: UserProfileComponent,
  children: [
    { path: '', component: UserDataComponent },
    { path: 'createWishlist', component: CreateWishListComponent },
    { path: 'oneWishlist', component: OneWishlistComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'checkOrderStatus', component: CheckOrderStatusComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
  ]},
  {path: 'products', component: ProductsComponent,
   children: [
    {path: ':category', component: ProductCategoryComponent},
    {path: ':category/:product_id', component: OneProductComponent}
   ]
  },
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

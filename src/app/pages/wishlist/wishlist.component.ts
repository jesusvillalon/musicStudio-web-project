import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  public createWishlistButton: boolean = false;

  constructor(){}

  isButtonOpened(){
    this.createWishlistButton = !this.createWishlistButton;
  }

}

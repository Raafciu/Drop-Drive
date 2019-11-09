import {Component} from "@angular/core";
import {CartService} from "../../service/cart/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  constructor(private _cartService: CartService,
              private route: ActivatedRoute) {
  }

  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this._cartService.addToCart(product);
  }
}

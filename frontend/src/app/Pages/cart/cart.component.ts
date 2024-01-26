import { Component } from '@angular/core';
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CartService } from '../../Services/cart.service';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, TextTransformPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  data = this.cartService.cart
  cart: any;
  defaultImageUrl: string = "../../../assets/images/defaultProduct.png"
  totalPrice: number = 0
  deleteItem: any

  constructor(private cartService: CartService) { }

  // get user cart items
  ngOnInit(): void {
    this.cartService.getCart()
    this.data.subscribe(data => {
      this.cart = data.cart
      this.totalPrice = data.totalPrice
    })

  }

  handelUpdateQuantity(event: any, cartItemId: any) {
    this.cartService.updateCartItemQuantity(cartItemId, event.target.value)
    // this.cartService.getCart()
  }

  handelDeleteCartItem() {
    this.cartService.deleteCartItem(this.deleteItem?._id)

    // remove model after deleting
    this.deleteItem = null
  }


  // handel deleted item btn
  handelDeleteCartItemModal(cartItem: any) {
    this.deleteItem = cartItem
  }


  Quantity(event: any) {
    const increasedValue = parseInt(event.target.value) + 1
  }

  handelOrder() {
    this.cartService.order()
  }
}

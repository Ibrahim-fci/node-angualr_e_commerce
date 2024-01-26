import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLogged: boolean = false
  cart_num: number = 0
  data = this.cartService.cart



  constructor(private router: Router, private cartService: CartService) {
    if (localStorage.getItem("user_token")) {
      this.isLogged = true
    }
  }

  ngOnInit() {
    this.cartService.getCart()
    this.data.subscribe(data => {
      this.cart_num = data.cart.length
    })
  }


  logout() {
    localStorage.removeItem("user_token")
    this.router.navigate(['/login']);
  }
}

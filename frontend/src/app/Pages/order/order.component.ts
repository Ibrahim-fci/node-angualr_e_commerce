import { Component } from '@angular/core';
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { CartService } from '../../Services/cart.service';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  orders: any
  data = this.orderService.orders


  constructor(private orderService: CartService) { }



  ngOnInit(): void {
    this.orderService.allOrders()
    this.data.subscribe(data => {
      this.orders = data.orders
      console.log(this.orders)
    })
  }

}

import { Component, Input } from '@angular/core';
import { poducList } from '../..//products-list';
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { UpdateProductFormComponent } from '../../Components/update-product-form/update-product-form.component';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { AddModelComponent } from '../../Components/add-model/add-model.component';
import { DeleateModelComponent } from '../../Components/deleate-model/deleate-model.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavBarComponent, NgIf, RouterLink, DiscountPipe, FooterComponent, UpdateProductFormComponent, DeleateModelComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  isAdmin: any
  product: any = {}
  price: any
  deleteProduct: any
  @Input() id?: any;
  updatProduct: any
  selectedImageUrl: any

  defaultImageUrl: string = "../../../assets/images/defaultProduct.png"


  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {
    this.isAdmin = localStorage.getItem("isAdmin")
  }


  ngOnInit() {
    this.productService.getOne(this.id).subscribe(
      data => {
        this.product = data.product
        this.selectedImageUrl = this.product.images[0]

      },
      error => {
        console.log("error: ", error)
      }
    )

    this.price = this.product.price

  }


  handlePrice(e: any) {
    this.price = this.product.price * e.target.value
  }

  handleUpdateBtn(product: any) {
    this.updatProduct = product;
  }

  handleAddToCart(productId: any) {
    if (localStorage.getItem("user_token") == null) {
      this.router.navigate(['/login']);
    }
    this.cartService.addCartItem(productId, 1)
  }


  handelImageSelection(e: any) {

    let src = e.target.getAttribute("src")
    this.selectedImageUrl = src

  }

  handleDeleteBtn(product: any) {
    this.deleteProduct = product;
  }
}

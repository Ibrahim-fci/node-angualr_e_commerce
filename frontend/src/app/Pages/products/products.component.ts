import { Component } from '@angular/core';
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { poducList } from '../../products-list';
import { RouterLink } from '@angular/router';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { UpdateProductFormComponent } from '../../Components/update-product-form/update-product-form.component';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { DeleateModelComponent } from '../../Components/deleate-model/deleate-model.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavBarComponent, RouterLink, TextTransformPipe, FooterComponent, CarouselComponent, UpdateProductFormComponent, DeleateModelComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  isAdmin: any
  deleteProduct: any

  // products: any = poducList

  products: any
  updatProduct: any
  defaultImageUrl: string = "../../../assets/images/defaultProduct.png"
  data = this.productService.products



  constructor(private productService: ProductService, private cartService: CartService) {
    this.isAdmin = localStorage.getItem("isAdmin")
  }

  ngOnInit() {
    this.productService.getProducts(1)
    this.data.subscribe(data => {
      this.products = data.products
    })
  }


  handleUpdateBtn(product: any) {
    this.updatProduct = product;
  }

  handleAddToCart(productId: any) {

    this.cartService.addCartItem(productId, 1)
  }

  handleDeleteBtn(product: any) {
    this.deleteProduct = product;
  }

}

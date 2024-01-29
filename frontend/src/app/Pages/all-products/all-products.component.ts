import { Component, EventEmitter, Output } from '@angular/core';
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { UpdateProductFormComponent } from '../../Components/update-product-form/update-product-form.component';
import { ProductService } from '../../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';
import { DeleateModelComponent } from '../../Components/deleate-model/deleate-model.component';
import { AddModelComponent } from '../../Components/add-model/add-model.component';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, UpdateProductFormComponent, RouterLink, TextTransformPipe, DeleateModelComponent, AddModelComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  isAdmin: any
  updatProduct: any
  deleteProduct: any
  defaultImageUrl: string = "../../../assets/images/defaultProduct.png"
  pages: any = []
  currentPageNum: number = 1
  products: any
  data = this.productService.products
  categories: any

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {
    this.isAdmin = localStorage.getItem("isAdmin")

  }

  ngOnInit() {
    //get categories
    this.productService.getCategories().subscribe(data => {
      this.categories = data.categories
      console.log(this.categories)
    })


    this.productService.getProducts(this.currentPageNum);
    this.data.subscribe(data => {
      this.products = data.products
      this.pages = []
      for (let i = 1; i < data.pages + 1; i++) { this.pages.push(i) }

    })

  }

  handleUpdateBtn(product: any) {
    this.updatProduct = product;
  }


  handlePagination(pageNum: number) {
    this.currentPageNum = pageNum
    this.productService.getProducts(pageNum)
    this.data.subscribe(data => {
      this.products = data.products
    })


  }

  handleNextPage() {

    if (this.pages.length <= this.currentPageNum) return

    this.currentPageNum++
    this.productService.getProducts(this.currentPageNum)
    this.data.subscribe(data => {
      this.products = data.products
    })



  }
  handlepreviousPage() {
    if (this.currentPageNum <= 1) return

    this.currentPageNum--
    this.productService.getProducts(this.currentPageNum)
    this.data.subscribe(data => {
      this.products = data.products
    })

  }



  handleDeleteBtn(product: any) {
    this.deleteProduct = product;
  }


  handleAddToCart(productId: any) {

    if (localStorage.getItem("user_token") == null) {
      this.router.navigate(['/login']);
    }

    this.cartService.addCartItem(productId, 1)
  }

  onCategoryChange(e: any) {
    console.log(e.target.value)
    this.productService.filterByCategory(e.target.value)
    this.data.subscribe(data => {
      this.products = data.products
      console.log(data)
    })
  }

  onSearchTitle(e: any) {
    console.log(e.target.value)
    this.productService.search(e.target.value)
    this.data.subscribe(data => {
      this.products = data.products
      console.log(data)
    })
  }

}

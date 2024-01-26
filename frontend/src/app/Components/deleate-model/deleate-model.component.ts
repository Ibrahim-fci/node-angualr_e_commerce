import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-deleate-model',
  standalone: true,
  imports: [],
  templateUrl: './deleate-model.component.html',
  styleUrl: './deleate-model.component.css'
})
export class DeleateModelComponent {
  @Input() product: any = {};
  defaultImageUrl: string = "../../../assets/images/defaultProduct.png"

  constructor(private fb: FormBuilder, private productService: ProductService,) { }


  handleDeleteProduct() {
    this.productService.deleteOne(this.product._id).subscribe(data => {
      console.log(data)
    })
    this.productService.getProducts();
  }
}

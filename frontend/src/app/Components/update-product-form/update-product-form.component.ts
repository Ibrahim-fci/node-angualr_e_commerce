import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-update-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-product-form.component.html',
  styleUrl: './update-product-form.component.css'

})
export class UpdateProductFormComponent {

  @Input() product: any = {};
  defaultImageUrl: string = "../../../assets/images/defaultProduct.png"
  updateForm: FormGroup = new FormGroup({});
  files: any = []
  categories: any
  // data = this.productService.products

  constructor(private fb: FormBuilder, private productService: ProductService,) { }



  ngOnInit() {

    this.productService.getCategories().subscribe(data => {
      this.categories = data.categories
    })


    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      dicount: [''],
      stock: [''],
      categoryId: [''],
      images: []
    })
  }


  ngAfterViewInit() {
    console.log("from ngAfterViewInit: update_Component")
    this.updateForm.controls["title"].setValue(this.product.title)
    this.updateForm.controls["description"].setValue(this.product.description)
    this.updateForm.controls["price"].setValue(this.product.price)
    this.updateForm.controls["dicount"].setValue(this.product.dicount)
    this.updateForm.controls["stock"].setValue(this.product.stock)
    this.updateForm.controls["categoryId"].setValue(this.product.category._id)


  }


  handleUpdateProduct(event: any) {
    event.preventDefault()
    const temp = []
    const formData = new FormData();

    if (this.files.length >= 1) {
      // uploade images
      for (let i = 0; i < this.files.length; i++) {
        formData.append(`files`, this.files[i], this.files[i].name);
      }
    }

    formData.append('title', this.updateForm.controls["title"].value);
    formData.append('description', this.updateForm.controls["description"].value);
    formData.append('price', this.updateForm.controls["price"].value);
    formData.append('dicount', this.updateForm.controls["dicount"].value);
    formData.append('stock', this.updateForm.controls["stock"].value);
    formData.append('categoryId', this.updateForm.controls["categoryId"].value);


    this.productService.updateOne(this.product._id, formData).subscribe(
      data => {
        this.productService.getProducts()
      },
      error => {
        console.log(error)
      });

  }



  public onFilesChanged(event: any): void {
    this.files = event.target.files

    // Get the URL of the selected file
    var selectedFile = this.files[0];
    var imageURL = URL.createObjectURL(selectedFile);
    this.product.images = [imageURL]

  }
}

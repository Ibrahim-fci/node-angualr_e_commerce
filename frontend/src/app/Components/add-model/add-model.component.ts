import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-add-model',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-model.component.html',
  styleUrl: './add-model.component.css'
})
export class AddModelComponent {

  defaultImageUrl = "../../../assets/images/defaultProduct.png"
  addForm: FormGroup = new FormGroup({});
  files: any = []
  categories: any
  images: any = []
  product: any = {};

  constructor(private fb: FormBuilder, private productService: ProductService,) { }



  ngOnInit() {

    this.productService.getCategories().subscribe(data => {
      this.categories = data.categories
      console.log(this.categories)
    })


    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      dicount: [''],
      stock: [''],
      categoryId: [''],
      images: []
    })
  }




  handleAddProduct(event: any) {
    event.preventDefault()
    const temp = []
    const formData = new FormData();

    if (this.files.length >= 1) {
      // uploade images
      for (let i = 0; i < this.files.length; i++) {
        formData.append(`files`, this.files[i], this.files[i].name);
      }
    }

    formData.append('title', this.addForm.controls["title"].value);
    formData.append('description', this.addForm.controls["description"].value);
    formData.append('price', this.addForm.controls["price"].value);
    formData.append('dicount', this.addForm.controls["dicount"].value);
    formData.append('stock', this.addForm.controls["stock"].value);
    formData.append('categoryId', this.addForm.controls["categoryId"].value);


    this.productService.addOne(formData).subscribe(
      data => {
        this.productService.getProducts()
      },
      error => {
        console.log(error)
      });

  }



  public onFilesChanged(event: any): void {
    this.files = event.target.files
    console.log(this.files)

    // Get the URL of the selected file
    var selectedFile = this.files[0];
    var imageURL = URL.createObjectURL(selectedFile);
    this.images = [imageURL]

    console.log(this.images)

  }

}

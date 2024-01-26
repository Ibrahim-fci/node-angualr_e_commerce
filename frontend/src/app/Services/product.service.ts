import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private data = new BehaviorSubject<any>(null);
  public products = this.data.asObservable();


  constructor(private http: HttpClient) { }



  // get all products
  getProducts(pageNum: number = 1) {
    const allProducts = this.http.get(`http://localhost:8000/products/?page=${pageNum}`);
    allProducts.subscribe(data => { this.data.next(data) },
      error => { console.log('error: ', error) })
  }

  // update a product by its id
  addOne(body: Object): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    return this.http.post(`http://localhost:8000/products/`, body, { headers });

  }

  // get a product by its id
  getOne(id: any): Observable<any> {
    return this.http.get(`http://localhost:8000/products/${id}`);
  }

  // update a product by its id
  updateOne(id: any, body: Object): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });

    return this.http.put(`http://localhost:8000/products/${id}`, body, { headers });

  }

  // Delete a product by its id
  deleteOne(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });

    return this.http.delete(`http://localhost:8000/products/${id}`, { headers });

  }


  // get a product by its id
  getCategories(): Observable<any> {
    return this.http.get(`http://localhost:8000/categories`);
  }

  filterByCategory(categoryId: any, pageNum: number = 1) {
    const allProducts = this.http.post(`http://localhost:8000/products/filter/`, { category: categoryId });
    allProducts.subscribe(data => {
      this.data.next(data)
    },
      error => { console.log('error: ', error) })
  }

  search(title: string) {
    const allProducts = this.http.post(`http://localhost:8000/products/search/`, { title });
    allProducts.subscribe(data => {
      this.data.next(data)
    },
      error => { console.log('error: ', error) })
  }

}

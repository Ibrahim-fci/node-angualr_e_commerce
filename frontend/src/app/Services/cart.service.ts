import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = new BehaviorSubject<any>(null);
  public cart = this.data.asObservable();

  private order_data = new BehaviorSubject<any>(null);
  public orders = this.order_data.asObservable();


  constructor(private http: HttpClient) { }


  addCartItem(productId: any, quantity: any) {

    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    const cart = this.http.post(`http://localhost:8000/cart/`, { productId, quantity }, { headers });
    cart.subscribe(data => { this.getCart() },
      error => { console.log('error: ', error) })
  }

  getCart() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    const cart = this.http.get('http://localhost:8000/cart/', { headers });
    cart.subscribe(data => { this.data.next(data) },
      error => { console.log('error: ', error) })


  }

  updateCartItemQuantity(id: any, quantity: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    const cart = this.http.put(`http://localhost:8000/cart/${id}/`, { quantity }, { headers });
    cart.subscribe(data => { this.getCart() },
      error => { console.log('error: ', error) })

  }


  deleteCartItem(id: any) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    const cart = this.http.delete(`http://localhost:8000/cart/${id}/`, { headers });
    cart.subscribe(
      data => {
        console.log(data)
        this.getCart()
      },
      error => { console.log('error: ', error) })
  }

  order() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    const cart = this.http.get(`http://localhost:8000/orders/`, { headers });
    cart.subscribe(
      data => {
        console.log(data)
        this.getCart()
      },
      error => { console.log('error: ', error) })
  }

  allOrders() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('user_token')}`,
    });
    const orders = this.http.get(`http://localhost:8000/orders/all/`, { headers });
    orders.subscribe(
      data => {
        this.order_data.next(data)
      },
      error => { console.log('error: ', error) })
  }
}

import { Routes } from '@angular/router';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { ProductsComponent } from './Pages/products/products.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AllProductsComponent } from './Pages/all-products/all-products.component';
import { CartComponent } from './Pages/cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { OrderComponent } from './Pages/order/order.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent, title: "shopping" },
  { path: 'product-details/:id', component: ProductDetailsComponent, title: "details" },
  { path: 'register', component: RegisterComponent, title: "register" },
  { path: 'login', component: LoginComponent, title: "login" },
  { path: 'products', component: AllProductsComponent, title: "products" },
  { path: 'orders', component: OrderComponent, title: "orders" },
  { path: 'cart', component: CartComponent, title: "cart", canActivate: [authGuard], },
  { path: '**', component: NotfoundComponent, title: "NotFound" },
];

import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Recuperar } from './pages/recuperar/recuperar';
import { Catalog } from './pages/catalog/catalog';
import { Cart } from './pages/cart/cart';
import { Direccion } from './pages/direccion/direccion';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
    {path:"home",component:Home},
    {path:"login",component:Login},
    {path:"register",component:Register},
    {path:"recuperar",component:Recuperar},
    {path:"catalog",component:Catalog},
    {path:"cart",component:Cart, canActivate:[AuthGuard]},
    {path:"direccion",component:Direccion, canActivate:[AuthGuard]},
    {path:"", redirectTo:"home", pathMatch:"full"},



];


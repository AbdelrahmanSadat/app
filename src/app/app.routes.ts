import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'menu', loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent) },
    { path: 'cart' , loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)},
    // { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) }
];

import { Injectable } from '@angular/core';
import { Fruit,  fruits } from '../data/fruits';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: (Fruit & {amount: number})[];
  // what is the initial value
  // and what should the type be? at minimum it can be id & amount, or optionally



  constructor() {
    this.cart = fruits.map((f) => ({ ...f, amount: 0 }));
   }

  addToCart(fruitId: number) {
    const fruit = this.cart.find((f) => f.id === fruitId);
    fruit && fruit.amount < fruit.inventorySize && fruit.amount++;
  }

  removeFromCart(fruitId: number) {
    const fruit = this.cart.find((f) => f.id === fruitId);
    fruit && fruit.amount > 0 && fruit.amount--;
  }

  totalPrice(){
    return this.cart.reduce((total, f) => total + f.price * f.amount, 0);
  }

}

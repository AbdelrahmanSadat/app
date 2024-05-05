import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Fruit, fruits } from '../../data/fruits';
import { MatDialog } from '@angular/material/dialog';
import { FruitDialogComponent } from '.././fruitDialog/fruitDialog.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  // providers: [CartService],
})
export class MenuComponent {
  title = 'menu';
  // todo?: initialization can be moved up to cart service
  fruits = fruits.map((f) => ({ ...f, amount: 0 }));

  constructor(public dialog: MatDialog, private cartService: CartService) {}

  incrementFruitAmount(fruitId: number) {
    const fruit = this.fruits.find((f) => f.id === fruitId);
    fruit && fruit.inventorySize > fruit.amount && fruit.amount++;

    this.cartService.addToCart(fruitId);
  }
  decrementFruitAmount(fruitId: number) {
    const fruit = this.fruits.find((f) => f.id === fruitId);
    fruit && fruit.amount > 0 && fruit.amount--;
  }

  openAddFruitDialog(): void {
    const dialogRef = this.dialog.open(FruitDialogComponent, {
      data: { fruits, action: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.fruits.push({ ...result.data, img: 'apple.png' });
    });
  }

  openEditFruitDialog(fruitId: number): void {
    const dialogRef = this.dialog.open(FruitDialogComponent, {
      data: { fruits, fruitId, action: 'edit' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fruits = this.fruits.map((f) => {
        if (f.id === result.data.id) {
          return { ...result.data, img: f.img };
        }
        return f;
      });
    });
  }
}

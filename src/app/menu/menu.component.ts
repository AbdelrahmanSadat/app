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
})
export class MenuComponent {
  title = 'menu';

  constructor(public dialog: MatDialog, public cartService: CartService) {}

  openAddFruitDialog(): void {
    const dialogRef = this.dialog.open(FruitDialogComponent, {
      data: { fruits: this.cartService.cart },
      maxWidth: '500px',
      minWidth: '300px',
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return
      this.cartService.cart.push({ ...result.data, img: 'apple.png', amount: 0 });
    });
  }

  openEditFruitDialog(fruitId: number): void {
    const dialogRef = this.dialog.open(FruitDialogComponent, {
      data: { fruits: this.cartService.cart, fruitId },
      maxWidth: '500px',
      minWidth: '300px',
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return
      const index = this.cartService.cart.findIndex((f) => f.id === result.data.id);
      if (index !== -1)
        this.cartService.cart[index] = result.data;
    });
  }
}

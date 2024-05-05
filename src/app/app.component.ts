import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Fruit, fruits } from '../data/fruits';
import { MatDialog } from '@angular/material/dialog';
import { FruitDialogComponent } from './fruitDialog/fruitDialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
  fruits = fruits.map((f) => ({ ...f, amount: 0 }));

  constructor(public dialog: MatDialog) {}

  incrementFruitAmount(fruitId: number) {
    const fruit = this.fruits.find((f) => f.id === fruitId);
    fruit && fruit.inventorySize > fruit.amount && fruit.amount++;
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

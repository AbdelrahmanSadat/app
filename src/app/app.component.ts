import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { fruits } from '../data/fruits';
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
    fruit && fruit.amount++;
  }
  decrementFruitAmount(fruitId: number) {
    const fruit = this.fruits.find((f) => f.id === fruitId);
    fruit && fruit.amount>0 && fruit.amount--;
  }

  openFruitDialog(): void {
    const dialogRef = this.dialog.open(FruitDialogComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}

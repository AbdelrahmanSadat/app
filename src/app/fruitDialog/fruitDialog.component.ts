import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Fruit, Fruits } from '../../data/fruits';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-fruit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './fruitDialog.component.html',
  styleUrl: './fruitDialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FruitDialogComponent {
  fruitForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    servingSize: new FormControl(''),
    inventorySize: new FormControl(''),
  });

  fruitId?: number;
  fruits: Fruits;
  fruit?: Fruit & { amount?: number };
  // todo?: abstract out the action type to shared types types in fruitDialog
  action: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<FruitDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fruits: Fruits; fruitId?: number; action: 'add' | 'edit' }
  ) {
    this.action = data.action;
    this.fruits = data.fruits;
    data.fruitId ? (this.action = 'edit') : (this.action = 'add');

    if (this.action === 'edit') {
      this.fruitId = data.fruitId;
      this.fruit = this.fruits.find((f) => f.id === data.fruitId);
      if (this.fruit) {
        this.fruitForm.patchValue({
          name: this.fruit.name,
          price: '' + this.fruit.price,
          servingSize: this.fruit.servingSize,
          inventorySize: '' + this.fruit.inventorySize,
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    const f = {
      id: this.fruitId ?? this.fruits.length,
      img: this.fruit?.img ?? 'apple.png',
      name: this.fruitForm.value.name!,
      price: +this.fruitForm.value.price!,
      servingSize: this.fruitForm.value.servingSize!,
      inventorySize: +this.fruitForm.value.inventorySize!,
      amount: this.fruit?.amount ?? 0,
    };

    this.dialogRef.close({ event: this.action, data: f });
  }
}

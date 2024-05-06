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
import { Fruits } from '../../data/fruits';

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

  fruits: Fruits;
  fruitId?: number;
  // todo?: abstract out the action type to shared types types in fruitDialog
  action: 'add' | 'edit';

  // public dialogRef: MatDialogRef<FruitDialogComponent>

  constructor(
    public dialogRef: MatDialogRef<FruitDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fruits: Fruits; fruitId?: number; action: 'add' | 'edit' }
  ) {
    this.fruits = data.fruits;
    this.action = data.action;

    if (this.action === 'edit') {
      this.fruitId = data.fruitId;
      const fruit = this.fruits.find((f) => f.id === data.fruitId);
      if (fruit) {
        this.fruitForm.patchValue({
          name: fruit.name,
          price: '' + fruit.price,
          servingSize: fruit.servingSize,
          inventorySize: '' + fruit.inventorySize,
        });
      }
    }
  }

  close(){
    this.dialogRef.close();
  }

  onSubmit() {
    const fruit = {
      id: this.fruitId ?? this.fruits.length,
      name: this.fruitForm.value.name!,
      price: +this.fruitForm.value.price!,
      servingSize: this.fruitForm.value.servingSize!,
      inventorySize: +this.fruitForm.value.inventorySize!,
    };

    this.dialogRef.close({ event: this.action, data: fruit });
  }
}

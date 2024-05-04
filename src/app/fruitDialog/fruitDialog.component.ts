import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    ReactiveFormsModule
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

  // public dialogRef: MatDialogRef<FruitDialogComponent>

  constructor() {}

  onSubmit(){}
}

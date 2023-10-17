import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}

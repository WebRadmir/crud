import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  public onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  public onCancelClick(): void {
    this.dialogRef.close(false);
  }
}

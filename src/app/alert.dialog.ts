import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export class AlertDialogData {
  public constructor (
    public readonly message: string,
  ) { }
}

@Component({
  templateUrl: './alert.dialog.html',
})
export class AlertDialogComponent {
  public constructor (
    @Inject(MAT_DIALOG_DATA) private readonly data: AlertDialogData,
  ) { }

  public get messageParagraphs() {
    return this.data.message.split('\n\n');
  }
}

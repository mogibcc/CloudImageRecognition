import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AlertDialogComponent, AlertDialogData } from './alert.dialog';
import { RecognizerSettingsDialogComponent } from './recognizer-settings.dialog';

@Injectable()
export class DialogService {
  public constructor(
    private readonly dialog: MatDialog,
  ) { }

  public alert(message: string) {
    return this.dialog.open(AlertDialogComponent, {
      data: new AlertDialogData(message),
    });
  }

  public recognizerSettings() {
    return this.dialog.open(RecognizerSettingsDialogComponent, {
      width: '600px',
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { RecognizerSettings } from './recognizer-settings';

@Component({
  templateUrl: './recognizer-settings.dialog.html',
})
export class RecognizerSettingsDialogComponent implements OnInit {
  public settings: RecognizerSettings; // Init.

  public ngOnInit() {
    this.settings = new RecognizerSettings();
  }
}

import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
  MatInputModule, MatProgressSpinnerModule, MatSelectModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
  ],
})
export class MaterialModule { }

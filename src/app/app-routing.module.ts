import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecognizerComponent } from './recognizer.component';

const routes: Routes = [
  { path: 'recognizer', component: RecognizerComponent },
  { path: '', redirectTo: '/recognizer', pathMatch: 'full' },
  { path: '**', component: RecognizerComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

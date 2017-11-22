import 'hammerjs';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AlertDialogComponent } from './alert.dialog';
import { AppComponent } from './app.component';
import { EndpointAwsComponent } from './endpoint-aws.component';
import { EndpointAzureComponent } from './endpoint-azure.component';
import { EndpointGoogleComponent } from './endpoint-google.component';
import { RecognizerComponent } from './recognizer.component';
import { RecognizerSettingsDialogComponent } from './recognizer-settings.dialog';

import { DialogService } from './dialog.service';
import { EndpointAwsService } from './endpoint-aws.service';
import { EndpointAzureService } from './endpoint-azure.service';
import { EndpointGoogleService } from './endpoint-google.service';

@NgModule({
  declarations: [
    AlertDialogComponent,
    AppComponent,
    EndpointAwsComponent,
    EndpointAzureComponent,
    EndpointGoogleComponent,
    RecognizerComponent,
    RecognizerSettingsDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    DialogService,
    EndpointAwsService,
    EndpointAzureService,
    EndpointGoogleService,
  ],
  entryComponents: [
    AlertDialogComponent,
    RecognizerSettingsDialogComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }

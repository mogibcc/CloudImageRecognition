import { HttpClient, } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { DialogService } from './dialog.service';
import { IEndpoint } from './endpoint';
import { EndpointAwsService, IAwsData } from './endpoint-aws.service';
import { EndpointAzureService, IAzureData } from './endpoint-azure.service';
import { EndpointGoogleService, IGoogleData } from './endpoint-google.service';
import { RecognizerSettings } from './recognizer-settings';

type EndpointName = 'azure' | 'aws' | 'google';

@Component({
  templateUrl: './recognizer.component.html',
})
export class RecognizerComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject<void>();

  public readonly providers = [
    { name: 'Azure Computer Vision', key: 'azure' as EndpointName },
    { name: 'Amazon Rekognition', key: 'aws' as EndpointName },
    { name: 'Google Vision', key: 'google' as EndpointName },
  ];

  private settings: RecognizerSettings; // Init.
  public awsResponse: IAwsData | null = null;
  public azureResponse: IAzureData | null = null;
  public googleResponse: IGoogleData | null = null;
  public recognitionActive = false;

  public constructor(
    private readonly http: HttpClient,
    private readonly dialogs: DialogService,
    private readonly endpointAws: EndpointAwsService,
    private readonly endpointAzure: EndpointAzureService,
    private readonly endpointGoogle: EndpointGoogleService,
  ) { }

  public ngOnInit() {
    this.settings = new RecognizerSettings();
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public performRecognition() {
    this.awsResponse = this.azureResponse = this.googleResponse = null;
    switch (this.provider) {
      case 'aws':
      if (
        this.settings.awsAccessKeyId.trim() === '' ||
        this.settings.awsSecretAccessKey.trim() === '' ||
        this.settings.awsRegion.trim() === ''
      ) {
        this.dialogs.alert('Amazon Rekognition is not properly configured. Check the settings.');
        break;
      }
      this.recognitionActive = true;
      this.endpointAws
      .recognize(this.imageUrl, this.settings)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.awsResponse = data as IAwsData;
          this.recognitionActive = false;
        },
        error => {
          this.dialogs.alert(`Recognition through Amazon Rekognition failed:\n\n${JSON.stringify(error, null, 2)}`);
          this.recognitionActive = false;
        },
      );
      break;

      case 'azure':
      if (
        this.settings.azureEndpoint.trim() === '' ||
        this.settings.azureKey.trim() === ''
      ) {
        this.dialogs.alert('Azure Computer Vision is not properly configured. Check the settings.');
        break;
      }
      this.recognitionActive = true;
      this.endpointAzure
      .recognize(this.imageUrl, this.settings)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.azureResponse = data as IAzureData;
          this.recognitionActive = false;
        },
        error => {
          this.dialogs.alert(`Recognition through Azure Computer Vision failed:\n\n${JSON.stringify(error, null, 2)}`);
          this.recognitionActive = false;
        },
      );
      break;

      case 'google':
      if (
        this.settings.googleKey.trim() === ''
      ) {
        this.dialogs.alert('Google Vision is not properly configured. Check the settings.');
        break;
      }
      this.recognitionActive = true;
      this.endpointGoogle
      .recognize(this.imageUrl, this.settings)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          const googleData = data as IGoogleData;
          if (googleData.responses.length !== 0 && googleData.responses[0].error === undefined) {
            this.googleResponse = googleData;
          } else {
            this.dialogs.alert(`Recognition through Google Vision failed:\n\n${JSON.stringify(googleData.responses[0].error, null, 2)}`);
          }
          this.recognitionActive = false;
        },
        error => {
          this.dialogs.alert(`Recognition through Google Vision failed:\n\n${JSON.stringify(error, null, 2)}`);
          this.recognitionActive = false;
        },
      );
      break;

      default:
      this.dialogs.alert('Unknown provider.');
      break;
    }
  }

  public openSettingsDialog() {
    this.dialogs.recognizerSettings();
  }

  public toJsonString(data: any): string {
    return JSON.stringify(data, null, 2);
  }

  public get provider() {
    return localStorage.getItem('provider') || 'azure';
  }

  public set provider(value: string) {
    localStorage.setItem('provider', value);
  }

  public get imageUrl() {
    const imageUrl = localStorage.getItem('imageUrl');
    return imageUrl !== null ? imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg';
  }

  public set imageUrl(value: string) {
    localStorage.setItem('imageUrl', value);
  }
}

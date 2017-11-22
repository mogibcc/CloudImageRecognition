import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IEndpoint } from './endpoint';
import { RecognizerSettings } from './recognizer-settings';

export interface IAzureCategory {
  name: string;
  score: number;
}

export interface IAzureTag {
  name: string;
  confidence: number;
  hint?: string;
}

export interface IAzureAdultContent {
  isAdultContent: boolean;
  isRacyContent: boolean;
  adultScore: number;
  racyScore: number;
}

export interface IAzureCaption {
  text: string;
  confidence: number;
}

export interface IAzureDescription {
  tags: Array<string>;
  captions: Array<IAzureCaption>;
}

export interface IAzureMetadata {
  width: number;
  height: number;
  format: string;
}

export interface IAzureColor {
  dominantColorForeground: string;
  dominantColorBackground: string;
  dominantColors: Array<string>;
  accentColor: string;
  isBWImg: boolean;
}

export interface IAzureData {
  categories: Array<IAzureCategory>;
  adult: IAzureAdultContent;
  tags: Array<IAzureTag>;
  description: IAzureDescription;
  requestId: string;
  metadata: IAzureMetadata;
  color: IAzureColor;
}

@Injectable()
export class EndpointAzureService implements IEndpoint {
  public constructor (
    private readonly http: HttpClient,
  ) { }

  public recognize(url: string, settings: RecognizerSettings): Observable<any> {
    const endpointParams = new URLSearchParams();
    endpointParams.append('visualFeatures', 'Categories,Tags,Description,Color,Adult');
    endpointParams.append('details', '');
    endpointParams.append('language', 'en');
    return this.http
    .post(`${settings.azureEndpoint}/analyze?${endpointParams.toString()}`, {
      // Body.
      url: url,
    }, {
      // Options.
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': settings.azureKey,
      }),
    });
  }
}

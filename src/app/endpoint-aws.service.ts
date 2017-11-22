import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Rekognition, Credentials } from 'aws-sdk';

import { IEndpoint } from './endpoint';
import { RecognizerSettings } from './recognizer-settings';

export interface IAwsLabel {
  Name: string;
  Confidence: number;
}

export interface IAwsLabels {
  Labels: Array<IAwsLabel>;
}

export interface IAwsModerationLabel {
  Name: string;
  Confidence: string;
  ParentName?: string;
}

export interface IAwsModerationLabels {
  ModerationLabels: Array<IAwsModerationLabel>;
}

export type IAwsData = [ IAwsLabels, IAwsModerationLabels ];

@Injectable()
export class EndpointAwsService implements IEndpoint {
  public constructor (
    private readonly http: HttpClient,
  ) { }

  public recognize(url: string, settings: RecognizerSettings): Observable<any> {
    const rekognition = new Rekognition({ apiVersion: '2016-06-27', region: settings.awsRegion });
    rekognition.config.update({ region: settings.awsRegion });
    rekognition.config.credentials = new Credentials(settings.awsAccessKeyId, settings.awsSecretAccessKey);
    return this.http.get(url, {
      responseType: 'blob'
    })
    .switchMap((data: Blob) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(data);
      })
    )
    .switchMap((data: ArrayBuffer) =>
      Observable.forkJoin(
        rekognition.detectLabels({
          Image: { Bytes: data },
        })
        .promise(),
        rekognition.detectModerationLabels({
          Image: { Bytes: data },
        })
        .promise(),
      )
    );
  }
}

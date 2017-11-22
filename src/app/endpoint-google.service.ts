import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IEndpoint } from './endpoint';
import { RecognizerSettings } from './recognizer-settings';

export interface IGoogleColorInfo {
  color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  score: number;
  pixelFraction: number;
}

export enum IGoogleLikelihood {
  'UNKNOWN',
  'VERY_UNLIKELY',
  'UNLIKELY',
  'POSSIBLE',
  'LIKELY',
  'VERY_LIKELY',
}

export interface IGoogleEntityAnnotation {
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly?: {
    vertices: Array<{
      x: number;
      y: number;
    }>;
  };
  properties?: Array<{
    name: string;
    value: string;
    uint64Value: number;
  }>;
}

export interface IGoogleSafeSearchAnnotation {
  adult: IGoogleLikelihood;
  spoof: IGoogleLikelihood;
  medical: IGoogleLikelihood;
  violence: IGoogleLikelihood;
}

export interface IGoogleImageProperties {
  dominantColors: {
    colors: Array<IGoogleColorInfo>;
  };
}

export interface IGoogleAnnotateImageResponse {
  labelAnnotations?: Array<IGoogleEntityAnnotation>;
  textAnnotations?: Array<IGoogleEntityAnnotation>;
  landmarkAnnotations?: Array<IGoogleEntityAnnotation>;
  safeSearchAnnotation?: IGoogleSafeSearchAnnotation;
  imagePropertiesAnnotation?: IGoogleImageProperties;
  error?: {
    code: number;
    message: string;
    details: Array<any>;
  };
}

export interface IGoogleData {
  responses: Array<IGoogleAnnotateImageResponse>;
}

@Injectable()
export class EndpointGoogleService implements IEndpoint {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  public recognize(url: string, settings: RecognizerSettings): Observable<any> {
    return this.http.post(`https://vision.googleapis.com/v1/images:annotate?key=${settings.googleKey}`, {
      requests: [{
        image: {
          source: {
            imageUri: url,
          },
        },
        features: [
          { type: 'LABEL_DETECTION', maxResults: 10 },
          { type: 'TEXT_DETECTION' },
          { type: 'LANDMARK_DETECTION' },
          { type: 'SAFE_SEARCH_DETECTION' },
          { type: 'IMAGE_PROPERTIES' },
        ]
      }],
    });
  }
}

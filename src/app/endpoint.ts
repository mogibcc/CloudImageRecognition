import { RecognizerSettings } from './recognizer-settings';
import { Observable } from 'rxjs/Observable';

export interface IEndpoint {
  recognize(url: string, settings: RecognizerSettings): Observable<any>;
}

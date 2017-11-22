import { Component, Input } from '@angular/core';

import { IGoogleData } from './endpoint-google.service';

@Component({
  selector: 'app-endpoint-google',
  templateUrl: './endpoint-google.component.html',
})
export class EndpointGoogleComponent {
  @Input() public data: IGoogleData | undefined;

  public get response() {
    if (this.data === undefined || this.data.responses.length === 0) {
      return null;
    }
    return this.data.responses[0];
  }

  public get recognizedText() {
    const response = this.response;
    return (
      response !== null && response.textAnnotations !== undefined && response.textAnnotations.length !== 0 ?
      response.textAnnotations[0].description :
      null
    );
  }

  public toProgressValue(n: number) {
    return Math.round(n * 100);
  }

  public toReadableString(s: string) {
    return s !== null ? s.toLowerCase().replace('_', ' ') : null;
  }
}

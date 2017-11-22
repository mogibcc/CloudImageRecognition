import { Component, Input } from '@angular/core';

import { IAzureData } from './endpoint-azure.service';

@Component({
  selector: 'app-endpoint-azure',
  templateUrl: './endpoint-azure.component.html',
})
export class EndpointAzureComponent {
  @Input() public data: IAzureData | undefined;

  public toProgressValue(n: number) {
    return Math.round(n * 100);
  }
}

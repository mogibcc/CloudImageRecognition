import { Component, Input } from '@angular/core';

import { IAwsData } from './endpoint-aws.service';

@Component({
  selector: 'app-endpoint-aws',
  templateUrl: './endpoint-aws.component.html',
})
export class EndpointAwsComponent {
  @Input() public data: IAwsData | undefined;
}

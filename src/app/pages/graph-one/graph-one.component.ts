import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styles: [
  ]
})
export class GraphOneComponent {
  public labels1: string[] = ['January', 'February', 'March'];
  public data1: number[] = [65, 59, 40];

  public labels2: string[] = ['April', 'May', 'June',];
  public data2: number[] = [81, 64, 55];

  public labels3: string[] = ['July', 'August', 'September'];
  public data3: number[] = [77, 96, 48];

  public labels4: string[] = ['October', 'November', 'December'];
  public data4: number[] = [98, 56, 45];

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  public percent_1: number = 50;
  public percent_2: number = 70;


  public changePercent(value: number): void {
    this.percent_1 = value;
  }

  get progress_1(): string {
    return `${this.percent_1}%`;
  }

  get progress_2(): string {
    return `${this.percent_2}%`;
  }

}

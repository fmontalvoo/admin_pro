import { Component } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent {

  public percent: number = 50;

  get progress(): string {
    return `${this.percent}%`;
  }

  public changePercent(value: number): void {
    if (this.percent <= 0 && value < 0) {
      this.percent = 0;
    } else if (this.percent >= 100 && value >= 0) {
      this.percent = 100;
    } else {
      this.percent += value;
    }
  }

}

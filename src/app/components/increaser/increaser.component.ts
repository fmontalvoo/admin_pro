import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent {

  @Input('value') public percent: number = 0;
  @Output('value') private onPercentChange: EventEmitter<number>;

  constructor() {
    this.onPercentChange = new EventEmitter();
  }

  public changePercent(value: number): void {
    if (this.percent <= 0 && value < 0) {
      this.percent = 0;
    } else if (this.percent >= 100 && value >= 0) {
      this.percent = 100;
    } else {
      this.percent += value;
    }
    this.onPercentChange.emit(this.percent);
  }


}

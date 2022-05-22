import { Component, Input, OnInit } from '@angular/core';

import { ChartData } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public labels: string[] = [];
  @Input() public data: Array<number> = [];

  public doughnutChartData!: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#00821C', '#09DB36', '#024D0F'],
          hoverBackgroundColor: ['#00821C', '#09DB36', '#024D0F'],
          hoverBorderColor: ['#000000', '#000000', '#00000003']
        },
      ]
    };
  }

}

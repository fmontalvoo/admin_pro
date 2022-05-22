import { Component } from '@angular/core';

import { ChartData } from 'chart.js';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styles: [
  ]
})
export class GraphOneComponent {

  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#00821C', '#09DB36', '#024D0F'],
        hoverBackgroundColor: ['#00821C', '#09DB36', '#024D0F'],
        hoverBorderColor: ['#000000', '#000000', '#00000003']
      },
    ]
  };

}

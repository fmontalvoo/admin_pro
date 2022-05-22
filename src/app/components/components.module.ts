import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser.component';
import { DoughnutComponent } from './doughnut/doughnut.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  declarations: [
    IncreaserComponent,
    DoughnutComponent,
  ],
  exports: [
    IncreaserComponent,
    DoughnutComponent,
  ],
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { LoadImageModalComponent } from './load-image-modal/load-image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  declarations: [
    IncreaserComponent,
    DoughnutComponent,
    LoadImageModalComponent,
  ],
  exports: [
    IncreaserComponent,
    DoughnutComponent,
    LoadImageModalComponent,
  ],
})
export class ComponentsModule { }

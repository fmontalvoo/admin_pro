import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncreaserComponent } from './increaser/increaser.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    IncreaserComponent,
  ],
  exports: [
    IncreaserComponent,
  ],
})
export class ComponentsModule { }

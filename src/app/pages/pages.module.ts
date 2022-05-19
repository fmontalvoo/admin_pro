import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    PagesComponent,
    ProgressComponent,
    GraphOneComponent,
    DashboardComponent,
  ],
  exports: [
    PagesComponent,
    ProgressComponent,
    GraphOneComponent,
    DashboardComponent,
  ]
})
export class PagesModule { }

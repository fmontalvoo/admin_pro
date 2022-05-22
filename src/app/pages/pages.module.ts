import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
// import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    // PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
    ProgressComponent,
    GraphOneComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
  ],
  exports: [
    // PagesComponent,
    // ProgressComponent,
    // GraphOneComponent,
    // DashboardComponent,
    // AccountSettingsComponent,
  ]
})
export class PagesModule { }

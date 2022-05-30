import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromisesComponent } from './promises/promises.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      {
        path: '',
        data: { title: 'Dashboard' },
        component: DashboardComponent,
      },
      {
        path: 'account-settings',
        data: { title: 'Account settings' },
        component: AccountSettingsComponent,
      },
      {
        path: 'progress',
        data: { title: 'Progress' },
        component: ProgressComponent,
      },
      {
        path: 'graph-one',
        data: { title: 'Graph' },
        component: GraphOneComponent,
      },
      {
        path: 'promises',
        data: { title: 'Promises' },
        component: PromisesComponent,
      },
      {
        path: 'rxjs',
        data: { title: 'Rxjs' },
        component: RxjsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetCommentsComponent } from './sections/widget/comments/comments.component';
import { WidgetEventsComponent } from './sections/widget/events/events.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    WidgetCommentsComponent,
    WidgetEventsComponent
  ]
})

export class DashboardModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './components/screens/dashboard/dashboard.module#DashboardModule' },
  { path: 'pages', loadChildren: './components/screens/pages/pages.module#PagesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
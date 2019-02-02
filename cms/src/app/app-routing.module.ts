import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './components/screens/dashboard/dashboard.module#DashboardModule' },
  { path: 'jobs', loadChildren: './components/screens/jobs/jobs.module#JobsModule' },
  { path: 'cleaners', loadChildren: './components/screens/cleaners/cleaners.module#CleanersModule' },
  { path: 'profile', loadChildren: './components/screens/profile/profile.module#ProfileModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
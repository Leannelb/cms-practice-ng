import { NgModule } from '@angular/core';import { Routes, RouterModule } from '@angular/router';
import { JobsListingComponent } from './jobs/crud/jobs-listing/jobs-listing.component';
import { JobsEditComponent } from './jobs/crud/jobs-edit/jobs-edit.component';

const routes: Routes = [
  { path: '', component: JobsListingComponent },
  { path: 'edit/:ref', component: JobsEditComponent },
  { path: 'new', component: JobsEditComponent },
  { path: 'details', component: JobsEditComponent },



]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
  declarations: [
    JobsListingComponent,
    JobsEditComponent,
  ]
})
export class JobsModule { }

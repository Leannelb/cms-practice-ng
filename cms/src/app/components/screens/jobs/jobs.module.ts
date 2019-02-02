import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobsListingComponent } from './jobs/crud/jobs-listing/jobs-listing.component';
import { JobsEditComponent } from './jobs/crud/jobs-edit/jobs-edit.component';
import { JobsNewComponent } from './jobs/crud/jobs-new/jobs-new.component';

const routes: Routes = [
  { path: '', component: JobsListingComponent },
  { path: 'edit/:ref', component: JobsEditComponent },
  { path: 'new', component: JobsEditComponent },


]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
  declarations: [
    JobsListingComponent,
    JobsEditComponent,
    JobsNewComponent
  ]
})
export class JobsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { CleanersListingComponent } from './cleaners/crud/cleaners-listing/cleaners-listing.component';
import { CleanersEditComponent } from './cleaners/crud/cleaners-edit/cleaners-edit.component';
import { CleanersNewComponent } from './cleaners/crud/cleaners-new/cleaners-new.component';
import { CommonModule } from '@angular/common';
import { CleanersMapComponent } from './cleaners-map/cleaners-map.component';

const routes: Routes = [
  { path: '', component: CleanersListingComponent },
  { path: 'details/:ref', component: CleanersEditComponent },
  { path: 'new', component: CleanersNewComponent },


]

@NgModule({
  imports: [ 
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [ 
    RouterModule
  ],
  declarations: [ 
    CleanersListingComponent,
    CleanersEditComponent,
    CleanersNewComponent,
    CleanersMapComponent
  ]
})
export class CleanersModule { }

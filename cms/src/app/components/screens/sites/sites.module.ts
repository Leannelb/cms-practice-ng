import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonTemplateModule } from '../../shared/common-template/common-template.module';
import { SiteEditComponent } from './site-edit/site-edit.component';
import { SiteNewComponent } from './site-new/site-new.component';
import { SiteListingComponent } from './site-listing/site-listing.component';
import { SitesService } from './sites.service';

const routes: Routes = [
  { path: '', component: SiteListingComponent },//might need to be 404
  { path: 'listing/:ref', component:  SiteListingComponent},
  { path: 'new/:ref', component: SiteNewComponent },
  { path: 'edit/:ref', component: SiteEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonTemplateModule
  ],
  providers: [
    SitesService
  ],
  exports: [],
  declarations: [
    SiteListingComponent, 
    SiteNewComponent, 
    SiteEditComponent
  ]
})
export class SitesModule { }
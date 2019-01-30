import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CommonTemplateModule } from '../../shared/common-template/common-template.module';
import { EscapeHtmlPipe } from '../../shared/pipes/EscapeHtmlPipe';
import { PageListingComponent } from './crud/page-listing/page-listing.component';
import { PageNewComponent } from './crud/page-new/page-new.component';
import { PageEditComponent } from './crud/page-edit/page-edit.component';
import { PagesService } from './pages.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CapitalizeFirstPipe } from '../../shared/pipes/CapitalizrFirstPipe';

const routes: Routes = [
  { path: '',                 component: PageListingComponent },
  { path: 'listing/:siteRef', component:  PageListingComponent},
  { path: 'new/:siteRef',     component: PageNewComponent },
  { path: 'edit/:pageRef',    component: PageEditComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    CommonTemplateModule,
    NgSelectModule
  ],
  declarations: [
    // EscapeHtmlPipe,
    PageListingComponent,
    PageNewComponent,
    PageEditComponent,
    CapitalizeFirstPipe
  ],
  providers:[
    PagesService
  ]
})
export class PagesModule { }

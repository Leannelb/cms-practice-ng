import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../partials/breadcrumb/breadcrumb.component';
import { EscapeHtmlPipe } from '../pipes/EscapeHtmlPipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BreadcrumbComponent,
    EscapeHtmlPipe
  ],
  exports:[
    BreadcrumbComponent
  ]
})
export class CommonTemplateModule { }

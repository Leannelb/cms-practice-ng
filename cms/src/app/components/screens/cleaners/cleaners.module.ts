import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule],
  declarations: [CleanersEditComponent]
})
export class CleanersModule { }

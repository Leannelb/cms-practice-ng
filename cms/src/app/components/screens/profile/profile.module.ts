import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [
  {path: '', component: ProfileComponent }
  
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }

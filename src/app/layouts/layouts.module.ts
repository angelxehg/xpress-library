import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralCardLayoutComponent } from './central-card-layout/central-card-layout.component';

@NgModule({
  declarations: [
    CentralCardLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CentralCardLayoutComponent
  ]
})
export class LayoutsModule { }

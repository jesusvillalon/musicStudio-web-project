import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }

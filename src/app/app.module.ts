import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModulesModule } from './material-modules/material-modules.module';
import { PagesModule } from './Pages/pages.module'; 
import { PipesModule } from './pipes/pipes.module';




@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModulesModule,
    NgxChartsModule,
    PagesModule,
    PipesModule
 
  ],
  providers: [MaterialModulesModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

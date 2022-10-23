import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModulesModule } from '../material-modules/material-modules.module';


import { ListadoComponent } from './listado/listado.component';
import { GraficaComponent } from './grafica/grafica.component';

//importa todos los componentes, solo exporta el componente de cada página

@NgModule({
  declarations: [ 
    ListadoComponent, GraficaComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MaterialModulesModule
  ],
  exports:[
  
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraficaComponent } from './Pages/grafica/grafica.component';
import { ListadoComponent } from './Pages/listado/listado.component';

const routes: Routes = [
  {path: '', component: GraficaComponent, pathMatch:'full'},
  {path: 'list', component: ListadoComponent},
  {path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

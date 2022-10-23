import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { chartValues } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  //variables
  apiData$!: Observable<[]>;
  apiData:[] = [];
  dataFiltrado:number[]= [0,0,0,0,0,0,0,0,0];
  dataChart:any[] = [
    {
      "name": "Subvenciones",
      "series":[]
    }
  ]

  total:number = 0;
  contador:number = 0;
  cargando:boolean= false;
   
  constructor(
    private apiService: DataService,
    private route: ActivatedRoute
  ) {   
    //la segunda vez los datos ya están en el servicio, y ngoninit no se ejecuta, así que los cogemos aquí y ya
    if(this.apiService.apiData.length != 0){

      this.apiData = apiService.apiData;
      this.limpiarData(this.apiData)
      this.adaptarData()
      this.cargando=true
    }
   }

  ngOnInit(): void {
    if(this.apiService.apiData.length == 0 ){
      this.apiData$ =this.apiService.getData();
      this.apiData$.subscribe( datos => {
        this.apiData = datos
        this.limpiarData(this.apiData)
        this.adaptarData()
        this.cargando=true 
      });
    }
   
  }


  limpiarData(data:[]){
    //coger los datos, de cada año sumar su presupuesto y meterlo a un array
    data.forEach(dato => { 
      switch(dato[0]){
        case '2010':
          this.dataFiltrado[0] +=  parseInt(dato[5]) 
        break
        case '2011':
          this.dataFiltrado[1] +=  parseInt(dato[5]) 
        break
        case '2012':
          this.dataFiltrado[2] +=  parseInt(dato[5]) 
        break
        case '2013':
          this.dataFiltrado[3] +=  parseInt(dato[5]) 
        break
        case '2014':
          this.dataFiltrado[4] +=  parseInt(dato[5]) 
        break
        case '2015':
          this.dataFiltrado[5] +=  parseInt(dato[5]) 
        break
        case '2016':
          this.dataFiltrado[6] +=  parseInt(dato[5]) 
        break
        case '2017':
          this.dataFiltrado[7] +=  parseInt(dato[5]) 
        break
        case '2018':
          this.dataFiltrado[8] +=  parseInt(dato[5]) 
        break
      }
    })
    
  }
 
  adaptarData(){
    for(let i=0; i<this.dataFiltrado.length;i++){
      let valor = {
        "name": "201"+i,
        "value": this.dataFiltrado[i]
      }
      this.dataChart[0].series.push(valor)
    }
  }


  
 

  //graph configuración
  public view: [number,number] = [600, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel= "Año";
  public showYAxisLabel = true;
  public yAxisLabel= "Presupuesto";
  public graphDataChart: any[]=[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],

  };

  xAxisFormat(val:number){
   return val+ ' €'
  } 
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subject } from 'rxjs';
import { chartValues } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { LineChartComponent } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  //variables
  apiData$!: Observable<[]>;
  apiData:[] = [];
  apiData2019$!:Observable<[]>;
  apiData2019:[]=[];

  dataFinal:any;
  //cifras globales
  dataFiltrado:number[]= [0,0,0,0,0,0,0,0,0,0,0,0];
  //copia a la que volver cuando se desmarca un filtro
  dataChartGlobal:any[]=[
    {
      "name": "Subvenciones",
      "series":[]
    }
  ]
  //se modifica cuando filtra
  dataChart:any[] = [
    {
      "name": "Subvenciones",
      "series":[]
    }
  ];
  dataChartFiltrado:any = [
    {
      "name":"Subvenciones",
      "series":[]
    }
  ];
  @ViewChild('chart') chart: LineChartComponent |any;
  // update$:Subject<any> = new Subject();
  cargando:boolean= false;

  //filtros
  colegios:any[]=[];
  colegioSeleccionado:number = -1;
  Localidad:string[]=[];
  localidadSeleccionada:number = -1;
   
  //search
  buscarMunicipio:string='';
  buscarCentro:string='';
  constructor(
    private apiService: DataService,
  ) {   
    //la segunda vez los datos ya están en el servicio, y ngoninit no se ejecuta, así que los cogemos aquí y ya
    if(this.apiService.apiData.length != 0){
      this.apiData = apiService.apiData;
      this.dataFinal = [...this.apiData];
      //mete totales a filtrado
      this.limpiarData(this.apiData);
    }
    if(this.apiService.apiData2019.length != 0){
      this.apiData2019 = apiService.apiData2019;
      this.apiData2019.forEach (data => {
        let copia:[] = [...data]
        copia.splice(2,1)
        this.dataFinal.push(copia)
      })
      this.limpiarData(this.apiData2019);
      this.adaptarData();
      this.CargarMunicipios(this.dataFinal);
      this.CargarColegios(this.dataFinal);
      this.cargando = true;

    }
   }

  ngOnInit(): void {
    if(this.apiService.apiData.length == 0 ){
      this.apiData$ =this.apiService.getData();
      this.apiData$.subscribe( datos => {
        this.apiData = datos
        this.dataFinal = [...this.apiData]
        this.limpiarData(this.apiData)
      });
    }
    
    if(this.apiService.apiData2019.length == 0){
      this.apiData2019$ = this.apiService.getData2019();
      this.apiData2019$.subscribe( datos2019 => {
        this.apiData2019 = datos2019;
        this.apiData2019.forEach (data => {
          let copia:[] = [...data]
          copia.splice(2,1)
          this.dataFinal.push(copia)
        })
        this.limpiarData(this.apiData2019);
        this.adaptarData() 
        //cargar municipios y colegios
        this.CargarMunicipios(this.dataFinal);
        this.CargarColegios(this.dataFinal);
        this.cargando=true  
    })
   }
  }//OnInit


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
        case '2019':
          this.dataFiltrado[9] += parseInt(dato[6])
          break
        case '2020':
          this.dataFiltrado[10] += parseInt(dato[6])
          break
        case '2021':
          this.dataFiltrado[11] += parseInt(dato[6])
          break
      }
    })
    
  }
 
  //da formato al gráfico
  adaptarData(){
    for(let i=0; i<this.dataFiltrado.length;i++){
      let valor
      if(i<=9){
        valor = {
          "name": "201"+i,
          "value": this.dataFiltrado[i]
        }
      }else{
        let año = 10 +i
         valor = {
          "name": "20"+ año,
          "value": this.dataFiltrado[i]
        }
      }
      this.dataChartGlobal[0].series.push(valor)
      
      this.dataChart[0].series.push(valor)
    }
  }


  CargarMunicipios(finalData:any){
    let municipios:any[]=[]; 
    let datos:any = [...finalData];
    datos.forEach ((subvencion:any) => {
      let lugar:string = subvencion[4]
      lugar = this.normalizar(lugar);

      if(municipios.indexOf(lugar)<0){
        municipios.push(lugar)
      }
    })
    municipios.sort( (a,b) => {return a.localeCompare(b)})
    this.Localidad = municipios;
  }

  CargarColegios(finaldata:any){
    let colegios:any[]=[];
    let hash = Object.create(null);
    let datos:any[]=[...finaldata];
    //hay que seleccionar por nombre+localidad
    datos.forEach(dato => {
      let nombre = dato[2];
          nombre = this.normalizar(nombre)
      let localidad = dato[3];
          localidad = this.normalizar(localidad)
      let key = nombre + localidad;
      if(!hash[key]){
        hash[key] = [nombre,localidad];
        colegios.push([nombre,localidad])
      }
    });
    colegios.sort( (a,b) => {
      if(a[0] > b[0]){return 1}else{return -1}
    })
    this.colegios = colegios
  }
 
  seleccionar(i:number, type:string, filtro:any){
    let minY = 0
    switch (type){
      case 'municipio':
          this.colegioSeleccionado = -1;
          if(this.localidadSeleccionada==i && this.dataChart!=this.dataChartGlobal){
            this.dataChart = this.dataChartGlobal; //resetea gráfico
            this.dataChart[0].series.forEach((valor:any) => {
              if(minY==0){minY=valor.value}else if(minY>valor.value){minY=valor.value}
            })
            minY = minY * 0.9 
            this.chart.yScaleMin = minY
          }else{
            this.localidadSeleccionada = i; 
            this.filtrarMunicipio(filtro);
          }
        break
      case 'colegio':
        this.localidadSeleccionada = -1;
        if(this.colegioSeleccionado==i && this.dataChart!=this.dataChartGlobal){
          this.dataChart = this.dataChartGlobal;
          this.dataChart[0].series.forEach( (valor:any)=>{
            if(minY==0){minY=valor.value}else if(minY > valor.value){minY=valor.value}
          })
          
          minY = minY * 0.9 
          this.chart.yScaleMin = minY
        }else{
          this.colegioSeleccionado = i;
          this.filtrarColegio(filtro)
        }
        break
    }
  }

  filtrarMunicipio(localidad: string){
    let arrayPorNombre:[][] = [];
    let cantidadAño:number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    let graph:any[]=[]
    let menor:number=0;
    let ymin
    //1: coger todo lo de esa localidad de dataFinal y ponerlo en un array
    this.dataFinal.forEach( (subvencion:any) => {
      let nombre = subvencion[4];
          nombre = this.normalizar(nombre)
          if(nombre == localidad){
            arrayPorNombre.push(subvencion)
          }
    })
    //2: dividir por año y meter cantidades totales
    cantidadAño = this.cantidadAño(arrayPorNombre);
    cantidadAño.forEach (anio => {
      if(menor==0){menor=anio}else if(menor>anio){menor=anio}
    })
    //3: darle formato y meterlo a dataChartFiltrado
    graph = this.formatoGraph(cantidadAño);
    this.dataChartFiltrado = graph
    //4: ponerlo como fuente para el chart
    this.dataChart = this.dataChartFiltrado 
    //ajustar escala de chart
    ymin = menor * 0.7 
    this.chart.yScaleMin = ymin
  }

  filtrarColegio(filtro:any){
    console.log("eee")
    let nombreFiltro = filtro[0];
    let localidadFiltro = filtro[1];
    let arrayPorNombre:[][]=[];
    let cantidadAño:number[];
    let graph:any[]=[];
    let menor:number=0;
    //1:agrupar por nombre y localidad
    this.dataFinal.forEach( (subvencion:any)=>{
      let nombreData = subvencion[2];
      let localidadData = subvencion[3];
          nombreData = this.normalizar(nombreData);
          localidadData = this.normalizar(localidadData);
          // console.log("nombre data: "+nombreData);
          // console.log("nombre filtro: "+nombreFiltro);
      if(nombreData == nombreFiltro && localidadData == localidadFiltro){
        arrayPorNombre.push(subvencion)
      }
    })
    console.log(arrayPorNombre)
    //2:dividir por año y meter cantidades totales
    cantidadAño = this.cantidadAño(arrayPorNombre);
    cantidadAño.forEach( anio =>{
      if(menor==0){menor=anio}else if(menor>anio){menor=anio}
    })
    //3:darle formato y meterlo a dataChartFiltrado
    graph = this.formatoGraph(cantidadAño)
    this.dataChartFiltrado = graph;
    //4:ponerlo como fuente del chart, y ajustar escala del chart
    this.dataChart = this.dataChartFiltrado;
    this.chart.yScaleMin = menor*0.8
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


//-------------------------------------- UTILIDADES ---------------
  normalizar(lugar:string):string{
      let split = lugar.split(",");
      let regex = /-/g
      lugar = split[0];
      lugar = lugar.trim().toLowerCase();
      lugar = this.quitarAcentos(lugar)
      lugar = lugar[0].toUpperCase() + lugar.slice(1);
      lugar = lugar.replace(regex, ' ')//quitar guiones
      if(lugar=='Murc ia'){lugar = 'Murcia'} //caso concreto
      if(lugar == 'Centro social nuestra sra de las lagrimas'){lugar = 'Nuestra Sra de las lagrimas'}//caso concreto
    return lugar
  }

  //quita tildes para buen ordenamiento
  quitarAcentos(cadena:string){
    const acentos:any= {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }

  cantidadAño(subvenciones:[][]):number[]{
    let porAño:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]
    subvenciones.forEach( (subvencion:any)=>{
      let cantidad = parseInt(subvencion[5])
      switch (subvencion[0]){
        case '2010':
          porAño[0] += cantidad
          break
        case '2011':
          porAño[1] += cantidad
          break
        case '2012':
          porAño[2] += cantidad
          break
        case '2013':
          porAño[3] += cantidad
          break
        case '2014':
          porAño[4] += cantidad
          break
        case '2015':
          porAño[5] += cantidad
          break
        case '2016':
          porAño[6] += cantidad
          break
        case '2017':
          porAño[7] += cantidad
          break
        case '2018':
          porAño[8] += cantidad
          break
        case '2019':
          porAño[9] += cantidad
          break
        case '2020':
          porAño[10] += cantidad
          break
        case '2021':
          porAño[11] += cantidad
          break
      }
    })
    porAño.forEach(año => {console.log(typeof(año))})
    return porAño
  }

  formatoGraph(subvenciones:any[]):any[]{
    let graph:any = [
      {
        "name":"Subvenciones",
        "series":[]
      }
    ];
    for(let i =0;i<subvenciones.length;i++){
      let valor
      if(i<=9){
        valor={
          "name": "201"+i,
          "value": subvenciones[i]
        }
      }else{
        let año = 10+ i
        valor={
          "name": "20"+año,
          "value": subvenciones[i]
        }
      }
      graph[0].series.push(valor);
    }
    return graph
  }

 ver(e:any){console.log(this.buscarMunicipio)}
}//fin de clase



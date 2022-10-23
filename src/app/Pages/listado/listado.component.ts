import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  //variables
  apiData:[]=[];
  columnas:string[] =['Año', 'Nombre', 'Importe']
  dataFormateada:Object[] = [];
  tableData:any; 

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  @ViewChild(MatDrawer) drawer!:MatDrawer
  drawerOpened:boolean = false

  selected:any[]=[]

  constructor(
    private apiService:DataService
  ) { 
    this.apiData=apiService.apiData;
    this.tableData = new MatTableDataSource(this.apiData)
  }
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort
  }

  sortChange(e:any){ 
    let fuente = e.active;
    let sentido = e.direction; 
    switch(fuente){
      case 'Año':
        if(sentido == 'asc'){
          this.tableData.filteredData.sort( (a:any,b:any) => {
           return a[0] - b[0]
         })
        }else{
          this.tableData.filteredData.sort( (a:any,b:any) => {
           return b[0] - a[0]
         })
        }
      break
      case 'Nombre':
        if(sentido == 'asc'){
          this.tableData.filteredData.sort( (a:any,b:any) => {
            if(a[2] > b[2]){
              return -1
            }else{
              return 1
            }
         })
        }else{
          this.tableData.filteredData.sort( (a:any,b:any) => {
            if(a[2] > b[2]){
              return 1
            }else{
              return -1
            }
         })
        }
      break
      case 'Importe':
        if(sentido == 'asc'){
          this.tableData.filteredData.sort( (a:any,b:any) => {
           return a[5] - b[5]
         })
        }else{
          this.tableData.filteredData.sort( (a:any,b:any) => {
           return b[5] - a[5]
         })
        }
      break

    }
 
  }
 
  filtrar(e:Event){
    let valor = (e.target as HTMLInputElement).value;
    this.tableData.filter = valor.trim().toLowerCase()
  }

  getRecord(row:any){ 
    this.selected=row
    this.drawerOpened = true;
    this.drawer.open()
    
  }

  closeDrawer(){
    this.drawer.close()
    this.drawerOpened = false
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

import { Subject, Observable } from 'rxjs';

//este servicio recupera los datos y puede tener metodos para filtrarlos si es necesario

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //variables Compartidas
  apiData$:any = new Subject<[]>;
  apiData:[] = []
  url:string = '/api'

  constructor(
   private http: HttpClient
  ) { 
    this.getDataApi().subscribe( (data:any) => {
      this.apiData = data
      this.apiData$.next(this.apiData)
    })
  }

  getDataApi(){
    //llamar a la api
    return this.http.get(this.url)
  }


  getData(){
    return this.apiData$.asObservable()
  }

  
 


}

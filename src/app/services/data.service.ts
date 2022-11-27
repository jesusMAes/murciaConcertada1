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

  apiData2019$:any = new Subject<[]>;
  apiData2019:[]=[];

  url:string = '/api'
  url2019:string = '/2019'

  constructor(
   private http: HttpClient
  ) { 
    this.getDataApi().subscribe( (data:any) => {
      this.apiData = data;
      this.apiData$.next(this.apiData);
    })
    this.getDataApi2019().subscribe( (data:any) => {
      this.apiData2019 = data;
      this.apiData2019$.next(this.apiData2019);
    })
  }

  getDataApi(){
    //llamar a la api
    return this.http.get(this.url);
  }

  getDataApi2019(){
    return this.http.get(this.url2019);
  }


  getData(){
    return this.apiData$.asObservable();
  }

  getData2019(){
    return this.apiData2019$.asObservable();
  }

  
 


}

import { Injectable } from '@angular/core';
import { objectClass } from './objectClass';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {
data:objectClass;
  constructor(private http: HttpClient) { }
  setData(mydata) {
    this.data=mydata
   }
  //for all material numbers
  getData(){
    return this.http.get('http://localhost:9100/api/v1/all');
  }
  //unique material numbers
  uniqueRecords(){
    return this.http.get('http://localhost:9100/api/v1/material-numbers');
  }
  //top records based on inventory value
  getDataForTop(){
    return this.http.get('http://localhost:9100/api/v1/top/50');
  }
  getFiltered(message){
    let params = new HttpParams();
    if(message[0]=="plantCode"){
      params = params.set("plantCode", message[1]);
      return this.http.get('http://localhost:9100/api/v1/top/50?',{params: params});
    }
    else if(message[0]=="materialNo"){
      params = params.set("materialNo", message[1]);
      
      return this.http.get('http://localhost:9100/api/v1/top/50?',{params: params});
    }
  }
}

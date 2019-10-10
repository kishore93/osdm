import { Injectable } from '@angular/core';
import { objectClass } from './objectClass';
import { HttpClient, HttpParams } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';

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
    return this.http.get('http://localhost:9100/api/v1/material-numbers?region=&state=&plantCode=');
  }
  //top records based on inventory value
  getDataForTop(){
    return this.http.get('http://localhost:9100/api/v1/top/50');
  }
  getFiltered(message){
    let params = new HttpParams();
    console.log(message.length)
    for (let i:number=0;i<message.length;i=i+2) {
      params = params.set(message[i], message[i+1]);
    }
    console.log(params)
    return this.http.get('http://localhost:9100/api/v1/top/50?',{params: params});
   
  }
  filterMaterialDropDown(region){
    console.log(region)
    let params = new HttpParams();
    params = params.set("region", region);
    params=params.set("state","");
    params=params.set("plantCode","")
    return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
  }
  onClickHeatMap(){

  }
  filterMaterialDropDownState(region,state){
    let params = new HttpParams();
    params = params.set("region", region);
    params=params.set("state",state.value);
    params=params.set("plantCode","")
    return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
  }
  filterMaterialDropDownPlantCode(region,state,Plantcode){
    let params = new HttpParams();
    params = params.set("region", region);
    params=params.set("state",state);
    params=params.set("plantCode",Plantcode.value)
    return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
  }
}

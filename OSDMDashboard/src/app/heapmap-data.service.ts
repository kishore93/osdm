import { Injectable } from '@angular/core';
import { objectClass } from './objectClass';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from './map';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {
  
  mapping: map={
    region:undefined,
    state: undefined,
    plantCode: undefined,
    materialNo:undefined,
    excessQty30Days:undefined,
    excessQty60Days:undefined,
    excessQty90Days:undefined,
    excessValue30Days:undefined,
    excessValue60Days:undefined,
    excessValue90Days:undefined,
    obsoleteQty:undefined,
    obsoleteValue:undefined
}
data:objectClass;
  constructor(private http: HttpClient) { }
  setData(mydata) {
    this.data=mydata
   }
  //for all material numbers
  getData(){
    return this.http.get('http://localhost:9100/api/v1/all?excessQty30Days=&excessQty60Days=&excessQty90Days=&excessValue30Days=&excessValue60Days=&excessValue90Days=&materialNo=&obsoleteQty=&obsoleteValue=&plantCode=&region=&state=&');
  }
  //unique material numbers
   uniqueRecords(){
    return this.http.get('http://localhost:9100/api/v1/material-numbers?region=&state=&plantCode=');
  }
  //top records based on inventory value
  getDataForTop(){
    return this.http.get('http://localhost:9100/api/v1/top/50?excessQty30Days=&excessQty60Days=&excessQty90Days=&excessValue30Days=&excessValue60Days=&excessValue90Days=&materialNo=&obsoleteQty=&obsoleteValue=&plantCode=&region=&state=&');
  }
  getFiltered(message){
    let params = new HttpParams();
    this.mapping.region=""
    this.mapping.state=""
    this.mapping.plantCode=""
    this.mapping.materialNo=""
    this.mapping.excessQty30Days=false
    this.mapping.excessQty60Days=false
    this.mapping.excessQty90Days=false
    this.mapping.excessValue30Days=false;
    this.mapping.excessValue60Days=false;
    this.mapping.excessValue90Days=false;
    this.mapping.obsoleteQty=false;
    this.mapping.obsoleteValue=false;
    for (let i:number=0;i<message.length;i=i+2) {
      if(message[i]=="region"){
        this.mapping.region=message[i+1]
        continue
      }
      if(message[i]=="state"){
        this.mapping.state=message[i+1]
        continue
      }
      if(message[i]=="plantCode"){
        this.mapping.plantCode=message[i+1]
        continue
      }
      if(message[i]=="materialNo"){
        console.log(message[i+1])
        this.mapping.materialNo=message[i+1]
        continue
      }
      if(message[i]=="excessQty30Days" && message[i+1]!=""){
        this.mapping.excessQty30Days=true
        continue
      }
      if(message[i]=="excessQty60Days" && message[i+1]!=""){
        this.mapping.excessQty60Days=true
        continue
      }
      if(message[i]=="excessQty90Days" && message[i+1]!=""){
        this.mapping.excessQty90Days=true
        continue
      }
      if(message[i]=="excessValue30Days" && message[i+1]!=""){
        this.mapping.excessValue30Days=true
        continue
      }
      if(message[i]=="excessValue60Days" && message[i+1]!=""){
        this.mapping.excessValue60Days=true
        continue
      }
      if(message[i]=="excessValue90Days" && message[i+1]!=""){
        this.mapping.excessValue90Days=true
        continue
      }
      if(message[i]=="obsoleteQty" && message[i+1]!=""){
        this.mapping.obsoleteQty=true
        continue
      }
      if(message[i]=="obsoleteValue" && message[i+1]!=""){
        this.mapping.obsoleteValue=true
        continue
      }
      // params = params.set(message[i], message[i+1]);
    }
    for (let i in this.mapping){
      if(this.mapping[i]==undefined || this.mapping[i]==""){
        this.mapping[i]=""
      }
      params = params.set(i, this.mapping[i]);
    }
   
    return this.http.get('http://localhost:9100/api/v1/top/50?',{params: params});
  }
  filterMaterialDropDown(region){
    if(region=="North" || region=="South" || region=="India"){
      let params = new HttpParams();
      params = params.set("region", region);
      params=params.set("state","");
      params=params.set("plantCode","")
      return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
    }
    else{
      return this.http.get('http://localhost:9100/api/v1/material-numbers?region=&state=&plantCode=');
    }
  }
  onClickHeatMap(){

  }
  filterMaterialDropDownState(region,state){
    
    console.log(region)
    if(region=="ALL" && state.value=="ALL"){
      return this.http.get('http://localhost:9100/api/v1/material-numbers?region=&state=&plantCode=');
    }
    else if(region!="ALL" && state.value=="ALL"){
      let params = new HttpParams();
      params = params.set("region", region);
      params=params.set("state","");
      params=params.set("plantCode","");
      return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
    }

    else{
      let params = new HttpParams();
      params = params.set("region", region);
      params=params.set("state",state.value);
      params=params.set("plantCode","")
      return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
    }
    
  }
  filterMaterialDropDownPlantCode(region,state,Plantcode){
    console.log("plantCode")
    let params = new HttpParams();
    params = params.set("region", region);
    params=params.set("state",state);
    params=params.set("plantCode",Plantcode.value)
    return this.http.get('http://localhost:9100/api/v1/material-numbers?',{params: params});
  }
}

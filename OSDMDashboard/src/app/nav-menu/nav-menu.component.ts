import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HeatmapDataService } from '../heapmap-data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { map } from '../map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public myForm: FormGroup;
  materialNumbers: string[] = [];
  constructor(private cd: ChangeDetectorRef,private router:Router, private fb: FormBuilder,public myData: HeatmapDataService) { }
  showAlertDialog:boolean;
  mydata: Array<any>;
  region = new Set();
  options: string[] = [];
  options1: string[] = [];
  states1= new Set();
  plantCode1= new Set();
  newArray=[]
  
  inventory:boolean;
  excess:boolean;
  obsolete:boolean;
  public divshow:boolean = false;
  excessunitbool:boolean;
  excessvaluebool:boolean;
  isClicked:boolean = false;
  isClicked1:boolean = false;
  isClicked2:boolean = false;
  isClicked3:boolean = false;
  isClicked4:boolean = true;
  isClicked5:boolean = false;

  isClicked6:boolean = false;
  isClicked7:boolean = false;
  isClicked8:boolean = false;


  isClicked9:boolean = false;
  isClicked17:boolean=false;
  isClicked18:boolean=false;
  isClicked14:boolean=false

  public show:boolean = false;
  public show1:boolean = false;
  public show2:boolean = false;
  public show3:boolean = true;
  public show4:boolean = false;
  public show5:boolean = false;

  callfun() {
    this.show2=false
    this.show1=false;
    this.show5 = false;
    this.isClicked2=false;
    this.show = !this.show;
    this.isClicked1=false;
    this.isClicked3 = false;
    
    this.isClicked5 = false;

    this.isClicked6 = false;
    this.isClicked7 = false;
    this.isClicked8 = false;
    this.isClicked9 = false;
    this.isClicked17=false;
    this.isClicked18=false;
    this.isClicked14 =false
    
    }
    callfun5() {
      this.show2=false;
      this.isClicked=false;
      this.isClicked2=false;
      this.show=false;
      this.show1=false;
      }
   callfun1() {
    this.isClicked4=true;
    this.isClicked5=false
    this.isClicked14=false;

    this.show1 = !this.show1;
    this.isClicked3=!this.isClicked3;
    this.isClicked6=false;
    this.show2=false;
    this.isClicked18=false
   }
   //obsolute button click function
   callfun2() {
    this.show2 = !this.show2;
    this.show1=false;
    this.isClicked3=false;
    this.isClicked5=false;
    this.isClicked6=false;
    this.isClicked14=false;
    this.isClicked17=false;
    this.isClicked8=true
   }
   productionOrder(){
    this.show2=false;
    this.show1=false;
    this.show5 = false;
    this.show =false;
     this.isClicked=false;
     this.isClicked1=false;

   }
 
  ngOnInit() {
    this.showAlertDialog=true
    //here use uniqueRecords methods for displaying the data 
    this.myData.uniqueRecords().subscribe(
      data => {
     
        this.materialNumbers=data as string [];
        
        // this.mydata = data as string [];	 // FILL THE ARRAY WITH DATA.
        //   this.dataLoad(this.mydata)
      
      },
      (err: HttpErrorResponse) => {
       
        console.log (err.message);
      }
    )
    this.myData.getData().subscribe(
    data => {
      this.mydata = data as string [];	 // FILL THE ARRAY WITH DATA.
        this.dataLoad(this.mydata)
    
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
  );

    this.myForm = this.fb.group({
      materialNo: [''],
      region:[''],
      state:[''],
      plantCode:['']
    });
  }
  get f() { return this.myForm.controls; }
  dataLoad(array){
    this.region.add("ALL")
    for (let entry of array) {
      this.options.push(entry.materialNo);
      this.region.add(entry.region);
      
  }
  this.options1=this.materialNumbers
  }
  search(value: string) { 
    let filter = value.toLowerCase();
     this.materialNumbers=this.options1.filter(option => option.toLowerCase().startsWith(filter));
     return this.materialNumbers
  }
  onKey(value) { 
    this.materialNumbers = this.search(value);
    }
  
  methodForStates(event: MatAutocompleteSelectedEvent){
    if( this.myForm.controls.materialNo.value){
      this.myForm.controls.materialNo.setValue("");
    }
    
    var states = new Set();
    states.add("ALL")
    for (let entry of this.mydata) {
      if(entry.region==event.option.value || event.option.value=="ALL"){
        states.add(entry.state);
      }  
    }
    this.states1=states
    this.myData.filterMaterialDropDown(event.option.value).subscribe(
      data => {
        this.materialNumbers=[]
        this.materialNumbers=data as string [];
        if(this.myForm.controls.region.value=="North"){
          this.materialNumbers.push("North")
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    )
  }
  plantcodeselected(state){
    if( this.myForm.controls.materialNo.value || this.myForm.controls.plantCode.value){
      this.myForm.controls.materialNo.setValue("");
      this.myForm.controls.plantCode.setValue("");
    }
    var plantCode = new Set();
    for (let entry of this.mydata) {
      if(entry.state==state.value || state.value=="ALL"){
        plantCode.add(entry.plantCode);
      }
    }
    this.plantCode1=plantCode;
    this.myData.filterMaterialDropDownState(this.myForm.controls.region.value,state).subscribe(
      data => {
        this.materialNumbers=data as string [];
        if(state.value=="Haryana"){  
          this.materialNumbers.push("Haryana")
        }
        
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    )
  
  }
  Lastplantcodeselected(plantCode){
    this.myData.filterMaterialDropDownPlantCode(this.myForm.controls.region.value,this.myForm.controls.state.value,
      plantCode).subscribe(
      data => {
        this.materialNumbers=data as string [];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    )
  }
  //onclick of generate heatmap
  servicehit(){
    this.newArray=[]
    if(this.myForm.controls.region.value){
      this.newArray.push("region")
      this.newArray.push(this.myForm.controls.region.value)
    }
    if(this.myForm.controls.state.value){
      this.newArray.push("state")
      this.newArray.push(this.myForm.controls.state.value)
      //this.newArray=["state",this.myForm.controls.state.value]
    } 
    if(this.myForm.controls.plantCode.value){
      this.newArray.push("plantCode")
      this.newArray.push(this.myForm.controls.plantCode.value)
      //this.newArray=["plantCode",this.myForm.controls.plantCode.value]
    }
    if(this.myForm.controls.materialNo.value){
      this.newArray.push("materialNo")
      this.newArray.push(this.myForm.controls.materialNo.value)
      //this.newArray=["materialNo",this.myForm.controls.materialNo.value]
    }
    // if(this.isClicked18){
    //   this.newArray.push("obsolete")
    //   this.newArray.push("true")
    // }
    // if(this.isClicked3 && this.isClicked17){
    //   this.newArray.push("excessQty")
    //   this.newArray.push("true")
    // }
    // if(this.isClicked6 && this.isClicked17){
    //   this.newArray.push("excess value")
    //   this.newArray.push("true")
    // }
    if(this.isClicked4 && this.isClicked17 && this.isClicked3){
      this.newArray.push("excessQty30Days")
      this.newArray.push("true")
    }
    if(this.isClicked5 && this.isClicked17  && this.isClicked3){
      this.newArray.push("excessQty60Days")
      this.newArray.push("true")
    }
    if(this.isClicked14 && this.isClicked17  && this.isClicked3){
      this.newArray.push("excessQty90Days")
      this.newArray.push("true")
    }
    if(this.isClicked4 && this.isClicked17 && this.isClicked6){
      this.newArray.push("excessValue30Days")
      this.newArray.push("true")
    }
    if(this.isClicked5 && this.isClicked17 && this.isClicked6){
      this.newArray.push("excessValue60Days")
      this.newArray.push("true")
    }
    if(this.isClicked14 && this.isClicked17 && this.isClicked6){
      this.newArray.push("excessValue90Days")
      this.newArray.push("true")
    }
    if(this.isClicked8 && this.isClicked18){
      this.newArray.push("obsoleteQty")
      this.newArray.push("true")
    }
    if(this.isClicked9 && this.isClicked18){
      this.newArray.push("obsoleteValue")
      this.newArray.push("true")
    }

   
  }
 
  excessServiceCall(){

  }
  EOinventory(){
    if(this.inventory == true){
      this.inventory=false;
    }
    else{
      this.inventory=true;
    } 
  }
  excessbool(){
    if(this.excess == true){
      this.excess=false;
    }
    else{
      this.excess=true;
    } 
  }
  obsoletebool(){
    if(this.obsolete == true){
      this.obsolete=false;
    }
    else{
      this.obsolete=true;
    } 
  }
  excessunit(){
    if(this.excessunitbool == true){
      this.excessunitbool=false;
    }
    else{
      this.excessunitbool=true;
    } 
  }
  excessvalue(){
    if(this.excessvaluebool == true){
      this.excessvaluebool=false;
    }
    else{
      this.excessvaluebool=true;
    } 
  }
  excessUnitMethod(){
    this.show3=true
    this.isClicked6=false;
  
    this.isClicked5=false;
    this.isClicked14=false;
  }
  excessValueMethod(){
    this.show3=true;
    this.isClicked3=false;
    
    this.isClicked5=false;
    this.isClicked14=false;
  }
 

}

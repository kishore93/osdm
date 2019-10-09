import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HeatmapDataService } from '../heapmap-data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public myForm: FormGroup;
  materialNumbers: string[] = [];
  constructor(private fb: FormBuilder,public myData: HeatmapDataService) { }
  showAlertDialog:boolean;
  mydata: Array<any>;
  region = new Set();
  options: string[] = [];
  options1: string[] = [];
  states1= new Set();
  plantCode1= new Set();
  newArray1:string[];
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
  isClicked4:boolean = false;
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
  public show3:boolean = false;
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
    this.isClicked4 = false;
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
      this.show2=false
      this.show1=false;
      this.isClicked2=false;
      this.isClicked=false;
      this.show5 = !this.show5;
      this.show =false;
      this.isClicked3 = true;
      this.isClicked4 = false;
      this.isClicked5 = false;
      this.isClicked6 = false;
      this.isClicked7 = false;
      this.isClicked8 = true;
      this.isClicked9 = false;
      this.isClicked17=false;
      this.isClicked18=false;
  
      }
   callfun1() {
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
    this.isClicked6=false;
    this.isClicked17=false;
    this.isClicked8=true
   }
   productionOrder(){
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
        console.log("am error")
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
    var states = new Set();
    states.add("ALL")
    for (let entry of this.mydata) {
      if(entry.region==event.option.value || event.option.value=="ALL"){
        states.add(entry.state);
      }  
    }
    this.states1=states
  }
  plantcodeselected(state){
    var plantCode = new Set();
    for (let entry of this.mydata) {
      if(entry.state==state.value || state.value=="ALL"){
        plantCode.add(entry.plantCode);
      }
    }
    this.plantCode1=plantCode;
  
  }
  //onclick of generate heatmap
  servicehit(){
    this.divshow = false;
    this.newArray1=null
    if(this.myForm.controls.materialNo.value){
      console.log(this.myForm.controls.materialNo.value)
      this.newArray1=["materialNo",this.myForm.controls.materialNo.value]
    }
    if(this.myForm.controls.plantCode.value){
      this.newArray1=["plantCode",this.myForm.controls.plantCode.value]
    }  
    this.divshow = true;
  }
  generateHeatmapFunction(){
    this.newArray1=null
    if(this.isClicked17 && this.isClicked18){
      this.newArray1=["excess","obsolete"]
    }
    else if(this.isClicked17){
      this.newArray1=["excess"]
      console.log("clicked 17--excess")
    }
    else if(this.isClicked18){
      this.newArray1=["obsolete"]
      console.log("clicked 18")
    }
    console.log(this.newArray1)

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
    this.isClicked6=false;
    this.isClicked4=false;
    this.isClicked5=false;
    this.isClicked14=false;
  }
  excessValueMethod(){
    this.isClicked3=false;
    this.isClicked4=false;
    this.isClicked5=false;
    this.isClicked14=false;
  }
 

}

import { Component, OnInit,Input, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3'; 
import { HeatmapDataService } from '../heapmap-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HostListener } from "@angular/core";
@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})

export class HeatMapComponent implements OnInit {
  screenWidth
  screenHeight
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  @Input() message?: any;
  filteron: any;
  noRecordsFound:boolean
  filterValue: string;
  dataFrom: any;
  excessBooleanQty:string;
  excessBooleanVal:string;
  obsoleteBooleanCheck:string
  obsoleteBoolean:boolean;
  check: boolean;
  showAlertDialog: boolean = false;
  svgTitle2 : any;
  svgTitle : any = "Inventory Top 50 Records Report";
  ngOnInit(){
    
  }
   ngOnChanges(change: SimpleChanges){
    
    // console.log(document.getElementById("mydiv").offsetWidth);

  //   console.log(this.maping)
  //  for (let i:number=0;i<this.message.length;i=i+2) {
  //    if(this.message[i+1]!=""){
  //     console.log(this.message)
  //    }
  //   }
    this.excessBooleanQty="";
    this.excessBooleanVal=""
    this.obsoleteBoolean=false;
    for (let i of this.message){
      if(i=="excessQty30Days" || i=="excessQty60Days" || i=="excessQty90Days"){
        this.excessBooleanQty="excessQty";
        this.svgTitle2="E&O Inventory Excess Quantity Report";
        this.svgTitle = '';
      }
      if(i=="excessValue30Days" || i=="excessValue60Days" || i=="excessValue90Days"){
        this.svgTitle2="E&O Inventory Excess Value Report";
        this.excessBooleanVal="excessVal"
      }
      if(i=="obsoleteValue"|| i=="obsoleteQty"){
        this.obsoleteBoolean=true;
        this.obsoleteBooleanCheck="obsolete"
        if(i=="obsoleteValue"){
          this.svgTitle2="E&O Inventory Obsolete Value Report";
        }
        if(i=="obsoleteQty"){
          this.svgTitle2="E&O Inventory Obsolete Quantity Report";
        }
        
        this.svgTitle = '';
      }
    }
    
    if(this.message.length>0){  
      this.myData.getFiltered(this.message).subscribe(
        (data:any[]) => {
          console.log(data.length)
          this.noRecordsFound=false
          if(data.length==0){
            this.noRecordsFound=true
          }
          if(this.excessBooleanQty!=""){
            this.main(data,this.excessBooleanQty);
          }
          else if(this.excessBooleanVal!=""){
            this.main(data,this.excessBooleanVal);
          }
          else if(this.obsoleteBooleanCheck!=""){
            this.main(data,this.obsoleteBooleanCheck);
          }
          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
          console.log("No Records found");
        }
      );
    }
    else{
      this.myData.getDataForTop().subscribe(
        
        data => {
          
          this.main(data);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
          console.log("No Records found");
        }
      );
    }

    }
  constructor(private myData:HeatmapDataService){
    this.onResize();
    }
    
    //calculation of width
  // calculateValues(area,no){
  //   var width=Math.floor(Math.sqrt(area/(no*2)))
  // return width
  // }

  main(data,checking?: string) {
    // console.log(data)
    var maxVal=0 
    var minVal=100000000;
  
    for (let i in data){
      if (Number(data[i]["value"])>maxVal){
        maxVal=Number(data[i]["value"])
      }
      if(Number(data[i]["value"])<minVal){
        minVal=Number(data[i]["value"])
      }
    }
    var tooltip = d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("position", "absolute")
    .style("pointer-events","none")
    .style("z-index", "40")
    .style("visibility", "hidden")
    .style("width", "auto")					
    .style("height","auto")
    .style("background-color","#D3D3D3");
    var width = this.screenWidth*77/100;
    console.log(width)
    var height = 495;
    //var y=this.calculateValues(area,data.length)
    
    var dataLength=data.length;
    var remaining=5-(data.length%5);
    var y
    var x
    var count=0; 
    var lengthofarray=data.length
    if(lengthofarray%5!=0){
      while(lengthofarray%5!=0){
        lengthofarray+=1;
      }
    }
    y=height/(lengthofarray/5);
    var temp=0
    x=width/5;
    var modx2=0;
    var loopcount=2
    var loopcount1=0
    var counting=0
    var count1=0;
    console.log(data.length)
    if(data.length%5==0){
      y=height/10;
      x=width/5;
    }
    //11 records so 4 arrangement
    else if(data.length%5==1){
      modx2=5 * x/2;
      loopcount1=2
      temp=modx2;
      mod1=x*2;
      count=1;
      count1=1;
    }
    //12 records
    else if(data.length%5==2){
      console.log("am inside")
      modx2=5 * x/2;
      loopcount1=2
      temp=modx2;
    }
    else if(data.length%5==3){
      var mod1=x*2;
      var count1=2;
      var count=2
    }
    else if(data.length%5==4){
      var mod1=x*2;
      count=1;
      count1=1;
    }
    var svgClass=d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("width", 100+"%")
  
    var constx=x;
    //Create SVG element
    d3.select("svg").remove();
    var svg = d3.select(".d3class")
    .append("svg")
    .attr("class","svgClass")
    .attr("width", width)
    .attr("height", height)
    .attr("stroke", "black")
    .attr("transform", "translate(" + 5 + "," + 20 + ")");

    var myColor = d3.scaleLinear().domain([minVal,maxVal])
    // .range(["#fff","red"]);
    //remove this line and add after compiling
                  
  

    var expensesAvgAmount = d3.nest()
    .key(function(d) { return d["region"]; })
    .key(function(d){ return d["state"]})
    .rollup(function(v):any { return {
      count: v.length,
      total: d3.sum(v, function(d) { return d["demandfor30Days"]; })
    }; })
    .entries(data);
  
  
    var dx=0;
    var dy=0;
    var rect=svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {

      if(count==0 && modx2==0){
        if((dx+x)<=width){
          var f1="translate("+dx+"," + dy + ")";
          dx+=x;
          return f1;
        }
        else{
          dx=0;
          dy+=y;
          var f2="translate("+dx+"," + dy + ")";
          dx=x;
          return f2;
        }
      }
      else if(modx2!=0){
        if((dx+modx2)<=width){
          loopcount--;
          var f1="translate("+dx+"," + dy + ")";
          dx+=modx2;
          if(loopcount==0){
            modx2=0;
          }
          return f1;
        }
      }
      else if(mod1!=0){
        if((dx+mod1)<=width){
          count--;
          var f1="translate("+dx+"," + dy + ")";
          dx+=mod1;
          if(count==0){
            mod1=0;
          }
          return f1;
        }
        else if((dx+mod1)>=width){
          count--
          dx=0;
          dy+=y;
          var f1="translate("+dx+"," + dy + ")";
          dx+=mod1;
          return f1;
        }
      }
      
      
  });
  
  var singlerect=rect.append("rect")
  .attr("width", function(d){
    if(loopcount1!=0){
      loopcount1--;
      counting+=1
      return temp;
    }
    else if(count1!=0){
      count--;
      return 2*x;
    }
    else {
      return x;
    }
    
  })
  .attr("height", y);
  
  
  
  rect.append("text")
      .attr("x","5")
      .attr("y","20")
      .attr("font-family","New Century Schoolbook, serif")
      .attr("fill","#000")
      .attr("font-size","20px")
      .text(function(d) { return (d["materialNo"]); });
  
  var eachRect=singlerect
  .attr("stroke-width","1")
  .attr("stroke","gray")
  .attr("fill", function(d){return myColor(d["value"])})
  .on("mouseover", function(){return tooltip.style("visibility", "visible");})
  .on("click", function(d){return tooltip.style("top", (d3.event.pageY-10)+"px")
    .style("left",(d3.event.pageX+10)+"px")


    .html(function(){
      console.log(checking)
      if (checking=="excessQty") 
        {return "<table class='table table-bordered' style='margin-bottom: 0;' *ngIf='false' ><tr><th colspan='3' style='text-align:center;border-bottom: 1px solid #505050;'>Material No# " +d["materialNo"]+"</th></tr>"
        +"<tr><td style='font-weight: bold;'>Plant Code</td> <td>"+d["plantCode"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Material Description</td><td>"+d["materialDescription"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Excess Quantity 30Days</td> <td>"+d["excessQuantityFor30Days"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Excess Quantity 60Days</td> <td>"+d["excessQuantityFor60Days"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Excess Quantity 90Days</td> <td>"+d["excessQuantityFor90Days"]+"</td></tr>"
       +"</table>"}
       else if (checking=="excessVal") 
        {return "<table class='table table-bordered' style='margin-bottom: 0;' *ngIf='false' ><tr><th colspan='3' style=' border-radius: 5px; text-align:center;border-bottom: 1px solid #505050;'>Material No# " +d["materialNo"]+"</th></tr>"
        +"<tr><td style='font-weight: bold;'>Plant Code</td> <td>"+d["plantCode"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Material Description</td><td>"+d["materialDescription"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Excess Value 30Days</td> <td>"+d["excessValueFor30Days"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Excess Value 60Days</td> <td>"+d["excessValueFor60Days"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Excess Value 90Days</td> <td>"+d["excessValueFor90Days"]+"</td></tr>"
       +"</table>"}
       else if (checking=="obsolete") 
        {return "<table class='table table-bordered' style='margin-bottom: 0;' *ngIf='false' ><tr><th colspan='3' style=' border-radius: 5px; text-align:center;border-bottom: 1px solid #505050;'>Material No# " +d["materialNo"]+"</th></tr>"
        +"<tr><td style='font-weight: bold;'>Plant Code</td> <td>"+d["plantCode"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Material Description</td><td>"+d["materialDescription"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Obsolete Qty</td> <td>"+d["obsoleteQty"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Obsolete  Value</td> <td>"+d["obsoleteValue"]+"</td></tr>"
       +"</table>"}
      
       else 
      	{ return "<table class='table table-bordered' style='margin-bottom: 0;' *ngIf='false' ><tr><th colspan='3' style=' border-radius: 5px; text-align:center;border-bottom: 1px solid #505050;'>Material No# " +d["materialNo"]+"</th></tr>"
        +"<tr><td style='font-weight: bold;'>Plant Code</td> <td>"+d["plantCode"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Material Description</td><td>"+d["materialDescription"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Demand 30Days</td> <td>"+d["demandFor30Days"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Demand 60Days</td> <td>"+d["demandFor60Days"]+"</td></tr>"
       +"<tr><td style='font-weight: bold;'>Demand 90Days</td> <td>"+d["demandFor90Days"]+"</td></tr>"
       +"</table>"}
      
    })
    
    // .html("<table border='1' *ngIf='false' ><tr><th colspan='3' style='text-align:center;border-bottom: 1px solid #505050;'>Material No# " +d["materialNo"]+"</th></tr>"
    //  +"<tr><td style='font-weight: bold;'>Plant Code</td> <td>"+d["plantCode"]+"</td></tr>"
    // +"<tr><td style='font-weight: bold;'>Material Description</td><td>"+d["materialDescription"]+"</td></tr>"
    // +"<tr><td style='font-weight: bold;'>Demand 30Days</td> <td>"+d["demandFor30Days"]+"</td></tr>"
    // +"<tr><td style='font-weight: bold;'>Demand 60Days</td> <td>"+d["demandFor60Days"]+"</td></tr>"
    // +"<tr><td style='font-weight: bold;'>Demand 90Days</td> <td>"+d["demandFor90Days"]+"</td></tr>"
    // +"</table>")
    .style("padding","1%")
    .style("opacity","1")
    .style("border-radius","15px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});  
  }
  
  mouseclick = function(d) {
    this.showAlertDialog = true;
    this.obj=d;  
  var name = d;
  
   
  }
  
  textcolor=d3.selectAll("text").attr("fill", "white");

  

  }
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
  filterValue: string;
  dataFrom: any;
 
  check: boolean;
  showAlertDialog: boolean = false;
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
    if(this.message.length>0){  
      this.myData.getFiltered(this.message).subscribe(
        data => {
          this.main(data);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
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

  main(data) {
    
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
    .style("z-index", "40")
    .style("visibility", "hidden")
    .style("width", "26%")					
    .style("height","auto")
    .style("background-color","lightgrey");
    var width = this.screenWidth*77/100;
    console.log(width)
    var height = 550;
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
    var count1=0;
    if(data.length%5==0){
      y=height/10;
      x=width/5;
    }
    //11 records so 4 arrangement
    else if(data.length%5==1){
     modx2=5 * x/2;
     loopcount1=2
     temp=modx2;
     var mod1=x*2;
     count=1;
    }
    //12 records
    else if(data.length%5==2){
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
    //remove this line and add after compiling
    .range(["#fff","red"])
                  
  
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
      }
      
      
  });
  
  var singlerect=rect.append("rect")
  .attr("width", function(d){
    if(loopcount1!=0){
      loopcount1--;
      
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
      .attr("font-family","helivetica")
      .attr("fill","#000")
      .attr("font-size","13px")
      .text(function(d) { return (d["materialNo"]); });
  
  var eachRect=singlerect
  .attr("stroke-width","1")
  .attr("stroke","gray")
  .attr("fill", function(d){return myColor(d["value"])})
  .on("mouseover", function(){return tooltip.style("visibility", "visible");})
  .on("click", function(d){return tooltip.style("top", (d3.event.pageY-10)+"px")
    .style("left",(d3.event.pageX+10)+"px")
    // .text("PlantCode: "+d["plantCode"]+"Material Desc: "+d["materialDescription"]+" Demand 30 Days :"+d["demandFor30Days"]+" Demand 60 Days : "+d["demandFor60Days"]+" Demand 90 Days:"+d["demandFor90Days"])
    // PlantCode: "+d["plantCode"]+"<br> Material Desc: "+d["materialDescription"]+"<br>"
    // +"Demand 30 Days :"+d["demandFor30Days"]+"<br> Demand 60 Days : "+d["demandFor60Days"]+"<br>"
    // +" Demand 90 Days:"+d["demandFor90Days"]+
    .html("<table><tr><td style='font-weight: bold;'>Plant Code</td><td style='font-weight: bold;'>: </td> <td>"+d["plantCode"]+"</td></tr>"
    +"<tr><td style='font-weight: bold;'>Material Description</td> <td style='font-weight: bold;'>: </td><td>"+d["materialDescription"]+"</td>"
    +"<tr><td style='font-weight: bold;'>Demand 30Days</td><td style='font-weight: bold;'>: </td> <td>"+d["demandFor30Days"]+"</td>"
    +"<tr><td style='font-weight: bold;'>Demand 60Days</td><td style='font-weight: bold;'>: </td> <td>"+d["demandFor60Days"]+"</td>"
    +"<tr><td style='font-weight: bold;'>Demand 90Days</td> <td style='font-weight: bold;'>: </td><td>"+d["demandFor90Days"]+"</td>"
    +"</table>")
    .style("padding","1%")
    .style("opacity","1");})  
  }
  
  mouseclick = function(d) {
    this.showAlertDialog = true;
    this.obj=d;  
  var name = d;
  
   
  }
  
  textcolor=d3.selectAll("text").attr("fill", "white");
  }
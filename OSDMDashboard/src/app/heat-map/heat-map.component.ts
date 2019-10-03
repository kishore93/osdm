import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3'; 
import { HeatmapDataService } from '../heapmap-data.service';

import { ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit {
  @Input() message?: string;
  filteron: any;
  filterValue: string;
  dataFrom: any;
  margin: any = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
      };
  width: number = 450 - this.margin.left - this.margin.right;
  height: number = 450 - this.margin.top - this.margin.bottom;
    check: boolean;
    showAlertDialog: boolean = false;
    ngOnInit(){
      console.log("am in")
    }
  ngOnChanges(changes: SimpleChanges){
    console.log(this.message)
    if(this.message){  
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
    }
    
    //calculation of width
  // calculateValues(area,no){
  //   var width=Math.floor(Math.sqrt(area/(no*2)))
  // return width
  // }
  main(data) {
    console.log(data)
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
    
    
  
    var defaults = {
      margin: {top: 24, right: 0, bottom: 0, left: 0},
      rootname: "TOP",
      format: ".0f",
      title: "",
      width: 800,
      height: 600
    };
    var width = 700;
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
    
    console.log(data.length);
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
      
    var constx=x;
    //Create SVG element
    d3.select("svg").remove();
    var svg = d3.select(".d3class")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("stroke", "black")
    .attr("transform", "translate(" + 5 + "," + 20 + ")");

    var myColor = d3.scaleLinear().domain([minVal,maxVal])
    //remove this line and add after compiling
    .range(['#fff','red']);
                  
  
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
      console.log(count);
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
      console.log(temp)
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
    .text("Material Desc: "+d["materialDescription"]+" Demand 30 Days :"+d["demandFor30Days"]+" Demand 60 Days : "+d["demandFor60Days"]+" Demand 90 Days:"+d["demandFor90Days"])
    .style("padding","1%")
    .style("opacity","1");})
  
  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
  
  }
  
  mouseclick = function(d) {
    this.showAlertDialog = true;
    this.obj=d;  
  var name = d;
  
   
  }
  
  textcolor=d3.selectAll("text").attr("fill", "white");
  }
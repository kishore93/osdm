import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3'; 
import { DataModel } from '../dataModel';
import { color } from 'd3';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('chart', {static: true})
  private chartContainer: ElementRef;

  @ViewChild('doublechart', {static: true})
  private chartContainerDouble: ElementRef;

  @ViewChild('svg1', {static: true})
  private chartContainer1: ElementRef;
  constructor() { 
    
  }
 data1: DataModel[]=[
	{
		"letter": "P0020",
    "frequency": 897,
    "frequency1": 400
	},
	{
		"letter": "P0021",
    "frequency": 457,
    "frequency1": 900
	},
	{
		"letter": "P0022",
    "frequency": 454,
    "frequency1": 500
	},
	{
		"letter": "P0023",
    "frequency":545,
    "frequency1": 625
	},
	{
		"letter": "P0024",
    "frequency": 454,
    "frequency1": 108
	},
	{
		"letter": "P0025",
    "frequency": 244,
    "frequency1": 300
	}
]
margin = {top: 20, right: 20, bottom: 50, left: 40};
  cities = [
    { name: 'London', population: 86},
    { name: 'New York', population: 80},
    { name: 'Sydney', population: 49},
    { name: 'Paris', population: 224},
    { name: 'Beijing', population: 111}
  ];

w = 300                      
h = 300                         
r = 100
ngOnInit() {
    this.barchart()
    this.createChart()
    this.piechart1()
    this.piechart2()
    this.createChartDouble()
}
piechart2(){
  var arcGenerator = d3.arc()
	.innerRadius(0)
  .outerRadius(120);
  var colors=d3.scaleOrdinal(d3.schemeDark2)
  var arcData = [
    {label: 'P0022', startAngle: 0, endAngle: 0.4},
    {label: 'P0023', startAngle: 0.4, endAngle: 0.6},
    {label: 'P0024', startAngle: 0.6, endAngle: 1.4},
    {label: 'P0025', startAngle: 1.4, endAngle: 2.5},
    {label: 'P0026', startAngle: 2.5, endAngle: 4},
    {label: 'P0027', startAngle: 4, endAngle: 2* Math.PI}
  ];
  d3.select('#pie2')
	.selectAll('path')
	.data(arcData)
	.enter()
	.append('path')
  .attr('d', <any>arcGenerator)
  .attr("fill",function(d){return colors(<any>d.startAngle);});

  // d3.select('#pie2')
	// .selectAll('text')
	// .data(arcData)
	// .enter()
	// .append('text')
	// .each(function(d) {
  //   var centroid = arcGenerator.centroid(<any>d);
	// 	d3.select(this)
	// 		.attr('x', centroid[0])
	// 		.attr('y', centroid[1])
	// 		.attr('dy', '0.33em')
	// 		.text(d.label).style("fill","white").style("font-size","10px");
  // });
  
  var legends=d3.select("#pie1").append("g").attr("transform","translate(400,10)")
              .selectAll(".legends").data(arcData);
  var legend=legends.enter().append('g').classed("legends",true)
  .attr("transform",function(d,i){return "translate(0,"+(i+1)*30+")";});
  legend.append("rect").attr("width",10).attr("height",10)
  .attr("fill",function(d){return colors(<any>d.startAngle);});
  legend.append("text").text(function(d){return " "+d.label})
  .attr("x",12)
  .attr("y",10)
//   d3.select('#pie2')
// 	.selectAll('text')
// 	.data(arcData)
// 	.enter()
// 	.append('text')
// 	.each(function(d) {
//     var centroid = arcGenerator.centroid(<any>d);
// 		d3.select(this)
// 			.attr('x', centroid[0])
// 			.attr('y', centroid[1])
//       .attr('dy', '0.33em')
      
// 			.text(d.label).style("fill","white").style("font-size","10px");
//   })
//   .attr("text-anchor", function(d) {
//     // are we past the center?
//     return (d.endAngle + d.startAngle)/2 > Math.PI ?
//         "end" : "start";
// });
}
barchart(){
  const element=this.chartContainer1.nativeElement;
  var data = [{"materialNo":"CNA504950","sales":10},{"materialNo":"CNA504951","sales":15},{"materialNo":"CNA504952","sales":23},{"materialNo":"CNA504953","sales":35},{"materialNo":"CNA504956","sales":48},{"materialNo":"CNA5049501","sales":56},{"materialNo":"CNA5049503","sales":67},{"materialNo":"CNA504987","sales":78},{"materialNo":"CNA5049509","sales":82},{"materialNo":"CNA5049505","sales":94}];
  var margin = {top: 20, right: 20, bottom: 30, left: 70};
  var   width = element.offsetWidth - margin.left - margin.right;
  var   height = 300 - margin.top - margin.bottom;
  var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.2);
  var x = d3.scaleLinear()
  .range([0, width]);

  var svg = d3.select("#svg1").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");
  data.forEach(function(d) {
    d.sales = +d.sales;
  });
  x.domain([0, d3.max(data, function(d){ return d.sales; })])
  y.domain(data.map(function(d) { 
     return d.materialNo; }));
  
     
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("fill","#72a4d0")
    .attr("width", function(d) {return x(d.sales); } )
    .attr("y", function(d) { return y(d.materialNo); })
    .attr("height", y.bandwidth());
  
  // svg.selectAll(".bar1").data(data)
  // .enter()
  // .append("text").text("am sumanth")
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
  
}
 
private createChart(): void {
  const element = this.chartContainer.nativeElement;
  const data = this.data1;

  const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

  const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
  const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;
  
  const x = d3
    .scaleBand()
    .rangeRound([0, contentWidth])
    .padding(0.1)
    .domain(data.map(d => d.letter));
  const y = d3
    .scaleLinear()
    .rangeRound([contentHeight, 0])
    .domain([0, d3.max(data,d => d.frequency1)]);
  // var line = d3.line()
  // .x(function(d) { return x(d["frequency1"]) + x.bandwidth()/2; })
  // .y(function(d) { return 400 - y(d["frequency"]); })
  // svg.selectAll("path").data([data]).enter()
  //   .append("path")
  //   .attr("d", <any>line)
  //   .style("stroke", "black")
  //   .style("fill", "red");

  
    // console.log(y(50),contentHeight)
  const g = svg.append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + contentHeight + ')')
    .call(d3.axisBottom(x));

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(5))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');


  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
      .attr("fill", "#72a4d0")
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.frequency));

  svg.append("text").text("PlantCode").attr("x",200).attr("y",element.offsetHeight-10).style("font-size","20px")
  
  var lineFunction = d3.line()
                          .x(function(d,i) {console.log(d["frequency1"]); return d["frequency1"]; })
                         .y(function(d,i) {console.log(i*10);return i*10 })
  svg.append("path")
  .data([data])
  .attr("class", "line").style("fill","none").style("stroke","red").style("stroke-width","4px")
  .attr("d", <any>lineFunction);
}

piechart1(){
  var arcGenerator = d3.arc()
	.innerRadius(0)
  .outerRadius(120);
  var colors=d3.scaleOrdinal(d3.schemeDark2)
  var arcData = [
    {label: 'P0022', startAngle: 0, endAngle: 0.2},
    {label: 'P0023', startAngle: 0.2, endAngle: 0.6},
    {label: 'P0024', startAngle: 0.6, endAngle: 1.4},
    {label: 'P0025', startAngle: 1.4, endAngle: 3},
    {label: 'P0026', startAngle: 3, endAngle: 2* Math.PI}
  ];
  d3.select('#pie1')
	.selectAll('path')
	.data(arcData)
	.enter()
	.append('path')
  .attr('d', <any>arcGenerator)
  .attr("fill",function(d){return colors(<any>d.startAngle);});;

  
  var legends=d3.select("#pie1").append("g").attr("transform","translate(120,40)")
              .selectAll(".legends").data(arcData);
  var legend=legends.enter().append('g').classed("legends",true)
  .attr("transform",function(d,i){return "translate(0,"+(i+1)*30+")";});
  legend.append("rect").attr("width",10).attr("height",10)
  .attr("fill",function(d){return colors(<any>d.startAngle);});
  legend.append("text").text(function(d){return " "+d.label})
  .attr("x",12)
  .attr("y",10)
}


private createChartDouble(): void {
  const element = this.chartContainerDouble.nativeElement;
  const data = this.data1;

  const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

  const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
  const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

  const x = d3
    .scaleBand()
    .rangeRound([0, contentWidth])
    .padding(0.1)
    .domain(data.map(d => d.letter));

  const y = d3
    .scaleLinear()
    .rangeRound([contentHeight, 0])
    .domain([0, d3.max(data, d => d.frequency)]);

  const g = svg.append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + contentHeight + ')')
    .call(d3.axisBottom(x));

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(5))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');


  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
      .attr("fill", "#71af7f")
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', 30)
      .attr('height', d => contentHeight - y(d.frequency));
    g.selectAll('.bar1')
    .data(data)
    .enter().append('rect')
      .attr("fill", "#d5f7da")
      .attr('class', 'bar1')
      .attr('x', d => 30+x(d.letter))
      .attr('y', d => y(d.frequency1))
      .attr('width', 20)
      .attr('height', d => contentHeight - y(d.frequency1));
  svg.append("text").text("PlantCode").attr("x",200).attr("y",element.offsetHeight-10).style("font-size","20px");
  var legends=svg.append("g").attr("transform","translate(400,10)")
  legends.append("rect").attr("width",10).attr("height",10)
  .attr("fill","#d5f7da");
  legends.append("text").text("Actual Inventory")
  .attr("x",12)
  .attr("y",10)
  legends.append("rect").attr("width",10).attr("height",10).attr("y",20)
  .attr("fill","#71af7f");
  legends.append("text").text("Demand 30Days")
  .attr("x",12)
  .attr("y",30)
}
}

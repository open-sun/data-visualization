import * as d3 from "d3";
import water from"./assets/dataset.csv";
d3.csv(water, function(d) {
  if (d.time === "2022/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  d3.selectAll(".chart").style("display", "none");
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2022")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2021/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2021")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2020/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2020")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2019/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2019")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2018/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2018")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2017/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2017")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2016/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2016")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2015/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2015")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2014/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2014")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2013/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2013")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2012/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2012")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2011/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2011")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2010/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2010")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2009/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2009")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2008/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2008")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2007/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2007")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2006/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2006")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2005/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2005")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.csv(water, function(d) {
  if (d.time === "2004/1/1") {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "rgba(0, 0, 0, 0.8)")
  .style("color", "white")
  .style("padding", "5px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("opacity", 0);
  function rightMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "red"); 
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>供水量: " + d.supply+"<br/>水资源量: " + d.load)
      .style("px",100)
      .style("left", (x + 100))
      .style("top", (y - 28 + "px"));
  }
  
  
  function rightMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "steelblue"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function rightclickover(d){
    var x = this.getBoundingClientRect().left; // 使用event.pageX
    var y = this.getBoundingClientRect().top; // 使用event.pageY
    var d = d3.select(this).data()[0]; // 使用d3.pointer()获取鼠标坐标
    tooltip.style("opacity", 1)
      .html("地区: "+d.area +"<br/>水资源量: " + d.load+ "<br/>供水量: " + d.supply)
      .style("left", (x + 30))
      .style("top", (y - 28 + "px"));
  }
  function leftMouseOver(d) {
    // 在这里添加鼠标移入时的逻辑
    d3.select(this).attr("fill", "green"); 
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + 50))
      .style("top", (y - 28 + "px"));
  }
  
  
  function leftMouseOut(d) {
    // 在这里添加鼠标移出时的逻辑
    d3.select(this).attr("fill", "yellow"); 
    tooltip.style("opacity", 0);// 恢复条形的颜色示例
  }
  function leftclickover(d){
    var x = this.getBoundingClientRect().left; 
    var y = this.getBoundingClientRect().top;
    var d = d3.select(this).data()[0]; //
    tooltip.style("opacity", 1)
      .html("地区: "+d.area + "<br/>水资源量: " + d.load+"<br/>供水量："+d.supply)
      .style("left", (x + "px"))
      .style("top", (y - 28 + "px"));
  }
  let sumsupply=d3.sum(data,d=>d.supply);
  let sumload=d3.sum(data,d=>d.load)
  console.log(sumsupply);
  console.log(sumload);
  console.log(data);  
  const marginTop=20;
  const marginBottom=20;
  const marginLeft=80;
  const marginRight=80;
  const height=1000;
  const width=1000;
  const y = d3.scaleBand()
  .domain(d3.map(data, d => d.area))
  .range([marginTop, height]);
  const xright=d3.scaleLinear()
  .domain([0,0.16])
  .range([marginLeft+1/2*width,marginLeft+width]);
  const xleft=d3.scaleLinear()
  .domain([0.16,0])
  .range([marginLeft,marginLeft+1/2*width]);
  const yaxis=d3.axisLeft(y)
                .tickSize(0)
                .tickFormat("");
  const xleft1=d3.axisTop(xleft);
  const xright1=d3.axisTop(xright);
console.log("Y 轴域:", y.domain());
console.log("Y 轴范围:", y.range());
console.log("X left轴域:", xleft.domain());
console.log("Xright轴范围:", xright.range());
const svg=d3.select("#svg2004")
            .attr("width",marginLeft+width+marginRight)
            .attr("height",marginBottom+height+marginTop);
      svg.append("g")
      .attr("transform",`translate(${marginLeft+1/2*width},0)`)
      .call(yaxis)
      .call(g => g.append("text")
          .attr("x", -5)
          .attr("y", height)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("地区"));
      svg.append("g")
      .attr("transform",`translate(0,${marginTop})`)
      .call(xleft1)
      .call(g=>g.append("text")
                .attr("x",0)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省水资源占比"));
      svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xright1)
      .call(g=>g.append("text")
                .attr("x",marginLeft+width)
                .attr("y",0)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("各省供水量占比"));
      svg.selectAll(".rightbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "rightbar")
      .attr("x",1/2*width+marginLeft)
      .attr("width", d => xright(d.supply/sumsupply)-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "steelblue")
      .on("mouseover", rightMouseOver) // 鼠标移入事件
      .on("mouseout", rightMouseOut);
      svg.selectAll(".rightbar-label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.area)
      .attr("class", "rightbar-label")
      .attr("x", d => xright(d.supply / sumsupply)+30)
      .attr("y", d => y(d.area))
      .attr("dy", 12) // 向上偏移10个像素
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px");
      svg.selectAll(".leftbar")
      .data(data)
      .enter().append("rect")
      .attr("class", "leftbar")
      .attr("x",d=>1/2*width+marginLeft-Math.abs(xright(d.load/sumload))+580)
      .attr("width", d => Math.abs(xright(d.load/sumload))-580)
      .attr("height", y.bandwidth()*0.7)
      .attr("y", d => y(d.area))
      .attr("fill", "yellow")
      .on("mouseover", leftMouseOver) // 鼠标移入事件
      .on("mouseout", leftMouseOut);
})
d3.select("#chart-select").on("change", function() {
  d3.selectAll(".chart").style("display", "none");
  d3.selectAll(".chart1").style("display", "none");
  var selectedValue = d3.select(this).property("value");
  if (selectedValue === "my2022") {
    d3.select("#my2022").style("display", "block");
  } else if (selectedValue === "my2021") {
    d3.select("#my2021").style("display", "block");
  } else if (selectedValue === "my2020") {
    d3.select("#my2020").style("display", "block");
  }else if (selectedValue === "my2019") {
    d3.select("#my2019").style("display", "block");
  }else if (selectedValue === "my2018") {
    d3.select("#my2018").style("display", "block");
  }else if (selectedValue === "my2017") {
    d3.select("#my2017").style("display", "block");
  }else if (selectedValue === "my2016") {
    d3.select("#my2016").style("display", "block");
  }else if (selectedValue === "my2015") {
    d3.select("#my2015").style("display", "block");
  }else if (selectedValue === "my2014") {
    d3.select("#my2014").style("display", "block");
  }else if (selectedValue === "my2013") {
    d3.select("#my2013").style("display", "block");
  }else if (selectedValue === "my2012") {
    d3.select("#my2012").style("display", "block");
  }else if (selectedValue === "my2011") {
    d3.select("#my2011").style("display", "block");
  }else if (selectedValue === "my2010") {
    d3.select("#my2010").style("display", "block");
  }else if (selectedValue === "my2009") {
    d3.select("#my2009").style("display", "block");
  }else if (selectedValue === "my2008") {
    d3.select("#my2008").style("display", "block");
  }else if (selectedValue === "my2007") {
    d3.select("#my2007").style("display", "block");
  }else if (selectedValue === "my2006") {
    d3.select("#my2006").style("display", "block");
  }else if (selectedValue === "my2005") {
    d3.select("#my2005").style("display", "block");
  }else if (selectedValue === "my2004") {
    d3.select("#my2004").style("display", "block");
  }
});
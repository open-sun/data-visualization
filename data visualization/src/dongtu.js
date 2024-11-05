import * as d3 from "d3";
import water from"./assets/dataset3.csv";
d3.selectAll(".bar").style("display", "none");
d3.csv(water, function(d) { {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  console.log(data)
  
let arr = [];
for (var i = 0; i < 19; i++) {
  arr[i] = [];
}
console.log(arr); 
  for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2004/1/1") {
            arr[0].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2005/1/1") {
            arr[1].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2006/1/1") {
            arr[2].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2007/1/1") {
            arr[3].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2008/1/1") {
            arr[4].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2009/1/1") {
            arr[5].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2010/1/1") {
            arr[6].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2011/1/1") {
            arr[7].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2012/1/1") {
            arr[8].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2013/1/1") {
            arr[9].push(data1)
        }
    } for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2014/1/1") {
            arr[10].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2015/1/1") {
            arr[11].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2016/1/1") {
            arr[12].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2017/1/1") {
            arr[13].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2018/1/1") {
            arr[14].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2019/1/1") {
            arr[15].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2020/1/1") {
            arr[16].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2021/1/1") {
            arr[17].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2022/1/1") {
            arr[18].push(data1)
        }
    }
    let datawater = [];
  for (let i = 0; i < arr.length; i++) {
      let data1 = arr[i];
         {
            datawater.push(data1)
        }
    }
  console.log(arr)
  console.log(datawater)
  const SVG_WIDTH = 1400; 
    const SVG_HEIGHT = 600; 
    const RECT_WIDTH = 30; 
    const RECT_SPACE = 10; 
    const LABEL_WIDTH = 10; 
    const DATA_WIDTH = 100; 
    const LEFT_WIDTH = 50; 
    const INTERVAL_TIME = 2000; 

    //创建SVG图像
    let svg = d3.select("#myload")
        .append("svg")
        .attr('width', SVG_WIDTH)
        .attr('height', SVG_HEIGHT)

    // 坐标轴g
    let gAxis = svg.append("g")
        .attr("transform", `translate(${LEFT_WIDTH}, ${SVG_HEIGHT-20})`)
    let gBar = svg.append('g')
    let axis = d3.axisBottom()
    const customColorRange = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5', '#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39', '#e7ba52', '#e7cb94', '#843c39'];
    const colorScale = d3.scaleOrdinal()
    .domain(datawater.flatMap(data => data.map(d => d.area)))
    .range(customColorRange);

    let index = 0;
    let interval;
    function startAnimation() {
      // 启动动画
      interval = window.setInterval(() => {
        document.getElementById("time").innerText = datawater[index][0].time;
            //比例尺
            let scale = d3.scaleLinear()
                .domain([0, d3.max(datawater[index], d => d.load)])
                .range([0, SVG_WIDTH - DATA_WIDTH - LABEL_WIDTH-100])
            //绑定坐标轴比例尺
            axis.scale(scale);
            // 绘制坐标轴
            axis(gAxis)
            gAxis.selectAll("line")
                .attr("y2", -1000)
                .attr("stroke", "#000000")
    
            gAxis.selectAll("text")
            //排序
            let data = datawater[index].sort((a, b) => b.load - a.load);
            /**
             * 删除数据
             **/
            gBar.selectAll('g')
                .data(data, d => d.area)
                .exit()
                .remove()
            /**
             *添加数据
             **/
            let groupAppend = gBar.selectAll('g')
                .data(data, d => d.area)
                .enter()
                .append('g')
                .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
            groupAppend.append("rect")
                .attr("x", 0)
                .attr("y", RECT_SPACE)
                .attr("width", d => scale(d.load))
                .attr("height", RECT_WIDTH)
                .attr("fill", d => colorScale(d.area)); // 使用颜色比例尺
            groupAppend.append("text")
                .attr("x", d => scale(d.load) + LABEL_WIDTH-20)
                .attr("y", RECT_WIDTH / 2 + RECT_SPACE)
                .attr("dy", ".35em")
                .text(d => d.load)
                .attr("fill", d => colorScale(d.area));
            groupAppend.append("text")
                .attr("class", "name")
                .attr("font-weight", 600)
                .attr("fill", "#000000")
                .attr("x", 0)
                .attr("y", RECT_SPACE)
                .attr('text-anchor', "end")
                .attr("dy", ".35em")
                .text(d => d.area);
    
            /**
             * 数据更新
             **/
            let group = gBar.selectAll('g')
                .data(data, d => d.area)
                .transition()
                .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
            group.select("rect")
                .attr("width", d => scale(d.load))
                .attr("fill", d => colorScale(d.area));
            group.select("text")
                .attr("x", d => scale(d.load) + LABEL_WIDTH+10)
                .text(d => d.load);
            group.select(".name")
                .attr("x", d => scale(d.load) - LABEL_WIDTH)
                .text(d => d.area);
             index = index + 1;
            if (index === datawater.length ) {
                clearTimeout(interval);
            }
    }, INTERVAL_TIME)
  }
  let isPlaying = true;
  startAnimation();
    const replayButton = d3.select("#myload")
    .append("button")
    .text("Replay")
    .style("position", "absolute")
    .style("top", "1900px")
    .style("left", `${LEFT_WIDTH+100}px`)
    .on("click", function () {
       index = 0;
       startAnimation()
    })
const pauseButton = d3.select("#myload")
    .append("button")
    .text("Pause")
    .style("position", "absolute")
    .style("top", "1900px")
    .style("left", `${LEFT_WIDTH + 200}px`) // 调整按钮位置
    .on("click", function () {
      if (isPlaying) {
        clearTimeout(interval); // 停止动画
        isPlaying = false; // 更新播放状态为false
    } else {
        // 继续动画
        startAnimation();
        isPlaying = true; // 更新播放状态为true
    }
    });
})
d3.csv(water, function(d) { {
    return {
      load: +d.waterload,
      time: d.time,
      area: d.area,
      population:+d.population,
      supply:+d.watersupply
    };
  }
}).then(function(data){
  console.log(data)
  
let arr = [];
for (var i = 0; i < 19; i++) {
  arr[i] = [];
}
console.log(arr); 
  for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2004/1/1") {
            arr[0].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2005/1/1") {
            arr[1].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2006/1/1") {
            arr[2].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2007/1/1") {
            arr[3].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2008/1/1") {
            arr[4].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2009/1/1") {
            arr[5].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2010/1/1") {
            arr[6].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2011/1/1") {
            arr[7].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2012/1/1") {
            arr[8].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2013/1/1") {
            arr[9].push(data1)
        }
    } for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2014/1/1") {
            arr[10].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2015/1/1") {
            arr[11].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2016/1/1") {
            arr[12].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2017/1/1") {
            arr[13].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2018/1/1") {
            arr[14].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2019/1/1") {
            arr[15].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2020/1/1") {
            arr[16].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2021/1/1") {
            arr[17].push(data1)
        }
    }
    for (let i = 0; i < data.length; i++) {
      let data1 = data[i];
        if (data1.time=="2022/1/1") {
            arr[18].push(data1)
        }
    }
    let datawater = [];
  for (let i = 0; i < arr.length; i++) {
      let data1 = arr[i];
         {
            datawater.push(data1)
        }
    }
  console.log(arr)
  console.log(datawater)
  const SVG_WIDTH = 1400; //svg宽度
    const SVG_HEIGHT = 600; //svg高度
    const RECT_WIDTH = 30; //矩形宽度
    const RECT_SPACE = 10; //间隔
    const LABEL_WIDTH = 10; //标签宽度
    const DATA_WIDTH = 100; //标签宽度
    const LEFT_WIDTH = 50; //左边平移宽度
    const INTERVAL_TIME = 2000; //刷新间隔时间（毫秒）

    //创建SVG图像
    let svg = d3.select("#mysupply")
        .append("svg")
        .attr('width', SVG_WIDTH)
        .attr('height', SVG_HEIGHT)

    // 坐标轴g
    let gAxis = svg.append("g")
        .attr("transform", `translate(${LEFT_WIDTH}, ${SVG_HEIGHT-20})`)
    let gBar = svg.append('g')
    let axis = d3.axisBottom()
    const customColorRange = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5', '#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39', '#e7ba52', '#e7cb94', '#843c39'];
    const colorScale = d3.scaleOrdinal()
    .domain(datawater.flatMap(data => data.map(d => d.area)))
    .range(customColorRange);

    let index = 0;
    let interval;
    function startAnimation() {
      // 启动动画
      interval = window.setInterval(() => {
        document.getElementById("time1").innerText = datawater[index][0].time;
            //比例尺
            let scale = d3.scaleLinear()
                .domain([0, d3.max(datawater[index], d => d.supply)])
                .range([0, SVG_WIDTH - DATA_WIDTH - LABEL_WIDTH-100])
            //绑定坐标轴比例尺
            axis.scale(scale);
            // 绘制坐标轴
            axis(gAxis)
            gAxis.selectAll("line")
                .attr("y2", -1000)
                .attr("stroke", "#000000")
    
            gAxis.selectAll("text")
            //排序
            let data = datawater[index].sort((a, b) => b.supply - a.supply);
            /**
             * 删除数据
             **/
            gBar.selectAll('g')
                .data(data, d => d.area)
                .exit()
                .remove()
            /**
             *添加数据
             **/
            let groupAppend = gBar.selectAll('g')
                .data(data, d => d.area)
                .enter()
                .append('g')
                .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
            groupAppend.append("rect")
                .attr("x", 0)
                .attr("y", RECT_SPACE)
                .attr("width", d => scale(d.supply))
                .attr("height", RECT_WIDTH)
                .attr("fill", d => colorScale(d.area)); // 使用颜色比例尺
            groupAppend.append("text")
                .attr("x", d => scale(d.supply) + LABEL_WIDTH-20)
                .attr("y", RECT_WIDTH / 2 + RECT_SPACE)
                .attr("dy", ".35em")
                .text(d => d.supply)
                .attr("fill", d => colorScale(d.area));
            groupAppend.append("text")
                .attr("class", "name")
                .attr("font-weight", 600)
                .attr("fill", "#000000")
                .attr("x", 0)
                .attr("y", RECT_SPACE)
                .attr('text-anchor', "end")
                .attr("dy", ".35em")
                .text(d => d.area);
    
            /**
             * 数据更新
             **/
            let group = gBar.selectAll('g')
                .data(data, d => d.area)
                .transition()
                .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
            group.select("rect")
                .attr("width", d => scale(d.supply))
                .attr("fill", d => colorScale(d.area));
            group.select("text")
                .attr("x", d => scale(d.supply) + LABEL_WIDTH+10)
                .text(d => d.supply);
            group.select(".name")
                .attr("x", d => scale(d.supply) - LABEL_WIDTH)
                .text(d => d.area);
             index = index + 1;
            if (index === datawater.length ) {
                clearTimeout(interval);
            }
    }, INTERVAL_TIME)
  }
  let isPlaying = true;
  startAnimation();
    const replayButton = d3.select("#mysupply")
    .append("button")
    .text("Replay")
    .style("position", "absolute")
    .style("top", "1900px")
    .style("left", `${LEFT_WIDTH+100}px`)
    .on("click", function () {
       index = 0;
       startAnimation()
    })
const pauseButton = d3.select("#mysupply")
    .append("button")
    .text("Pause")
    .style("position", "absolute")
    .style("top", "1900px")
    .style("left", `${LEFT_WIDTH + 200}px`) // 调整按钮位置
    .on("click", function () {
      if (isPlaying) {
        clearTimeout(interval); // 停止动画
        isPlaying = false; // 更新播放状态为false
    } else {
        // 继续动画
        startAnimation();
        isPlaying = true; // 更新播放状态为true
    }
    });
})
d3.csv(water, function(d) { {
  return {
    load: +d.waterload,
    time: d.time,
    area: d.area,
    population:+d.population,
    supply:+d.watersupply
  };
}
}).then(function(data){
console.log(data)

let arr = [];
for (var i = 0; i < 19; i++) {
arr[i] = [];
}
console.log(arr); 
for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2004/1/1") {
          arr[0].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2005/1/1") {
          arr[1].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2006/1/1") {
          arr[2].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2007/1/1") {
          arr[3].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2008/1/1") {
          arr[4].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2009/1/1") {
          arr[5].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2010/1/1") {
          arr[6].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2011/1/1") {
          arr[7].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2012/1/1") {
          arr[8].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2013/1/1") {
          arr[9].push(data1)
      }
  } for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2014/1/1") {
          arr[10].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2015/1/1") {
          arr[11].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2016/1/1") {
          arr[12].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2017/1/1") {
          arr[13].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2018/1/1") {
          arr[14].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2019/1/1") {
          arr[15].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2020/1/1") {
          arr[16].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2021/1/1") {
          arr[17].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2022/1/1") {
          arr[18].push(data1)
      }
  }
  let datawater = [];
for (let i = 0; i < arr.length; i++) {
    let data1 = arr[i];
       {
          datawater.push(data1)
      }
  }
console.log(arr)
console.log(datawater)
const SVG_WIDTH = 1400; //svg宽度
  const SVG_HEIGHT = 600; //svg高度
  const RECT_WIDTH = 30; //矩形宽度
  const RECT_SPACE = 10; //间隔
  const LABEL_WIDTH = 10; //标签宽度
  const DATA_WIDTH = 100; //标签宽度
  const LEFT_WIDTH = 50; //左边平移宽度
  const INTERVAL_TIME = 2000; //刷新间隔时间（毫秒）

  //创建SVG图像
  let svg = d3.select("#mypopulation")
      .append("svg")
      .attr('width', SVG_WIDTH)
      .attr('height', SVG_HEIGHT)

  // 坐标轴g
  let gAxis = svg.append("g")
      .attr("transform", `translate(${LEFT_WIDTH}, ${SVG_HEIGHT-20})`)
  let gBar = svg.append('g')
  let axis = d3.axisBottom()
  const customColorRange = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5', '#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39', '#e7ba52', '#e7cb94', '#843c39'];
  const colorScale = d3.scaleOrdinal()
  .domain(datawater.flatMap(data => data.map(d => d.area)))
  .range(customColorRange);

  let index = 0;
  let interval;
  function startAnimation() {
    // 启动动画
    interval = window.setInterval(() => {
      document.getElementById("time2").innerText = datawater[index][0].time;
          //比例尺
          let scale = d3.scaleLinear()
              .domain([0, d3.max(datawater[index], d => d.population)])
              .range([0, SVG_WIDTH - DATA_WIDTH - LABEL_WIDTH-100])
          //绑定坐标轴比例尺
          axis.scale(scale);
          // 绘制坐标轴
          axis(gAxis)
          gAxis.selectAll("line")
              .attr("y2", -1000)
              .attr("stroke", "#000000")
  
          gAxis.selectAll("text")
          //排序
          let data = datawater[index].sort((a, b) => b.population - a.population);
          /**
           * 删除数据
           **/
          gBar.selectAll('g')
              .data(data, d => d.area)
              .exit()
              .remove()
          /**
           *添加数据
           **/
          let groupAppend = gBar.selectAll('g')
              .data(data, d => d.area)
              .enter()
              .append('g')
              .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
          groupAppend.append("rect")
              .attr("x", 0)
              .attr("y", RECT_SPACE)
              .attr("width", d => scale(d.population))
              .attr("height", RECT_WIDTH)
              .attr("fill", d => colorScale(d.area)); // 使用颜色比例尺
          groupAppend.append("text")
              .attr("x", d => scale(d.population) + LABEL_WIDTH-20)
              .attr("y", RECT_WIDTH / 2 + RECT_SPACE)
              .attr("dy", ".35em")
              .text(d => d.population)
              .attr("fill", d => colorScale(d.area));
          groupAppend.append("text")
              .attr("class", "name")
              .attr("font-weight", 600)
              .attr("fill", "#000000")
              .attr("x", 0)
              .attr("y", RECT_SPACE)
              .attr('text-anchor', "end")
              .attr("dy", ".35em")
              .text(d => d.area);
  
          /**
           * 数据更新
           **/
          let group = gBar.selectAll('g')
              .data(data, d => d.area)
              .transition()
              .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
          group.select("rect")
              .attr("width", d => scale(d.population))
              .attr("fill", d => colorScale(d.area));
          group.select("text")
              .attr("x", d => scale(d.population) + LABEL_WIDTH+10)
              .text(d => d.population);
          group.select(".name")
              .attr("x", d => scale(d.population) - LABEL_WIDTH)
              .text(d => d.area);
           index = index + 1;
          if (index === datawater.length ) {
              clearTimeout(interval);
          }
  }, INTERVAL_TIME)
}
let isPlaying = true;
startAnimation();
  const replayButton = d3.select("#mypopulation")
  .append("button")
  .text("Replay")
  .style("position", "absolute")
  .style("top", "1900px")
  .style("left", `${LEFT_WIDTH+100}px`)
  .on("click", function () {
     index = 0;
     startAnimation()
  })
const pauseButton = d3.select("#mypopulation")
  .append("button")
  .text("Pause")
  .style("position", "absolute")
  .style("top", "1900px")
  .style("left", `${LEFT_WIDTH + 200}px`) // 调整按钮位置
  .on("click", function () {
    if (isPlaying) {
      clearTimeout(interval); // 停止动画
      isPlaying = false; // 更新播放状态为false
  } else {
      // 继续动画
      startAnimation();
      isPlaying = true; // 更新播放状态为true
  }
  });
})
d3.csv(water, function(d) { {
  return {
    load: +d.waterload,
    time: d.time,
    area: d.area,
    population:+d.population,
    supply:+d.watersupply,
    chazhi:+d.chazhi
  };
}
}).then(function(data){
console.log(data)

let arr = [];
for (var i = 0; i < 19; i++) {
arr[i] = [];
}
console.log(arr); 
for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2004/1/1") {
          arr[0].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2005/1/1") {
          arr[1].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2006/1/1") {
          arr[2].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2007/1/1") {
          arr[3].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2008/1/1") {
          arr[4].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2009/1/1") {
          arr[5].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2010/1/1") {
          arr[6].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2011/1/1") {
          arr[7].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2012/1/1") {
          arr[8].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2013/1/1") {
          arr[9].push(data1)
      }
  } for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2014/1/1") {
          arr[10].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2015/1/1") {
          arr[11].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2016/1/1") {
          arr[12].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2017/1/1") {
          arr[13].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2018/1/1") {
          arr[14].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2019/1/1") {
          arr[15].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2020/1/1") {
          arr[16].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2021/1/1") {
          arr[17].push(data1)
      }
  }
  for (let i = 0; i < data.length; i++) {
    let data1 = data[i];
      if (data1.time=="2022/1/1") {
          arr[18].push(data1)
      }
  }
  let datawater = [];
for (let i = 0; i < arr.length; i++) {
    let data1 = arr[i];
       {
          datawater.push(data1)
      }
  }
console.log(arr)
console.log(datawater)
const SVG_WIDTH = 1400; //svg宽度
  const SVG_HEIGHT = 600; //svg高度
  const RECT_WIDTH = 30; //矩形宽度
  const RECT_SPACE = 10; //间隔
  const LABEL_WIDTH = 10; //标签宽度
  const DATA_WIDTH = 100; //标签宽度
  const LEFT_WIDTH = 50; //左边平移宽度
  const INTERVAL_TIME = 2000; //刷新间隔时间（毫秒）

  //创建SVG图像
  let svg = d3.select("#mychazhi")
      .append("svg")
      .attr('width', SVG_WIDTH)
      .attr('height', SVG_HEIGHT)

  // 坐标轴g
  let gAxis = svg.append("g")
      .attr("transform", `translate(${LEFT_WIDTH}, ${SVG_HEIGHT-20})`)
  let gBar = svg.append('g')
  let axis = d3.axisBottom()
  const customColorRange = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5', '#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39', '#e7ba52', '#e7cb94', '#843c39'];
  const colorScale = d3.scaleOrdinal()
  .domain(datawater.flatMap(data => data.map(d => d.area)))
  .range(customColorRange);

  let index = 0;
  let interval;
  function startAnimation() {
    // 启动动画
    interval = window.setInterval(() => {
      document.getElementById("time3").innerText = datawater[index][0].time;
          //比例尺
          let scale = d3.scaleLinear()
              .domain([0, d3.max(datawater[index], d => d.chazhi)])
              .range([0, SVG_WIDTH - DATA_WIDTH - LABEL_WIDTH-100])
          //绑定坐标轴比例尺
          axis.scale(scale);
          // 绘制坐标轴
          axis(gAxis)
          gAxis.selectAll("line")
              .attr("y2", -1000)
              .attr("stroke", "#000000")
  
          gAxis.selectAll("text")
          //排序
          let data = datawater[index].sort((a, b) => b.chazhi - a.chazhi);
          /**
           * 删除数据
           **/
          gBar.selectAll('g')
              .data(data, d => d.area)
              .exit()
              .remove()
          /**
           *添加数据
           **/
          let groupAppend = gBar.selectAll('g')
              .data(data, d => d.area)
              .enter()
              .append('g')
              .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
          groupAppend.append("rect")
              .attr("x", 0)
              .attr("y", RECT_SPACE)
              .attr("width", d => scale(d.chazhi))
              .attr("height", RECT_WIDTH)
              .attr("fill", d => colorScale(d.area)); // 使用颜色比例尺
          groupAppend.append("text")
              .attr("x", d => scale(d.population) + LABEL_WIDTH-20)
              .attr("y", RECT_WIDTH / 2 + RECT_SPACE)
              .attr("dy", ".35em")
              .text(d => d.chazhi)
              .attr("fill", d => colorScale(d.area));
          groupAppend.append("text")
              .attr("class", "name")
              .attr("font-weight", 600)
              .attr("fill", "#000000")
              .attr("x", 0)
              .attr("y", RECT_SPACE)
              .attr('text-anchor', "end")
              .attr("dy", ".35em")
              .text(d => d.area);
  
          /**
           * 数据更新
           **/
          let group = gBar.selectAll('g')
              .data(data, d => d.area)
              .transition()
              .attr("transform", (d, i) => `translate(${LEFT_WIDTH}, ${i * (RECT_WIDTH + RECT_SPACE)} )`)
          group.select("rect")
              .attr("width", d => scale(d.chazhi))
              .attr("fill", d => colorScale(d.area));
          group.select("text")
              .attr("x", d => scale(d.chazhi) + LABEL_WIDTH+10)
              .text(d => d.chazhi);
          group.select(".name")
              .attr("x", d => scale(d.chazhi) - LABEL_WIDTH)
              .text(d => d.area);
           index = index + 1;
          if (index === datawater.length ) {
              clearTimeout(interval);
          }
  }, INTERVAL_TIME)
}
let isPlaying = true;
startAnimation();
  const replayButton = d3.select("#mychazhi")
  .append("button")
  .text("Replay")
  .style("position", "absolute")
  .style("top", "1900px")
  .style("left", `${LEFT_WIDTH+100}px`)
  .on("click", function () {
     index = 0;
     startAnimation()
  })
const pauseButton = d3.select("#mychazhi")
  .append("button")
  .text("Pause")
  .style("position", "absolute")
  .style("top", "1900px")
  .style("left", `${LEFT_WIDTH + 200}px`) // 调整按钮位置
  .on("click", function () {
    if (isPlaying) {
      clearTimeout(interval); // 停止动画
      isPlaying = false; // 更新播放状态为false
  } else {
      // 继续动画
      startAnimation();
      isPlaying = true; // 更新播放状态为true
  }
  });
})
d3.select("#downbar").on("change", function() {
  d3.selectAll(".bar").style("display", "none");
  d3.selectAll(".bar1").style("display", "none");
  var selectedValue = d3.select(this).property("value");
  if (selectedValue === "myload") {
    d3.select("#myload").style("display", "block");
  } else if (selectedValue === "mysupply") {
    d3.select("#mysupply").style("display", "block");
  } else if (selectedValue === "mypopulation") {
    d3.select("#mypopulation").style("display", "block");
  }else if (selectedValue === "mychazhi") {
    d3.select("#mychazhi").style("display", "block");
  }
});


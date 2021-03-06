d3.csv('data/data.csv',function (data) {
// CSV section
  var body = d3.select("#vis-container")
  var selectData = [ { "text" : "Distance based on Physical Distance" },
                     { "text" : "Distance based on Estimated Time" },
                   ]

  // Select X-axis Variable
  // var span = body.append('span')
  //   .text('Select X-Axis variable: ')
  // var yInput = body.append('select')
  //     .attr('id','xSelect')
  //     .on('change',xChange)
  //   .selectAll('option')
  //     .data(selectData)
  //     .enter()
  //   .append('option')
  //     .attr('value', function (d) { return d.text })
  //     .text(function (d) { return d.text ;})
  // body.append('br')

  // Select Y-axis Variable
  var span = body.append('span')
      .text('Select MDS Distance Metric: ')
  var yInput = body.append('select')
      .attr('id','ySelect')
      .on('change',yChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text ;})
  body.append('br')

  // Variables
  var body = d3.select('body')
  var margin = { top: 100, right: 100, bottom: 100, left: 100 }
  var h = 750 - margin.top - margin.bottom
  var w = 850 - margin.left - margin.right

  var formatPercent = d3.format('.2%')
  // Scales
  // var colorScale = d3.scale.category20()
  var colorScale = d3.scaleOrdinal(d3.schemeCategory20);
  var xScale = d3.scaleLinear()
    .domain([
      d3.min([-1.5,d3.min(data,function (d) { return d['x_miles'] })]),
      d3.max([2.0,d3.max(data,function (d) { return d['x_miles'] })])
      ])
    .range([0,w])
  var yScale = d3.scaleLinear()
    .domain([
      d3.min([-1,d3.min(data,function (d) { return d['y_miles'] })]),
      d3.max([1.5,d3.max(data,function (d) { return d['y_miles'] })])
      ])
    .range([h,0])
  // SVG
  var svg = d3.select("#vis-container").append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
  

  // create and init. the tool-tip
  tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-15, -8])

  svg.call(tip)





  // // X-axis
  // var xAxis = d3.svg.axis()
  //   .scale(xScale)
  //   // .tickFormat(formatPercent)
  //   .ticks(5)
  //   .orient('bottom')
  // // Y-axis
  // var yAxis = d3.svg.axis()
  //   .scale(yScale)
  //   // .tickFormat(formatPercent)
  //   .ticks(5)
  //   .orient('left')

    // set the tool tip's html based on the hovered country
    tip.html(function(d) {
            return "<span style='color:#FFDB6D'>" + d['location'] + "</span>";
    })


  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d['x_miles']) })
      .attr('cy',function (d) { return yScale(d['y_miles']) })
      .attr('r','13')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return colorScale(i) })
      .attr('class', function(d) {
        if (d.location == "Harvard University") {
          return "cirlce harvard"
        } else {return "circle"}
      })
      .on('mouseover', function (d) {

        tip.show(d)
        // d3.select(this)
        //   .transition()
        //   .duration(500)
        //   .attr('r',20)
        //   .attr('stroke-width',3)
      })
      .on('mouseout', function () {

        tip.hide()
        // d3.select(this)
        //   .transition()
        //   .duration(500)
        //   .attr('r',10)
        //   .attr('stroke-width',1)
      })
    // .append('title') // Tooltip
    //   .text(function (d) { return d['location'] 
    //     // +
    //     //                    '\nReturn: ' + formatPercent(d['location']) +
    //     //                    '\nStd. Dev.: ' + formatPercent(d['location']) +
    //     //                    '\nMax Drawdown: ' + formatPercent(d['location']) 
    //                      }
    //                        )
  // X-axis
  // svg.append('g')
  //     .attr('class','axis')
  //     .attr('id','xAxis')
  //     .attr('transform', 'translate(0,' + h + ')')
  //     // .call(xAxis)
  //   .append('text') // X-axis Label
  //     .attr('id','xAxisLabel')
  //     .attr('y',-10)
  //     .attr('x',w)
  //     .attr('dy','.71em')
  //     .style('text-anchor','end')
  //     .text('x')
  // // Y-axis
  // svg.append('g')
  //     .attr('class','axis')
  //     .attr('id','yAxis')
  //     // .call(yAxis)
  //   .append('text') // y-axis Label
  //     .attr('id', 'yAxisLabel')
  //     .attr('transform','rotate(-90)')
  //     .attr('x',0)
  //     .attr('y',5)
  //     .attr('dy','.71em')
  //     .style('text-anchor','end')
  //     .text('y')


  // d3.select(".harvard")
  // .append("text")
  //       .attr("dx", function(d){return 20})
  //       .attr('fill','red')
  //       .text(function(d){return d.location})



    //     d3.select(".harvard").append("text")
    //     .text(function(d) {
    //   return d.location
    // })
    // .attr({
    //   "text-anchor": "middle",
    //   "font-size": function(d) {
    //     return 30;
    //   },
    //   "dy": function(d) {
    //     return 30;
    //   }
    // });

    var harvard_text = svg.append("text")
      .text(function(d) {
        return "Harvard University"
      })
      .attr('x',365)
      .attr('y',380)

    var closest_text = svg.append("text")
      .text(function(d) {
        return "Nubar"
      })
      .attr('x',265)
      .attr('y',340)


      // .append('text') // y-axis Label
      // .attr('id', 'harvard-annotation')
      // // .attr('transform','rotate(-90)')
      // // .attr('x',100)
      // // .attr('y',100)
      // // .attr('dy','.71em')
      // // .style('text-anchor','end')
      // .text('y')


      // set the tool tip's html based on the hovered country





    // tell each country to display the tool tip when mouseover and remove on mouseout
    // circles.on('mouseover', tip.show)
    //     .on('mouseout', tip.hide)



  function yChange() {
    var value = this.value // get the new y value



var x_type = ''
var y_type = ''

var harvard_text_x;
var harvard_text_y;
var closest_text_x;
var closest_text_y;
var closest_text_label;

    if (value == "Distance based on Estimated Time") {



      x_type = 'x_minutes'
      y_type = 'y_minutes'

      harvard_text_x = 312
      harvard_text_y = 206



            closest_text_x =320;
      closest_text_y = 143;
      closest_text_label = 'The Kirkland Tap & Trotter'


    } else {

      x_type = 'x_miles'
      y_type = 'y_miles'

      harvard_text_x = 365
      harvard_text_y = 353

      closest_text_x =265;
      closest_text_y = 315;
      closest_text_label = 'Nubar'

    }







    yScale // change the yScale
      .domain([
        d3.min([-1.2,d3.min(data,function (d) { return d[y_type] })]),
        d3.max([1.5,d3.max(data,function (d) { return d[y_type] })])
        ])
    // yAxis.scale(yScale) // change the yScale
    d3.select('#yAxis') // redraw the yAxis
      .transition().duration(1000)
      // .call(yAxis)
    d3.select('#yAxisLabel') // change the yAxisLabel
      .text(value)    
    d3.selectAll('circle') // move the circles
      .transition().duration(1000)
      .delay(function (d,i) { return i*100})
        .attr('cy',function (d) { return yScale(d[y_type]) })
        .attr('cx',function (d) { return xScale(d[x_type]) })



    // xScale // change the xScale
    //   .domain([
    //     d3.min([-1.2,d3.min(data,function (d) { return d[x_type] })]),
    //     d3.max([2.0,d3.max(data,function (d) { return d[x_type] })])
    //     ])
    // xAxis.scale(xScale) // change the xScale
    // d3.select('#xAxis') // redraw the xAxis
    //   .transition().duration(1000)
    //   .call(xAxis)
    // d3.select('#xAxisLabel') // change the xAxisLabel
    //   .transition().duration(1000)
    //   .text(value)
    // d3.selectAll('circle') // move the circles
    //   .transition().duration(1000)
    //   .delay(function (d,i) { return i*100})
    //     .attr('cx',function (d) { return xScale(d[x_type]) })



    harvard_text
      .transition()
      .duration(1000)
      .attr('x',harvard_text_x)
      .attr('y',harvard_text_y)


    closest_text
    .style("opacity", 0.0)
      .transition()
      .duration(3000)
      .attr('x',closest_text_x)
      .attr('y',closest_text_y)
      .text(closest_text_label)
      .style("opacity", 1.0)
  }

  // function xChange() {
  //   var value = this.value // get the new x value
  //   xScale // change the xScale
  //     .domain([
  //       d3.min([-2,d3.min(data,function (d) { return d['x_minutes'] })]),
  //       d3.max([0,d3.max(data,function (d) { return d['x_minutes'] })])
  //       ])
  //   xAxis.scale(xScale) // change the xScale
  //   d3.select('#xAxis') // redraw the xAxis
  //     .transition().duration(1000)
  //     .call(xAxis)
  //   d3.select('#xAxisLabel') // change the xAxisLabel
  //     .transition().duration(1000)
  //     .text(value)
  //   d3.selectAll('circle') // move the circles
  //     .transition().duration(1000)
  //     .delay(function (d,i) { return i*100})
  //       .attr('cx',function (d) { return xScale(d['x_minutes']) })
  // }



























})
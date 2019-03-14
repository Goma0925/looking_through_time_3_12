var dataP = d3.json("gradeData.json");

dataP.then(function(data)
{
    console.log("data",data)
    drawChart(data,"#graph",1);
},
function(err){
  console.log(err);
});


  var drawChart = function(data,svgSelector,day)
{
  //Draw a barchart using the specified day's info
  var screen = {
  width:500,
  height:400
  };

  var margins = {
    top:20,
    bottom: 10,
    left: 20,
    right: 100
  }

  var selectedDay = data[day-1];
  var selectedPeople = selectedDay.grades;
  console.log("-----------------------");
  console.log("Day:", day);
  console.log("Data:", selectedDay);


  var graphWidth  = screen.width - margins.left - margins.right;
  var graphHeight = screen.height - margins.top - margins.bottom;
  var legendLineWidth = 10;
  var legendLineHeight = 10;
  var legendLineMargin = 5;
  var legendColorBarWidth = 30;
  var borderWidth = 1;

  var yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([margins.top, graphHeight])

  var colorScale = d3.scaleOrdinal(d3.schemeAccent);

  var barWidth = (graphWidth - (graphWidth/8)) /selectedPeople.length;
  var graphSVG = d3.select(svgSelector)
              .attr("width", screen.width)
              .attr("height", screen.height);

  graphBorder = d3.select(svgSelector)
                    .append("rect")
                    .attr("border-style", "solid")
                    .attr("x", margins.left)
                    .attr("y", margins.top)
                    .attr("width", graphWidth)
                    .attr("height", graphHeight)
                    .attr("fill", "white")
                    .style("stroke", "black")
                    .style("stroke-width", borderWidth)
                    .classed("graph-border", true);

  graphData = d3.select(svgSelector)
                    .append("g")
                    .classed("graph-data", true);


  console.log("content", graphData);

  graphData.selectAll("rect")
       .data(selectedPeople)
       .enter()
       .append("rect")
       .attr("fill", "blue")
       .attr("width", barWidth)
       .attr("height", function(person){
                        console.log(person.name + "'s grade:" + person.grade);
                        return person.grade})
       .attr("x", function(d,i)
       { return margins.left + i*barWidth + (graphWidth/16);})//adjusting the center of bar
       .attr("y", function(person){
                        return graphHeight + margins.top- person.grade - 1})
      .attr("fill", function(person){return colorScale(person.name)})
      .style("stroke", "white")
      .style("stroke-width", 2)

  legend = d3.select(svgSelector)
              .append("g")
              .attr("font-size", 15)
              .attr("transform", "translate(" + (graphWidth + margins.left + 10)
                                              + ",0)")
              .classed("legend", true);

  console.log("Width", legendColorBarWidth);
  legendLines = legend.selectAll("g")
                      .data(selectedPeople, function(d){console.log("Data;", d); return d;})
                      .enter()
                      .append("g")
                      .classed("legend-line", true);

  legendLines.append("rect")
              .attr("x", 0)
              .attr("y", function(person, i){return i*legendLineHeight + i*legendLineMargin + 30})
              .attr("width", legendColorBarWidth)
              .attr("height", legendLineHeight)
              .attr("fill", function(person){console.log("Working;", person);return colorScale(person.name)})

  legendLines.append("text")
            .text(function(person){return person.name;})
            .attr("x", legendColorBarWidth + 5)
            .attr("y", function(person, i){return i*legendLineHeight + i*legendLineMargin + 38})
            .attr("font-size", legendLineHeight)


}

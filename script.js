var dataP = d3.json("gradeData.json");

//Graph settings
var screenSettings = {
width:500,
height:400
};

var marginSettings = {
  top:20,
  bottom: 10,
  left: 20,
  right: 100
}

//Function settings
  var drawChart = function(data,svgSelector,day, screen, margins)
{

  //Draw a barchart using the specified day's info

  var selectedDay = data[day-1];
  var selectedPeople = selectedDay.grades;
  console.log("-----------------------");
  console.log("Day:", day);
  console.log("Data:", selectedDay);

  var graphWidth  = screen.width - margins.left - margins.right;
  var graphHeight = screen.height - margins.top - margins.bottom;
  var legendLineWidth = 10;
  var legendLineHeight = 15;
  var legendLineMargin = 5;
  var legendColorBarWidth = 30;
  var borderWidth = 1;

  var yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([margins.bottom, graphHeight - 15])


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

  graphBars =graphData.selectAll("rect")
                       .data(selectedPeople)
                       .enter()
                       .append("rect")
                       .attr("width", barWidth)
                       .attr("height", function(person){
                                        console.log(person.name + "'s grade:" + person.grade);
                                        return yScale(person.grade)})
                       .attr("x", function(d,i)
                       { return margins.left + i*barWidth + (graphWidth/16);})//adjusting the center of bar
                       .attr("y", function(person){
                                        return graphHeight + margins.top- yScale(person.grade) - 2})
                      .attr("fill", function(person){return colorScale(person.name)})
                      .style("stroke", "#EBFCFB")
                      .style("stroke-width", 2)
                      .classed("data-bar", true);

  graphText = graphData.selectAll("text")
                       .data(selectedPeople)
                       .enter()
                       .append("text")
                       .attr("height", function(person){
                                        console.log(person.name + "'s grade:" + person.grade);
                                        return person.grade})
                       .attr("x", function(d,i)
                       { return margins.left + i*barWidth + (graphWidth/16) + (barWidth/2);})//adjusting the center of bar
                       .attr("y", function(person){
                                        return graphHeight + margins.top- yScale(person.grade) - 1})
                      .text(function(person){return person.grade});

  legend = d3.select(svgSelector)
              .append("g")
              .attr("font-size", 15)
              .attr("transform", "translate(" + (graphWidth + margins.left + 10)
                                              + ",0)")
              .classed("legend", true);

  legendLines = legend.selectAll("g")
                      .data(selectedPeople)
                      .enter()
                      .append("g")
                      .classed("legend-line", true);

  legendLines.append("rect")
              .attr("x", 0)
              .attr("y", function(person, i){return i*legendLineHeight + i*legendLineMargin + 30})
              .attr("width", legendColorBarWidth)
              .attr("height", legendLineHeight)
              .attr("fill", function(person){return colorScale(person.name)})

  legendLines.append("text")
            .text(function(person){return person.name;})
            .attr("x", legendColorBarWidth + 5)
            .attr("y", function(person, i){return i*legendLineHeight + i*legendLineMargin + 38})
            .attr("font-size", legendLineHeight)

}

//Event listener functions defined here
var updateChart = function(data,svgSelector,day, screen, margins){
  var selectedDay = data[day-1];
  var selectedPeople = selectedDay.grades;
  console.log("-----------------------");
  console.log("Day:", day);
  console.log("Data:", selectedDay);

  //organize below----------
  var yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([margins.bottom, graphHeight - 15])

  var graphWidth  = screen.width - margins.left - margins.right;
  var graphHeight = screen.height - margins.top - margins.bottom;
  var legendLineWidth = 10;
  var legendLineHeight = 10;
  var legendLineMargin = 5;
  var legendColorBarWidth = 30;
  var borderWidth = 1;

  var colorScale = d3.scaleOrdinal(d3.schemeAccent);

  var barWidth = (graphWidth - (graphWidth/8)) /selectedPeople.length;
  //----------Organize above

  graphData = d3.select(svgSelector)


  graphBars = graphData.selectAll(".data-bar")
                       .data(selectedPeople)
                       .transition()
                       .duration(1500)
                       .attr("width", barWidth)
                       .attr("height", function(person){
                                        console.log(person.name + "'s grade:" + person.grade);
                                        return yScale(person.grade)})
                       .attr("x", function(d,i)
                       { return margins.left + i*barWidth + (graphWidth/16);})//adjusting the center of bar
                       .attr("y", function(person){
                                        return graphHeight + margins.top- yScale(person.grade) - 2})
                      .attr("fill", function(person){return colorScale(person.name)})
                      .style("stroke", "#EBFCFB")
                      .style("stroke-width", 2)
                      .classed("data-bar", true);

  graphText = graphData.selectAll("text")
                       .data(selectedPeople)
                       .transition()
                       .duration(1500)
                       .attr("height", function(person){
                                        console.log(person.name + "'s grade:" + person.grade);
                                        return person.grade})
                       .attr("x", function(d,i)
                       { return margins.left + i*barWidth + (graphWidth/16) + (barWidth/2);})//adjusting the center of bar
                       .attr("y", function(person){
                                        return graphHeight + margins.top- person.grade - 1})
                      .text(function(person){return person.grade});


}

var updateDay = function(flag, minDay, maxDay){
  var dayString = document.getElementById("day").innerText;
  if (flag == "next")
  {
    if (parseInt(dayString) < maxDay)
    {
      dayString = parseInt(dayString) + 1;
      document.getElementById("day").innerText = dayString;
    }
  }
  else if (flag == "prev")
  {
    if (parseInt(dayString) > minDay)
    {
      dayString = parseInt(dayString) - 1;
      document.getElementById("day").innerText = dayString;
    }
  }

  return parseInt(dayString);
}

//Event handlers defined here
var initEventListeners = function(){

  //next botton
  d3.select("#next")
    .on("click", function(d){
      console.log("Next button clicked");
      dataP.then(function(data)
      {
          var day = updateDay("next", 1, 10);
          updateChart(data,"#graph", day, screenSettings, marginSettings);
      });
    });

  //Previous button
    d3.select("#prev")
      .on("click", function(d){
        console.log("Prev button clicked");
        dataP.then(function(data)
        {
            var day = updateDay("prev", 1, 10);
            updateChart(data,"#graph", day, screenSettings, marginSettings);
        });
      });
//--------------------
}

//Main process
var initGraph = function(){
  dataP.then(function(data)
  {
      drawChart(data,"#graph",3, screenSettings, marginSettings);
      initEventListeners();
  });
}
initGraph();

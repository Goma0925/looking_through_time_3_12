var dataP = d3.json("gradeData.json");

dataP.then(function(data)
{
    console.log("data",data)
    drawChart(data)
  },
  function(err){
    console.log(err);
  });

  var drawGraph = function(data,width,height,idName){

  var svg = d3.select(idName)
              .attr("width",width)
              .attr("height",height);

  var margins = {
    top:20,
    bottom: 20,
    left: 20,
    right: 20
  }

  var drawChart = function(data, idname)
{
  var width = 400;
  var height = 200;
  var barWidth = width/data.length;
  var svg = d3.select(idname)
              .attr("height", height)
              .attr("width", width);
  svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d,i)
      { return i*barWidth;})
    .attr("y", function (d)
      { return height - d.grade*20;})
    .attr("width", barWidth)
    .attr("height", function(d)
      { return d.grade*20;})
    .attr("fill", function(d)
      { return "blue";})
}

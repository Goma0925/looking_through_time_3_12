var dataP = d3.json("gradeData.json");

dataP.then(function(data)
{
    console.log("data",data)
    drawChart(data,"#graph",1);
},
function(err){
  console.log(err);
});

  var margins = {
    top:20,
    bottom: 20,
    left: 20,
    right: 20
  }

  var drawChart = function(data,idname,day)
{
  var width = 400;
  var height = 200;
  var barWidth = width/data.length;
  var svg = d3.select(idname)
              .attr("height", height)
              .attr("width", width);
  svg.selectAll("rect")
     .data(data, function(d) {return d.grades[day];})
     .enter()
     .append("rect")
     .attr("x", function(d,i)
     { return i*barWidth;})
     .attr("y",function(d)
     { console.log("in function", d)
       return height - d.grade;})
}

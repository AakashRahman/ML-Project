// console.log(data);

// console.log(nfl_data.slice(1));

function m3(data){
    // creates list for storing values
    dict1 = []    
    frst_split = data.split("}");    
    frst_split.forEach(function(string) {
        sec_split = string.split(",");
        var dict2 = {}
        sec_split.forEach(function(y){
            thd_split = y.split(":")

            if ((thd_split[0] === "") || (thd_split[0].includes("id") === true)){
              return true;
            }
            else if (isNaN(thd_split[1]) === false){
                thd_split[1] =  parseInt(thd_split[1], 10)
            }
            else if (thd_split[1] !== undefined) {
            thd_split[1] = thd_split[1].trim();
            thd_split[1] = thd_split[1].substring(1);
            thd_split[1]= thd_split[1].substring(0, thd_split[1].length - 1);
            }
            
            
            key1 = thd_split[0].trim();
            key1 = key1.substring(1);
            key1 = key1.substring(0, key1.length - 1);
            if (key1.includes("years")) {
              key1 = "years"
            }
            dict2[key1] = thd_split[1];
        })
        dict1.push(dict2) 
    })
    return dict1    
    }
    
    off_data = m3(off);
    def_data = m3(def);
    misc_data = m3(misc);
    // var year = nfl_data.map(x => x.years);
    console.log(off_data);
    console.log(def_data);
    console.log(misc_data);
    console.log("hi");

//My name is Betty.  I am a great magician.  Your sock is blue.  Your sock is green.  Yessssssss
//Greensock tests
//TweenMax.to('.logo', 1, {scale:0})

off_data_x = off_data.filter(function(d){ return d.years === 2019 })
console.log(off_data_x)

test = off_data_x.map(d => d.abbreviation);
test1 = off_data_x.map(d => d.yards); 

// set the dimensions and margins of the graph
var margin = {top: 100, right: 0, bottom: 100, left: 0},
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

 function poop(data, id) {

  // resets the bar chart 
  svg.html("");

  // Scales
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(function(d) { return d.abbreviation; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 6904]); // Domain of Y is from 0 to the max seen in the data
  
  var div = d3.select("body").append("div")
      .attr("class", "tooltip-donut")
      .style("opacity", 0)
  
  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d[id]); })
          .startAngle(function(d) { return x(d.abbreviation); })
          .endAngle(function(d) { return x(d.abbreviation) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.abbreviation) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.abbreviation) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d[id])+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.abbreviation + ` : ${d[id]}`)})
        .attr("transform", function(d) { return (x(d.abbreviation) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")
};

//poop(off_data_x, 'yards')

function getDemoInfo() {
  
  var demographicInfo = d3.select("#sample-metadata");

}

//dropdown function
function optionChanged(id) {
  poop(off_data_x, id);
}

// create the function for the initial data rendering
function init(data) {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

      // get the id data to the dropdwown menu
      // for (i=2; i < Object.keys(data[0]).length; i++) {
      //   dropdown.append("option").text( Object.keys(data)[0][i]).property("value");
      // }
      var yards = ['yards', 'rush_yards', 'pass_yards']
      yards.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
      poop(data, 'yards');
}

init(off_data_x);
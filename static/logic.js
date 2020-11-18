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
        if (isNaN(thd_split[1]) === false){
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

//Nest function performs a group by on the data and gives us the mean for each year
// first is passing yards
var off_data_moe = d3.nest()
  .key(function(d) { return d.years; })
  .rollup(function(v) {return d3.mean(v, function(d) {return d.pass_yards; }); })
  .entries(off_data);

console.log(JSON.stringify(off_data_moe));

var y = off_data_moe.map(x => x.value)
var x = off_data_moe.map(x => x.key)

//passing yards scatter
var trace1 = {
    x: x,
    y: y,
    type: "scatter"
  };

var data1 = [trace1];
Plotly.newPlot("plot", data1);
//Second is passing touchdowns
var off_data_joe = d3.nest()
  .key(function(d) { return d.years; })
  .rollup(function(v) {return d3.mean(v, function(d) {return d.pass_touchdowns; }); })
  .entries(off_data);

console.log(JSON.stringify(off_data_joe));

var y1 = off_data_joe.map(x => x.value)
var x1 = off_data_joe.map(x => x.key)

//Passing touchdowns scatter
var trace2 = {
    x: x1,
    y: y1,
    type: "scatter"
  };

var data2 = [trace2];
Plotly.newPlot("plot1", data2);

//third is total yards
var off_data_doe = d3.nest()
  .key(function(d) { return d.years; })
  .rollup(function(v) {return d3.mean(v, function(d) {return d.yards; }); })
  .entries(off_data);

console.log(JSON.stringify(off_data_doe));

var y2 = off_data_doe.map(x => x.value)
var x2 = off_data_doe.map(x => x.key)

//yards scatter
var trace3 = {
    x: x2,
    y: y2,
    type: "scatter"
  };

var data3 = [trace3];
Plotly.newPlot("plot2", data3);

//fourth is rushing yards
var off_data_boe = d3.nest()
  .key(function(d) { return d.years; })
  .rollup(function(v) {return d3.mean(v, function(d) {return d.rush_yards; }); })
  .entries(off_data);

console.log(JSON.stringify(off_data_boe));

var y3 = off_data_boe.map(x => x.value)
var x3 = off_data_boe.map(x => x.key)

//rushing yards scatter
var trace4 = {
    x: x3,
    y: y3,
    type: "scatter"
  };

var data4 = [trace4];
Plotly.newPlot("plot3", data4);


// @TODO: YOUR CODE HERE!
//Step 1: Set up the chart
var svgWidth = 800;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
d3.csv("data.csv").then(function(stateData) {

    // Step 4: Parse the data
    // Format the data and convert to numerical values

    stateData.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    // Step 5: Create the scales for the chart

    var xMin = d3.min(stateData, d => d.healthcare);
    var xMax = d3.max(stateData, d => d.healthcare);
    var yMin = d3.min(stateData, d => d.poverty);
    var yMax = d3.max(stateData, d => d.poverty);

    var xLinearScale = d3.scaleLinear()
        .domain([xMin - 1, xMax + 1])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([yMin - 1, yMax + 1])
        .range([height, 0]);

    // Step 6: Create the axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 7: Append the axes to the chartGroup
    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);

    // Add circles
    var circles = chartGroup.append("g")
        .selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
            .attr("cx", function(d) {
                return xLinearScale(d.healthcare);
            })
            .attr("cy", function(d) {
                return yLinearScale(d.poverty);
            })
            .attr("r", 8)
            .style("fill", "#69b3a2")

    // Append axes titles
    chartGroup.append("text")
        .attr("transform", `translate(${(width / 2)-70}, ${height + margin.top + 20})`)
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(-35, ${(height / 2)+50}), rotate(-90)`)
        .text("In Poverty (%)");
   
    
    // Add circle labels
    // circles.selectAll("text")
    //     .data(stateData)
    //     .enter()
    //     .append("text")
    //         .attr("x", function(d) {
    //             return xLinearScale(d.healthcare);
    //         })
    //         .attr("y", function(d) {
    //             return yLinearScale(d.poverty);
    //         })
    //     .text((d) => d.abbr);
    
});
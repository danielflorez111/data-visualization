function cleanCanvas(element) {
    d3.select(element).html(null);
}

function createCircleRed(ele) {
    cleanCanvas(ele);
    d3.select(ele)
        .append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .append("circle")
        .attr("cx", 200)
        .attr("cy", 200)
        .attr("r", 20)
        .style("fill", "red");
}

function createCircleBlue(ele) {
    cleanCanvas(ele);
    d3.select(ele)
        .append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("r", 50)
        .style("fill", "blue");
}

function doStep(step) {
    switch (step) {
        case 'red':
            createCircleRed(this);
            break;
        case 'blue':
            createCircleBlue(this);
            break;
        default:
            break;
    }
}
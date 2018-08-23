function cleanCanvas(element) {
    d3.select(element).html(null);
}

Reveal.addEventListener('slide1', () => {
    console.log('Slide 1');
    cleanCanvas('#slide1container');
    d3.select('#slide1container')
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 30)
        .style("fill", "purple");
});

Reveal.addEventListener('slide2', () => {
    console.log('Slide 2');
    cleanCanvas('#slide2container');
    d3.select('#slide2container')
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 30)
        .style("fill", "red");
});

Reveal.addEventListener('slide3', () => {
    console.log('Slide 3');
});
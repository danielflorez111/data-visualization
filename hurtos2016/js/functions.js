let promise_deptos = new Promise((resolve, reject) => {
    d3.csv("/data/departamentos.csv", function (data) {
        resolve(data);
    });
});

function cleanCanvas(element) {
    d3.select(element).html(null);
}

function createBubleChart(data, element) {
    cleanCanvas(element);
    dataset = {
        "children": data
    };

    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select(element)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble")
        .attr("class", "deptos");

    // var tooltip = d3.select("body")
    //     .append("div")
    //     .style("position", "absolute")
    //     .style("z-index", "10")
    //     .style("visibility", "hidden");
    // // .text("a simple tooltip");

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "12px sans-serif")

    var nodes = d3.hierarchy(dataset)
        .sum(function (d) {
            return d.Poblacion;
        });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.Departamento;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            return color(i);
        })
        .style('pointer-events', 'all');


    node.selectAll('circle')
        .on("mouseover", function (d) {
            tooltip.text(d.data.Conteo);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    // .on("mouseover", (d) => {
    //     tooltip.text(d.Conteo)
    //         .transition()
    //         .duration(1000)
    //         .attr("x", d.x)
    //         .attr("y", d.y - 20);        

    //     console.log("clicked!", d);
    //   });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Departamento.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    // node.append("text")
    //     .attr("dy", "1.3em")
    //     .style("text-anchor", "middle")
    //     .text(function (d) {
    //         return d.data.Conteo;
    //     })
    //     .attr("font-family", "Gill Sans", "Gill Sans MT")
    //     .attr("font-size", function (d) {
    //         return d.r / 5;
    //     })
    //     .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");

    //prueba(svg);
}

function createBubleChartIntensity(data, element){
    var svg = d3.select(".deptos");
    var nodes = svg.selectAll(".node");

    nodes.style("fill", function (d, i) {
        console.log(d);
        if (d.data.Proporcion <= 0.25) {
            return 'green';
        } else {
            return 'red'
        }
    })
}

function doStep(step) {
    switch (step) {
        case '1':
            promise_deptos.then((dataset) => {
                createBubleChart(dataset, this);
            });
            break;
        case '2':
            promise_deptos.then((dataset) => {
                createBubleChartIntensity(dataset, this);
            });
            break;
        default:
            break;
    }
}




var dataset_deptos;

let promise_deptos = new Promise((resolve, reject) => {
    d3.csv("/data/departamentos.csv", function (data) {
        dataset_deptos = data;
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

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif")

    var nodes = d3.hierarchy(dataset)
        .sum(function (d) {
            return d.Conteo;
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
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');


    node.selectAll('circle')
        .on("mouseover", function (d) {
            tooltip.text(`${d.data.Departamento}: ${d.data.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

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

    d3.select(self.frameElement)
        .style("height", diameter + "px");
}

function createBubleChartIntensity(data, element) {
    cleanCanvas(element);
    dataset = {
        "children": data
    };

    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select(element)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble")
        .attr("class", "intensity");

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif")

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
            if (d.data.Proporcion <= 0.25) {
                return '#40CC5C';
            } else {
                return '#F22400'
            }
        })
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');


    node.selectAll('circle')
        .on("mouseover", function (d) {
            tooltip.text(`${d.data.Departamento}: ${d.data.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

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

    d3.select(self.frameElement)
        .style("height", diameter + "px");
}

function createScatterPlot(data, element) {
    console.log(data);
    cleanCanvas(element);

    let diameter = 600,
        svg = d3.select(element)
                .append("svg")
                .attr("width", diameter)
                .attr("height", diameter),
        margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        color = d3.scaleOrdinal(d3.schemeCategory20);

    g.append("g")
        .attr("class", "x axis")
        .style("color", "white");

    g.append("g")
        .attr("class", "y axis")
        .style("color", "white");

    let x = d3.scaleLinear()
        .range([0, width]);

    let y = d3.scaleLinear()
        .range([height, 0]);

    x.domain([0, d3.max(data, d => d.Poblacion)]);
    y.domain([0, d3.max(data, d => d.Conteo)]);

    let points = g.selectAll(".point")
        .data(data); //update

    console.log(points);

    pointsEnter = points
        .enter()
        .append("circle")
        .attr("class", "point")
        .style("fill", function (d, i) {
            console.log(d);
            return color(i);
        });

    points.merge(pointsEnter) //Enter + Update
        .attr("cx", d => x(d.Poblacion))
        .attr("cy", d => y(d.Conteo))
        .attr("r", 3.5);

    points.exit()
        .remove();

    g.select(".x.axis")
        .call(d3.axisBottom(x))
        .attr("transform",
            "translate(0, " + height + ")");

    g.select(".y.axis")
        .call(d3.axisLeft(y));
}

function doStep(step) {
    d3.selectAll('.tooltip').remove();
    switch (step) {
        case '1':
            promise_deptos.then((dataset) => {
                createBubleChart(dataset, this);
            });
            break;
        case '2':
            createBubleChartIntensity(dataset_deptos, this);
            break;
        case '3':
            createScatterPlot(dataset_deptos, this);
            break;
        default:
            break;
    }
}
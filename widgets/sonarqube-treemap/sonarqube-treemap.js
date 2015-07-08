widget = {
    onData: function(el, data) {
        var content = $(".content", el).empty()[0];

        var width = $(el).parent().width(),
            height = $(el).parent().height() - $("h2", el).outerHeight(true);

        var color = d3.scale.linear()
            .domain([0, 25, 50, 75, 100])
            .range(["#ee0000", "#f77700", "#ffee00", "#80cc00", "#00aa00"]);

        var svg = d3.select(content)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var treemap = d3.layout.treemap()
            .size([width, height])
            .sort(function (a, b) { return a.value - b.value; })
            .nodes(data);

        var cells = svg.selectAll(".cell")
            .data(treemap)
            .enter()
            .append("g")
            .attr("class", "cell");

        cells.append("rect")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.dx; })
            .attr("height", function (d) { return d.dy; })
            .attr("fill", function (d) { return color(d.coverage); })
            .attr("stroke", "#fff");

        var title = cells.append("svg:title");
        title.append("tspan").text(function (d) {
                return d.children ? null : d.name;
            });

        title.append("tspan").text(function (d) {
                return d.children ? null
                    : "\nLines of code: " + d.value;
            });

        title.append("tspan").text(function (d) {
                return d.children ? null
                    : "\nCoverage: " + d.coverage + "%";
        });

        var body = cells.append("foreignObject")
            .attr("class", "foreignObject")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.dx; })
            .attr("height", function (d) { return d.dy; })
            .append("xhtml:body")
            .attr("class", "labelbody");

        body.append("div")
            .attr("class", "label")
            .text(function (d) {
                return d.children ? null : d.name;
            });

        body.append("div")
            .attr("class", "label")
            .text(function(d) {
                return d.children ? null
                    : + Math.floor(d.coverage) + "%";
            });
    }
};

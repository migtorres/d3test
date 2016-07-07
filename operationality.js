//data = d3.json("lib/visualisations/data/service_status.json")
function draw(data){
        d3.select("body")
          .append("ul")
          .data(data)
          .enter()
          .append("li")
            .text(function (d) {
                return d.name + ": " + d.status;
            });
        
        d3.selectAll("li")
          	.style("font-weight", function(d){
          		if (d.status == 'GOOD SERVICE'){
          			return 'normal'
          		} else {
          			return 'bold'
          		}
          	});
        }

d3.json('lib/visualisations/data/service_status.json', draw);
function draw(data){
	d3.select("body")
	.append("div")
		.attr("class","chart")
	.selectAll("div.line")
	.data(data.cash)
	.enter()
	.append("div")
		.attr("class","line");

	d3.selectAll("div.line")
	  .append("div")
	  	.attr("class","label")
	  	.text(function(d){ return d.name});

	d3.selectAll("div.line")
	  .append("div")
	  	.attr("class","bar")
	  	.style("width",function(d){ return d.count/100 + "px"})
	  	.text(function(d){ return Math.round(d.count)});

}

d3.json('lib/visualisations/data/plaza_traffic.json', draw);
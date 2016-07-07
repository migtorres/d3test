var time_scale,
percent_scale;


function draw_timeseries(data,id){
	var line = d3.svg.line()
		.x(function(d){
			return time_scale(d.time)
		})
		.y(function(d){
			return percent_scale(d.late_percent)
		})
		.interpolate("linear")

	var g = d3.select("#chart")
		.append("g")
		.attr("id", id+"_path")
		.attr("class",id.split("_")[1]);

	g.append("path")
		.attr("d",line(data));
}

function get_timeseries_data(){
	var id = d3.select(this).attr("id")
	var ts = d3.select("#"+id+"_path");
	if (ts.empty()){
		d3.json('lib/visualisations/data/subway_wait.json', function(data){
			filtered_data = data.filter(function(d){
				return d.line_id === id
			});
			draw_timeseries(filtered_data, id);
		});
	} else {
		ts.remove();
	}

}



function draw(data){
	var container_dimensions = {width: 900, height: 400},
	margins = {top: 10, right:20, bottom: 30, left: 60},
	chart_dimensions = {
		width: container_dimensions.width - margins.left - margins.right,
		height: container_dimensions.height - margins.top - margins.bottom
	};

	var chart = d3.select("#timeseries")
		.append("svg")
			.attr("width", container_dimensions.width)
			.attr("height", container_dimensions.height)
		.append("g")
			.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
			.attr("id","chart")

	time_scale = d3.time.scale()
		.range([0,chart_dimensions.width])
		.domain([new Date(2008,0,1), new Date(2011,3,1)]);

	percent_scale = d3.scale.linear()
		.range([chart_dimensions.height, 0])
		.domain([65,90]);

	var time_axis = d3.svg.axis()
		.scale(time_scale);

	var count_axis = d3.svg.axis()
		.scale(percent_scale)
		.orient("left");

	chart.append("g")
		.attr("class","x axis")
		.attr("transform","translate(0,"+chart_dimensions.height+")")
		.call(time_axis);

	chart.append("g")
		.attr("class","y axis")
		.call(count_axis)

	d3.select(".y.axis")
		.append("text")
			.attr("text_anchor","middle")
			.text("percent on time")
			.attr("transform","rotate(-270,0,0)")
			.attr("x",container_dimensions.height/2)
			.attr("y",50);

	var key_items = d3.select("#key")
		.selectAll("div")
		.data(data)
		.enter()
		.append("div")
			.attr("class","key_line")
			.attr("id",function(d){ return d.line_id});

	key_items.append("div")
		.attr("id", function(d){return  "key_square_"+ d.line_id})
		.attr("class","key_square");

	key_items.append("div")
		.attr("class","key_label")
		.text(function(d){return d.line_name});

	d3.selectAll(".key_line")
		.on("click", get_timeseries_data);

}

d3.json('lib/visualisations/data/subway_wait_mean.json', draw);
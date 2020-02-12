// constant values
const w = 1000;
const h = 500;
const padding = 50;
const color = {
	'Doping allegations': 'red',
	'No doping allegation': 'green',
	'domain': [1]
};

// create the svg caneva
const svgScatterplotGraph = d3.select('#scatterplotGraph')
	.append('svg')
	.attr('width', w)
	.attr('height', h)


// constant tooltip
const tooltipScatterplotGraph = d3.select('#scatterplotGraph')
	.append('div')
	.attr('class', 'tooltip')
		
// renderScatterplotGraph method
const renderScatterplotGraph = (data) => {

	// xScale
	const xScale = d3.scaleLinear()
		.domain([d3.min(data, (d) => d.Year) - 1, d3.max(data, (d) => d.Year) + 1])
		.range([padding, w - padding]);

	// convert the string Time into a decimal number
	function convert(time)
	{
		let sec = Math.floor(parseInt(time[3] + time[4]) / 60 * 100);
		return (parseFloat(time[0] + time[1] + '.' + sec.toString()));
	}

	//yScale
	const yScale = d3.scaleLinear()
		.domain([d3.min(data, (d) => convert(d.Time)) - 0.3, d3.max(data, (d) => convert(d.Time)) + 0.3])
		.range([padding, h - padding]);

	// renderScatterplotGraph the dot  
	svgScatterplotGraph.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', (d) => xScale(d.Year))
		.attr('cy', (d) => yScale(convert(d.Time)))
		.attr('r', 5)
		.attr('class', 'dot')
		.attr('data-xvalue', d => d.Time)
		.attr('data-yvalue', d => d.Year)
		.attr('fill', (d) => {
			if(d.Doping)
				return(color['Doping allegations'])
			else
				return(color['No doping allegation'])
		})
		.attr('data-legend', (d) => {
			d.Doping
		})
		.on('mousemove', function(d) {
			tooltipScatterplotGraph
				.style('display', 'inline-block')
				.style('top', d3.event.pageY + -25 + 'px')
				.style('left', xScale(d.Year) <= 700 ? d3.event.pageX + 25 + 'px': d3.event.pageX + -165 + 'px')
				.attr('data-year', d.Time)
				.html((d.Name + ': ' + d.Nationality + "<br/>Year: " + d.Year + ", Time: " + d.Time + "<br /><br />" + d.Doping))
		})
		.on('mouseout', function(d) {
			tooltipScatterplotGraph.style('display', 'none')
		})
	var x_axis = d3.axisBottom()
		.scale(xScale).tickFormat(d3.format("d"))
	//Append group and insert xAxis
	svgScatterplotGraph.append("g")
		.attr("transform", "translate(0, " + (h - padding)  +")")     
		.attr('id', 'x-axis')

		.call(x_axis);

	var y_axis = d3.axisLeft()
		.scale(yScale);

	//Append group and insert xAxis
	svgScatterplotGraph.append("g")
		.attr("transform", "translate(" + padding + ", 0)")     
		.attr('id', 'y-axis')
		.call(y_axis);

	//Append a legend  
	var legend = svgScatterplotGraph.selectAll('.legend')
		.data(color.domain)
		.enter()
		.append('g')
		.attr('id', 'legend')
		.attr('class', 'legend')

	legend.append('circle')
		.attr('cy', 51)
		.attr('cx', w - 207)
		.attr('r', 5)
		.attr('fill', color['Doping allegations'])






	legend.append('text')
		.attr('y', 57)
		.attr('x', w - 200)
		.text('Doping allegations')

	legend.append('circle')
		.attr('cy', 34)
		.attr('cx', w - 207)
		.attr('r', 5)
		.attr('fill',  color['No doping allegation'])


	legend.append('text')
		.attr('y', 40)
		.attr('x', w - 200)
		.html('No doping allegations')

	legend.append("rect")
		.attr("x", w - 220)
		.attr("y", 23)
		.attr("height", 40)
		.attr("width", 200)
		.style("stroke", 'black')
		.style('fill', 'none')
		.style("stroke-width", '1px');

	// Legend of the Axis
	svgScatterplotGraph.append('text')
		.attr('x', 40)
		.attr('y', -40)
		.attr("transform", "rotate(90)")
		.style('font-size', '12px')
		.text('time in minutes')

	svgScatterplotGraph.append('text')
		.attr('x', w - 60)
		.attr('y', h - 40)
		.style('font-size', '12px')
		.text('Year')
}

// fetch the data then renderScatterplotGraph
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(renderScatterplotGraph)

// Create Constant values
const colorPalette = ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"];
const monthName = ['january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const headingHeatMap = d3.select('#heatMap')
		.append('heading');
	headingHeatMap.append('h1')
		.attr('id', 'title')
		.html('Heat map');
	headingHeatMap.append('h3')
		.attr('id', 'description')
		.html('1753 - 2010: base temperature 8.66`C');

// Create svgHeatMap caneva 
const svgHeatMap = d3.select('#heatMap')
	.append('svg')
	.attr('width', w)
	.attr('height', h);

// Create the tooltipHeatMap
const tooltipHeatMap = d3.select('#heatMap')
	.append('div')
	.attr('class', 'tooltip');
// Build the renderer
const render = (data) => {

	// Declare Scales
	const xScale = d3.scaleLinear()
		.domain([d3.min(data.monthlyVariance, (d) => d.year), d3.max(data.monthlyVariance, (d) => d.year)])
		.range([padding, w - padding]);

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data.monthlyVariance, (d) => d.month)])
		.range([h - padding, padding]); 

	// Display data as rectangle
	svgHeatMap.selectAll('rect')
		.data(data.monthlyVariance)
		.enter()
		.append('rect')
		.attr('class', 'cell')
		.attr('data-month', (d) => d.month)
		.attr('data-year', (d) => d.year)
		.attr('data-temp', (d) => (data.baseTemperature +d.variance).toFixed(2))
		.attr('height', (h - 2 * padding )/12)
		.attr('width', w / (d3.max(data.monthlyVariance, (d) => d.year) - (d3.min(data.monthlyVariance, (d) => d.year))))
		.attr('x', (d) => xScale(d.year))
		.attr('y', (d) => yScale(d.month))
		// Fill with color each rectangle of the heat map
		.attr('fill', (d) => {
			if(data.baseTemperature + d.variance >= 12)
				return(colorPalette[11]);
			else if(data.baseTemperature + d.variance >= 11)
				return(colorPalette[10]);
			else if(data.baseTemperature + d.variance >= 10)
				return(colorPalette[9]);
			else if(data.baseTemperature + d.variance >= 9)
				return(colorPalette[8]);
			else if(data.baseTemperature + d.variance >= 8)
				return(colorPalette[7]);
			else if(data.baseTemperature + d.variance >= 7)
				return(colorPalette[6]);
			else if(data.baseTemperature + d.variance >= 6)
				return(colorPalette[5]);
			else if(data.baseTemperature + d.variance >= 5)
				return(colorPalette[4]);
			else if(data.baseTemperature + d.variance >= 4)
				return(colorPalette[3]);
			else if(data.baseTemperature + d.variance >= 3)
				return(colorPalette[2]);
			else if(data.baseTemperature + d.variance >= 2)
				return(colorPalette[1]);
			else if(data.baseTemperature + d.variance >= 1)
				return(colorPalette[0]);
			else
				return('blue');
		})
		// Insert the tooltip when the mouse is over the rectangle
		.on('mousemove', function(d) {
			tooltipHeatMap
				.attr('data-year', d.year)
				.attr('id', 'tooltip')
				.style('display', 'inline-block')
				.style('top', yScale(d.month) + 3 * padding + 'px')
				.style('left', xScale(d.year) - 2 * padding + 'px')
				.html("Temperature: " + (data.baseTemperature + d.variance).toFixed(2) +"<br/> Date: " + monthName[d.month - 1] + ' ' + d.year);
		})
		.on('mouseout', function(d) {
				tooltipHeatMap.style('display', 'none')
		})
	// Declare the Axis
	var x_axis = d3.axisBottom()
		.scale(xScale);

	var y_axis = d3.axisLeft()
		.scale(yScale);

	// Position the axis
	svgHeatMap.append('g')
		.attr('transform', 'translate(0,' + (h - padding) + ')')
		.attr('id', 'x-axis')
		.call(x_axis);

	svgHeatMap.append('g')
		.attr('transform', 'translate(' + padding + ', 0)')
		.attr('id', 'y-axis')
		.call(y_axis);
	
	svgHeatMap.append('text')
		.attr('x', -250)
		.attr('y', 13)
		.attr('transform', "rotate(-90)")
		.style('font-size', '12px')
		.text('months')

	svgHeatMap.append('text')
		.attr('x', w - 65)
		.attr('y', h - 20)
		.style('font-size', '12px')
		.text('years');
	
	
}
	// Fetch the data and render
	d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(render)

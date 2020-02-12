// Constant
const colors = ['#061412', '#0f322d', '#185049', '#216e64', '#2a8d80', '#33ab9d', '#37baa9', '#4ecbba', '#6cd3c6'];

// Create the heading
const heading = d3.select('#choroplethMap');
		
		heading.append('h1')
		.attr('id', 'title')
		.html('United States Educational Attainment');
	
	heading.append('p')
		.attr('id', 'description')
		.html("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)");

// Create the svg canvas
var svgChoroplethMap = d3.select("#choroplethMap")
		.append('svg')
  		.attr('width', w)
  		.attr('height', h);

// Create the Tooltip
var tooltipChoroplethMap = d3.select('#choroplethMap')
	.append('div')
	.attr('id', 'tooltipChoroplethMap')
	.attr('class', 'tooltip')


// Create the projection
var projection = d3.geoMercator().translate([w/2, h/2]).scale(700).center([-100, 39]);
var path = d3.geoPath().projection(projection);

var worldmap = d3.json('counties.geojson');
var cities = d3.csv('cities.csv');
var education = d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json');
Promise.all([worldmap, education]).then(function(values) {
	// map
	svgChoroplethMap.selectAll('path')
		.data(values[0].features)
		.enter()
		.append('path')
		.attr('class', 'county')
		.attr('data-fips', (d) => d.properties.STATE + d.properties.COUNTY)
		.attr('data-education', (d) => {
			var j = 0;
			while (values[1][j])
			{
				var name = '';
				if(values[1][j].fips.toString().length === 5)
					name = values[1][j].fips.toString();
				else
					name = '0' + values[1][j].fips.toString();
				if (name === '29203')
					name === '46113';
				if(d.properties.STATE + d.properties.COUNTY === name)
				{
					return(values[1][j].bachelorsOrHigher);
				}
				j++;
			}
		})
		.attr('d', path)
		// Add color scheme 
		.style('fill', (d) => {
			var j = 0;
			while (values[1][j])
			{
				var fips = '';
				
				if(values[1][j].fips.toString().length === 5)
					fips = values[1][j].fips.toString();
				else
					fips = '0' + values[1][j].fips.toString();
				if(fips === '29203')
					fips = '46113';
				if(d.properties.STATE + d.properties.COUNTY === fips)
				{
					if(values[1][j].bachelorsOrHigher >= 66)
						return(colors[0]);
					else if(values[1][j].bachelorsOrHigher >= 57)
						return(colors[1]);
					else if(values[1][j].bachelorsOrHigher >= 48)
						return(colors[2]);
					else if(values[1][j].bachelorsOrHigher >= 39)
						return(colors[3]);
					else if(values[1][j].bachelorsOrHigher >= 30)
						return(colors[4]);
					else if(values[1][j].bachelorsOrHigher >= 21)
						return(colors[5]);
					else if(values[1][j].bachelorsOrHigher >= 12)
						return(colors[6]);
					else if(values[1][j].bachelorsOrHigher >= 3)
						return(colors[7]);
					else
						return(colors[8]);
				}
				j++;
			}
		})

		// On hover display the tooltipChoroplethMap
		.on('mouseover', (d) => {
			tooltipChoroplethMap.style('display', 'inline-block')
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
				.html(d.properties.NAME + ', State number:' + d.properties.STATE);
		})
		// out hover don't display the tooltipChoroplethMap
		.on('mouseout', (d) => {
			tooltipChoroplethMap.style('display', 'none')

		});

	var g = svgChoroplethMap.append("g")
    .attr("class", "key")
    .attr("id", "legend")
		.attr("transform", "translate(0,40)");

	g.append('rect')
		.attr('x', w - 50)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[8])
	g.append('rect')
		.attr('x', w - 60)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[7]); 
	g.append('rect')
		.attr('x', w - 70)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[6]); 
	g.append('rect')
		.attr('x', w - 80)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[5])
	g.append('rect')
		.attr('x', w - 90)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[4]); 
	g.append('rect')
		.attr('x', w - 100)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[3]); 
	g.append('rect')
		.attr('x', w - 110)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[2])
	g.append('rect')
		.attr('x', w - 120)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[1]); 
	g.append('rect')
		.attr('x', w - 130)
		.attr('y', h - 100)
		.attr('height', 5)
		.attr('width', 10)
		.style('fill', colors[0]);
	g.append('rect')
		.attr('x', w - 130)
		.attr('y', h - 102)
		.attr('height', 10)
		.attr('width', 2)
		.style('fill', '#000');
	g.append('rect')
		.attr('x', w - 40)
		.attr('y', h - 102)
		.attr('height', 10)
		.attr('width', 2)
		.style('fill', '#000');
	g.append('text')
		.attr('x', w - 140)
		.attr('y', h - 78)
		.html('66%');
	g.append('text')
		.attr('x', w - 50)
		.attr('y', h - 78)
		.html('0%');

		
});

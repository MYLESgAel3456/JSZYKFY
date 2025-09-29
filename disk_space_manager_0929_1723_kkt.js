// 代码生成时间: 2025-09-29 17:23:40
// Load the required D3 libraries
const d3 = require('d3');

// Function to load the disk space data
function loadDiskSpaceData(filepath, callback) {
    try {
        // Read the JSON data from the file
        d3.json(filepath).then(data => {
            // Call the callback function with the data
            callback(null, data);
        }).catch(error => {
            // Call the callback function with the error
            callback(error, null);
        });
    } catch (error) {
        // Call the callback function with the error
        callback(error, null);
    }
}

// Function to draw the pie chart
function drawPieChart(data) {
    try {
        // Set the dimensions and radius of the pie chart
        const width = 360;
        const height = 360;
        const radius = 180;

        // Create the SVG element to contain the pie chart
        const svg = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Define the pie and arc functions
        const pie = d3.pie()
            .sort(null)
            .value(d => d.size);
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Bind the data to the pie chart
        const arcs = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        // Draw the pie chart slices
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color);

        // Draw the pie chart labels
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .text(d => d.data.label);
    } catch (error) {
        console.error('Error drawing pie chart:', error);
    }
}

// Main function to run the program
function main() {
    try {
        // Load the disk space data
        loadDiskSpaceData('disk_space_data.json', (error, data) => {
            if (error) {
                // Handle the error
                console.error('Error loading disk space data:', error);
            } else {
                // Draw the pie chart with the loaded data
                drawPieChart(data);
            }
        });
    } catch (error) {
        console.error('Error running program:', error);
    }
}

// Run the program
main();
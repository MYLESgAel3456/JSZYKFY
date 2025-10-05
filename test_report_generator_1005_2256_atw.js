// 代码生成时间: 2025-10-05 22:56:00
// Importing D3.js library
const d3 = require('d3');

/**
 * Function to generate the test report
 *
 * @param {Object} data - Data object containing test results
 * @param {String} selector - CSS selector for the SVG element where the report will be appended
 */
function generateTestReport(data, selector) {
  // Check if data is provided and has necessary properties
  if (!data || !data.passed || !data.failed || !data.tests) {
    throw new Error('Invalid data provided for test report generation');
  }

  // Create an SVG element
  const svg = d3.select(selector)
    .append('svg')
    .attr('width', 500)
    .attr('height', 300);

  // Define color scale
  const color = d3.scaleOrdinal()
    .domain(['passed', 'failed'])
    .range(['#4CAF50', '#F44336']);

  // Define pie chart layout
  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

  // Calculate total tests
  const totalTests = data.passed.count + data.failed.count;

  // Create arc generator
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(150);

  // Append the pie chart to the SVG
  const g = svg.append('g')
    .attr('transform', 'translate(250,150)');

  // Bind data and create pie chart paths
  const path = g.selectAll('path')
    .data(pie(d3.entries(data)))
    .enter().append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.key));

  // Append labels to the pie chart
  g.selectAll('text')
    .data(pie(d3.entries(data)))
    .enter().append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('dy', '0.35em')
    .attr('fill', 'white')
    .text(d => d.data.key);

  // Append the total tests text
  svg.append('text')
    .attr('x', 250)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .text(`Total Tests: ${totalTests}`);
}

/**
 * Example usage of the generateTestReport function
 *
 * @param {Object} data - Sample test data
 * @param {String} selector - CSS selector for the SVG element
 */
function exampleUsage(data, selector) {
  try {
    generateTestReport(data, selector);
  } catch (error) {
    console.error(error.message);
  }
}

// Sample test data
const testData = {
  passed: { count: 80, label: 'Passed' },
  failed: { count: 20, label: 'Failed' },
  tests: 100
};

// Example usage of the generateTestReport function
exampleUsage(testData, '#test-report-svg');

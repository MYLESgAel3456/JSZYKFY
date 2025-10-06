// 代码生成时间: 2025-10-06 21:01:44
// Importing necessary libraries
const d3 = require('d3');

// Function to load inventory data
function loadData(callback) {
  d3.csv('inventory_data.csv', function(error, data) {
    if (error) {
      console.error('Error loading data:', error);
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
}

// Function to clean and prepare the data for analysis
function prepareData(data) {
  // Convert date strings to Date objects
  data.forEach(d => d.date = new Date(d.date));
  // Sort data by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  return data;
}

// Function to calculate moving average
function movingAverage(data, period) {
  let averages = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      if (i - j >= 0) {
        sum += data[i - j].inventory;
      }
    }
    averages.push({
      date: data[i].date,
      average: sum / period
    });
  }
  return averages;
}

// Function to visualize the inventory data
function visualizeInventory(data, averageData) {
  const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data.concat(averageData), d => d.average || d.inventory)])
      .range([height, 0]);

  svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

  svg.append('g')
      .call(d3.axisLeft(y));

  svg.selectAll('inventory')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.inventory))
      .attr('r', 5)
      .attr('fill', 'steelblue');

  svg.selectAll('average')
      .data(averageData)
      .enter().append('line')
      .attr('x1', d => x(d.date))
      .attr('y1', d => y(d.average))
      .attr('x2', d => x(d.date))
      .attr('y2', height)
      .style('stroke', 'red')
      .style('stroke-width', 2);
}

// Main function to run the program
function runProgram() {
  loadData((error, data) => {
    if (error) return;
    const preparedData = prepareData(data);
    const averageData = movingAverage(preparedData, 7); // 7-day moving average
    visualizeInventory(preparedData, averageData);
  });
}

// Running the program
runProgram();
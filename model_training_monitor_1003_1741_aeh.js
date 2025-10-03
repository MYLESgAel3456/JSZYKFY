// 代码生成时间: 2025-10-03 17:41:09
// Importing D3.js library
const d3 = require('d3');

class ModelTrainingMonitor {

    /**
     * Constructor for ModelTrainingMonitor
     *
     * @param {string} selector - The CSS selector for the SVG element
     * @param {number} width - The width of the SVG element
     * @param {number} height - The height of the SVG element
     */
    constructor(selector, width, height) {
        this.selector = selector;
        this.width = width;
        this.height = height;
        this.svg = null;
        this.g = null;
        this.line = null;
        this.xScale = null;
        this.yScale = null;
        this.xAxis = null;
        this.yAxis = null;
    }

    /**
     * Initialize the SVG element and scales
     *
     * @returns {void}
     */
    initialize() {
        this.svg = d3.select(this.selector)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        this.g = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, this.width - this.margin.left - this.margin.right]);

        this.yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([this.height - this.margin.top - this.margin.bottom, 0]);

        this.xAxis = d3.axisBottom(this.xScale)
            .ticks(5);

        this.yAxis = d3.axisLeft(this.yScale)
            .ticks(5);

        this.g.append('g')
            .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
            .call(this.xAxis);

        this.g.append('g')
            .call(this.yAxis);
    }

    /**
     * Update the chart with new data
     *
     * @param {Array} data - The new data to display
     * @returns {void}
     */
    update(data) {
        this.line = d3.line()
            .x(d => this.xScale(d.epoch))
            .y(d => this.yScale(d.accuracy));

        const path = this.g.selectAll('path')
            .data([data]);

        path.enter().append('path')
            .merge(path)
            .attr('d', this.line)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2);

        path.exit().remove();
    }

    /**
     * Set the margin for the SVG
     *
     * @param {Object} margin - An object with left, right, top, and bottom properties
     * @returns {void}
     */
    setMargin(margin) {
        this.margin = margin;
    }
}

// Example usage:
// const monitor = new ModelTrainingMonitor('#training-monitor', 800, 600);
// monitor.setMargin({top: 20, right: 20, bottom: 30, left: 50});
// monitor.initialize();
// monitor.update([{epoch: 0, accuracy: 55}, {epoch: 1, accuracy: 65}, {epoch: 2, accuracy: 75}]);

// 代码生成时间: 2025-08-03 05:41:53
// Import required modules
const fs = require('fs');
const path = require('path');
const d3 = require('d3');

// Function to read directory structure
function readDirectoryStructure(directoryPath) {
    try {
        // Check if the directory exists
        if (!fs.existsSync(directoryPath)) {
            throw new Error('Directory does not exist');
        }

        // Read the directory contents
        const filesAndDirs = fs.readdirSync(directoryPath, { withFileTypes: true });

        // Map over the directory contents
        return filesAndDirs.map(item => {
            // Check if it's a file or directory
            if (item.isDirectory()) {
                // Recursively read the directory structure
                return {
                    name: item.name,
                    type: 'directory',
                    children: readDirectoryStructure(path.join(directoryPath, item.name))
                };
            } else {
                // Return file details
                return {
                    name: item.name,
                    type: 'file'
                };
            }
        });
    } catch (error) {
        console.error('Error reading directory:', error.message);
        return null;
    }
}

// Function to set up the D3 visualization
function setupD3Visualization(data) {
    // Set up the SVG container
    const width = 800;
    const height = 600;
    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a tree layout
    const tree = d3.tree()
        .size([height, width - 160]);

    // Create a root node
    const root = d3.hierarchy(data, d => d.children);

    // Compute the tree layout
    tree(root);

    // Append nodes
    const nodes = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

    // Append circles
    nodes.append('circle')
        .attr('r', 10)
        .style('fill', d => d.children ? '#1f77b4' : '#ff7f0e');

    // Append text labels
    nodes.append('text')
        .attr('dy', 3)
        .attr('x', d => d.children ? -13 : 13)
        .style('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name);
}

// Main function to run the program
function main() {
    const directoryPath = process.argv[2]; // Get directory path from command line argument

    // Read the directory structure
    const directoryData = readDirectoryStructure(directoryPath);

    // Check if directory data is valid
    if (directoryData) {
        // Set up the D3 visualization
        setupD3Visualization(directoryData);
    } else {
        console.error('Failed to read directory structure.');
    }
}

// Run the main function
main();
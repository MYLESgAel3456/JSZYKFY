// 代码生成时间: 2025-09-29 00:00:59
// Importing necessary D3 modules
import * as d3 from 'd3';

// Function to calculate health risk
function calculateHealthRisk(age, weight, height) {
  // Basic validation to ensure non-negative values
  if (age < 0 || weight < 0 || height < 0) {
    throw new Error('Age, weight, and height must be non-negative numbers.');
  }

  // Placeholder for risk calculation logic
  // This is where you would put your health risk calculation formula
  // For demonstration purposes, we'll return a simple risk score
  let riskScore = 100 - (age * 2) - (weight / height);

  // Return the calculated health risk score
  return riskScore;
}

// Function to display the health risk on the webpage
function displayHealthRisk(riskScore) {
  // Select the DOM element where the risk score will be displayed
  const riskDisplay = d3.select('#risk-score');

  // Update the text content of the element with the risk score
  riskDisplay.text('Your health risk score is: ' + riskScore);
}

// Error handling function
function handleError(error) {
  console.error('Error:', error.message);
  // Display error message on the webpage
  d3.select('#error-message').text(error.message);
}

// Main function to handle user input and calculate risk
function assessHealthRisk() {
  try {
    // Get user input values from the form
    const age = parseInt(d3.select('#age').node().value, 10);
    const weight = parseInt(d3.select('#weight').node().value, 10);
    const height = parseInt(d3.select('#height').node().value, 10);

    // Calculate the health risk score
    const riskScore = calculateHealthRisk(age, weight, height);

    // Display the risk score
    displayHealthRisk(riskScore);
  } catch (error) {
    // Handle any errors that occur during the process
    handleError(error);
  }
}

// Attach the assessHealthRisk function to the form submit event
d3.select('#assessment-form').on('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting traditionally
  assessHealthRisk();
});

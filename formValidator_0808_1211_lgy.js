// 代码生成时间: 2025-08-08 12:11:03
 * @returns {Object} - An object containing validation status and messages
 */
function validateFormData(formData) {
  const errors = [];
  const result = {
    isValid: true,
    messages: []
  };

  // Check for required fields
  ['name', 'email', 'age'].forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
      result.isValid = false;
    }
  });

  // Validate email format
  if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.push('Email is not valid.');
    result.isValid = false;
  }

  result.messages = errors;
  return result;
}

/**
 * Function to handle form submission
 * @param {Event} event - The form submission event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value
  };

  const validationResult = validateFormData(formData);

  if (validationResult.isValid) {
    console.log('Form is valid.', formData);
    // Proceed with form submission logic here
  } else {
    validationResult.messages.forEach(message => {
      console.error(message);
      // Display error messages to the user
    });
  }
}

// Attach event listener to the form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  form.addEventListener('submit', handleFormSubmit);
});

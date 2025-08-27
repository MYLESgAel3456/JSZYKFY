// 代码生成时间: 2025-08-28 07:38:51
(function() {
  // Define the FormValidator class
  function FormValidator() {
  }

  /**
   * Validates the form data.
   * @param {Object} formData - The form data to be validated.
   * @returns {Object} - An object containing the validity status and errors.
   */
  FormValidator.prototype.validate = function(formData) {
    // Check if formData is an object
    if (typeof formData !== 'object' || formData === null) {
      return { valid: false, errors: ['FormData must be an object'] };
    }

    // Define rules for validation
    const rules = {
      name: (value) => value.trim() !== '' && value.length >= 2,
      email: (value) => /\S+@\S+\.\S+/.test(value),
      password: (value) => value.length >= 6,
      age: (value) => Number.isInteger(value) && value >= 18
    };

    // Initialize error array
    let errors = [];

    // Validate each field according to the rules
    Object.keys(rules).forEach(key => {
      if (formData[key] === undefined || !rules[key](formData[key])) {
        errors.push(`Invalid ${key}: ${formData[key] ? 'does not meet the criteria' : 'is required'}`);
      }
    });

    return { valid: errors.length === 0, errors };
  };

  // Export the FormValidator class
  window.FormValidator = FormValidator;
})();

/**
 * Example usage:
 * let validator = new FormValidator();
 * let formData = {
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   password: 'password123',
 *   age: 25
 * };
 * let result = validator.validate(formData);
 * console.log(result); // { valid: true, errors: [] }
 */
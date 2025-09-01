// 代码生成时间: 2025-09-01 15:30:38
 * @param {string} className - The name of the class to toggle.
 */
function toggleClass(className) {
  const body = document.body;
  if (body.classList.contains(className)) {
    body.classList.remove(className);
  } else {
    body.classList.add(className);
  }
}

/**
 * Initialize the theme switcher.
 * This function sets up event listeners for the theme switch button.
 * @param {string} lightThemeClass - The class name for the light theme.
 * @param {string} darkThemeClass - The class name for the dark theme.
 */
function initThemeSwitcher(lightThemeClass, darkThemeClass) {
  // Define the theme switch button selector
  const themeSwitchButton = document.getElementById('theme-switch-button');

  // Check if the theme switch button exists
  if (!themeSwitchButton) {
    console.error('Theme switch button not found.');
    return;
  }

  // Add event listener to the theme switch button
  themeSwitchButton.addEventListener('click', () => {
    // Toggle the light theme class
    toggleClass(lightThemeClass);
    // Toggle the dark theme class
    toggleClass(darkThemeClass);
  });
}

/**
 * Main function to start the theme switcher.
 * It initializes the theme switcher with predefined light and dark theme classes.
 */
function startThemeSwitcher() {
  const lightThemeClass = 'light-theme';
  const darkThemeClass = 'dark-theme';

  // Initialize the theme switcher with the provided theme classes
  initThemeSwitcher(lightThemeClass, darkThemeClass);
}

// Start the theme switcher when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', startThemeSwitcher);
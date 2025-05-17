// Obtain the elements
const currentYearElement = document.getElementById('currentYear');
// Obtain the last modified element
const lastModifiedElement = document.getElementById('lastModified');

// set the current year
currentYearElement.textContent = new Date().getFullYear();

// set the last modified
lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
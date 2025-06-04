/**
 * Sets the course title and code on the webpage.
 * 
 * @param {Object} course - The course object containing 'name' and 'code' properties.
 */

export function setTitle(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

/**
 * Renders a table of sections with their respective numbers, enrolled student counts, and instructors.
 * 
 * @param {Array} sections - An array of section objects containing 'sectionNumber', 'enrolled', and 'instructor' properties.
 */
export function renderSections(sections) {
  const html = sections.map(
    (section) => `<tr>
    <td>${section.sectionNumber}</td>
    <td>${section.enrolled}</td>
    <td>${section.instructor}</td></tr>`
  );
  document.querySelector("#sections").innerHTML = html.join("");
}
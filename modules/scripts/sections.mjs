import byuiCourse from "./course.mjs";

/**
 * Populate the section selection dropdown with options from the byuiCourse.sections array
 * so that the user can select a section number to enroll or drop a student from.
 */
export function setSectionSelection() {
  const sectionSelect = document.querySelector("#sectionNumber");
  byuiCourse.sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}
import { renderSections } from "./output.mjs";

const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    {
      sectionNumber: 1,
      enrolled: 88,
      instructor: "Brother Bingham",
    },
    {
      sectionNumber: 2,
      enrolled: 81,
      instructor: "Sister Shultz",
    },
    {
      sectionNumber: 3,
      enrolled: 95,
      instructor: "Sister Smith",
    },
  ],
    /**
     * Updates the enrollment count for a given section.
     * 
     * @param {number} sectionNumber - The number of the section to update.
     * @param {boolean} [add=true] - Determines whether to add or drop a student. 
     *                               Defaults to true for adding a student.
     * 
     * This function finds the section with the given section number and 
     * increments the 'enrolled' count if 'add' is true, or decrements it 
     * if 'add' is false. It then re-renders the sections display.
     */
  changeEnrollment: function (sectionNumber, add = true) {
    // Find the section with the given section number
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNumber == sectionNumber
    );
    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
      renderSections(this.sections);
    }
  },
};

export default byuiCourse;
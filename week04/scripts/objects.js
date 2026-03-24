let aCourse = {
  code: "WDD131",
  title: "Dynamic Web Fundamentals",
  credits: 2,
  sections: [
    {
      section: "01",
      enrolled: 26,
      instructor: "Bro T"
    },
    {
      section: "02",
      enrolled: 20,
      instructor: "Bro J"
    },
    {
      section: "03",
      enrolled: 18,
      instructor: "Bro K"
    }
  ]
};

function setCourseInformation(course) {
    // document.getElementById('courseName').innerHTML = `${course.code}: ${course.title}`;
    document.querySelector("#courseName").innerHTML = `${course.code} - ${course.title}`;
}

function renderSections(sections) {
    const table = document.getElementById('sections');
    sections.forEach(section => {
        let row = table.insertRow();
        row.innerHTML = `<td>${section.section}</td><td>${section.enrolled}</td><td>${section.instructor}</td>`;
    });
}

setCourseInformation(aCourse);
renderSections(aCourse.sections);

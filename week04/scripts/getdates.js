// Get the current year and display it in the copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

// Get the last modified date of the document and display it
document.getElementById("lastModified").innerHTML = "Last modification: " + document.lastModified;

const numberOfDays = 6; // variable days in future setting
const options = { weekday: "long" }; // Intl.DateTimeFormat vs. short, etc.

// BEGIN
const today = new Date();
// TODAY test output
let todaystring = new Intl.DateTimeFormat("en-US", options).format(today);
document.getElementById("today").innerHTML = `Today is <strong>${todaystring}</strong>`;

// next n days
for (let i = 1; i <= numberOfDays; i++) {
	const nextday = new Date();
	nextday.setDate(today.getDate() + i);
	let nextdaystring = new Intl.DateTimeFormat("en-US", options).format(nextday);
	const item = document.createElement("li"); // list item
	item.textContent = nextdaystring;
	document.querySelector("ul").appendChild(item);
}

// Store the selected elements
const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

// Add a click event listener to the hamburger button and toggle the classes
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('open');
	hambutton.classList.toggle('open');
});

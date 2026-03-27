const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1877, April, 6",
    area: 253000,
    imageUrl: "images/temples/salt-lake.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 3",
    area: 72000,
    imageUrl: "images/temples/san-diego.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 34000,
    imageUrl: "images/temples/laie-hawaii.jpg"
  },
  {
    templeName: "Cardston Alberta",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923, August, 26",
    area: 56575,
    imageUrl: "images/temples/cardston.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2000, March, 10",
    area: 40000,
    imageUrl: "images/temples/rome.jpg"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 88400,
    imageUrl: "images/temples/nauvoo.jpg"
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 113916,
    imageUrl: "images/temples/st-george.jpg"
  }
];

// Function to create and display temple cards
function displayTemples(templeList) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  templeList.forEach(temple => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy';

    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Filter functions
function getOldTemples() {
  return temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year < 1900;
  });
}

function getNewTemples() {
  return temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year > 2000;
  });
}

function getLargeTemples() {
  return temples.filter(temple => temple.area > 90000);
}

function getSmallTemples() {
  return temples.filter(temple => temple.area < 10000);
}

// Display all temples on page load
displayTemples(temples);

// Store the selected elements
const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

// Add a click event listener to the hamburger button and toggle the classes
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('open');
	hambutton.classList.toggle('open');
});

// Add event listeners to navigation links
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Close the menu after clicking
    mainnav.classList.remove('open');
    hambutton.classList.remove('open');

    const href = link.getAttribute('href');
    
    switch(href) {
      case '#home':
        displayTemples(temples);
        break;
      case '#old':
        displayTemples(getOldTemples());
        break;
      case '#new':
        displayTemples(getNewTemples());
        break;
      case '#large':
        displayTemples(getLargeTemples());
        break;
      case '#small':
        displayTemples(getSmallTemples());
        break;
    }
  });
});

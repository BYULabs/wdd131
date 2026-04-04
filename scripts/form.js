const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const REVIEW_COUNT_KEY = "ReviewCount";

function getStoredReviewCount() {
  const storedValue = Number.parseInt(localStorage.getItem(REVIEW_COUNT_KEY), 10);
  return Number.isNaN(storedValue) ? 0 : storedValue;
}

function incrementReviewCount() {
  const nextCount = getStoredReviewCount() + 1;
  localStorage.setItem(REVIEW_COUNT_KEY, String(nextCount));
}

function toTitleCase(text) {
  return text
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const productSelect = document.querySelector("#productName");

if (productSelect) {
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = toTitleCase(product.name);
    productSelect.appendChild(option);
  });
}

const reviewForm = document.querySelector(".review-form");

if (reviewForm) {
  reviewForm.addEventListener("submit", incrementReviewCount);
}

const reviewCountDisplay = document.querySelector("#reviewCount");

if (reviewCountDisplay) {
  reviewCountDisplay.textContent = String(getStoredReviewCount());
}
// Valid Book of Mormon books
const BOM_BOOKS = [
	'1 Nephi',
	'2 Nephi',
	'Jacob',
	'Enos',
	'Jarom',
	'Omni',
	'Words of Mormon',
	'Mosiah',
	'Alma',
	'Helaman',
	'3 Nephi',
	'4 Nephi',
	'Mormon',
	'Ether',
	'Moroni'
];

// DOM Elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const messageArea = document.querySelector('#input-message');
const countDisplay = document.querySelector('#count-display');

// Track entries to prevent duplicates
const entries = new Set();

// Max chapters allowed
const MAX_CHAPTERS = 10;

/**
 * Format and validate book chapter input
 * Accepts flexible input like "alma 5", "ALMA 5", "Alma 5"
 * Returns formatted string like "Alma 5" or null if invalid
 */
function formatAndValidateInput(inputString) {
	const trimmed = inputString.trim();

	if (!trimmed) {
		return null;
	}

	// Split input into parts (book and chapter)
	const parts = trimmed.split(/\s+/);

	if (parts.length < 2) {
		return null; // Need at least book and chapter
	}

	// Handle cases like "3 Nephi" or "4 Nephi" or "Words of Mormon"
	let bookName = '';
	let chapterNumber = '';

	// Try to find the chapter number (should be the last part)
	const lastPart = parts[parts.length - 1];
	if (/^\d+$/.test(lastPart)) {
		chapterNumber = lastPart;
		bookName = parts.slice(0, -1).join(' ');
	} else {
		return null; // Last part must be a number
	}

	// Normalize book name (title case)
	bookName = bookName
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');

	// Validate book exists in BOM_BOOKS
	const foundBook = BOM_BOOKS.find(book => book.toLowerCase() === bookName.toLowerCase());

	if (!foundBook) {
		return null; // Invalid book
	}

	// Return properly formatted string
	return `${foundBook} ${chapterNumber}`;
}

/**
 * Display message to user
 */
function showMessage(text, type = 'error') {
	messageArea.textContent = text;
	messageArea.className = `message-area show ${type}`;

	// Auto-hide success messages after 3 seconds
	if (type === 'success') {
		setTimeout(() => {
			messageArea.classList.remove('show');
		}, 3000);
	}
}

/**
 * Clear message display
 */
function clearMessage() {
	messageArea.classList.remove('show');
	messageArea.textContent = '';
}

/**
 * Update chapter count display
 */
function updateCount() {
	countDisplay.textContent = entries.size;
}

/**
 * Add chapter to list
 */
function addChapter(formattedInput) {
	// Check if at limit
	if (entries.size >= MAX_CHAPTERS) {
		showMessage(`Cannot add more chapters. Maximum limit of ${MAX_CHAPTERS} reached.`, 'warning');
		return;
	}

	// Check for duplicates
	if (entries.has(formattedInput)) {
		showMessage(`"${formattedInput}" is already in your list. Please choose a different chapter.`, 'warning');
		input.value = '';
		input.focus();
		return;
	}

	// Add to tracking set
	entries.add(formattedInput);

	// Create list item
	const li = document.createElement('li');
	li.textContent = formattedInput;

	// Create delete button with accessibility
	const deleteButton = document.createElement('button');
	deleteButton.setAttribute('aria-label', `Remove ${formattedInput} from list`);
	deleteButton.textContent = '❌';
	deleteButton.type = 'button';

	deleteButton.addEventListener('click', function () {
		entries.delete(formattedInput);
		list.removeChild(li);
		updateCount();
		showMessage(`"${formattedInput}" removed from your list.`, 'success');
		input.focus();
	});

	li.appendChild(deleteButton);
	list.appendChild(li);

	// Clear input and update UI
	input.value = '';
	clearMessage();
	updateCount();

	// Show success message
	const remaining = MAX_CHAPTERS - entries.size;
	if (remaining > 0) {
		showMessage(`"${formattedInput}" added! (${remaining} slot${remaining > 1 ? 's' : ''} remaining)`, 'success');
	} else {
		showMessage(`"${formattedInput}" added! Your Top 10 list is complete.`, 'success');
	}

	input.focus();
}

/**
 * Handle add button click
 */
button.addEventListener('click', function() {
	const formattedInput = formatAndValidateInput(input.value);

	if (!formattedInput) {
		showMessage('Invalid format. Please enter a Book of Mormon book and chapter (e.g., "Alma 5").', 'error');
		input.focus();
		return;
	}

	addChapter(formattedInput);
});

/**
 * Handle Enter key in input field
 */
input.addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		button.click();
	}
});

/**
 * Handle Escape key to clear input and messages
 */
input.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		input.value = '';
		clearMessage();
	}
});

/**
 * Set initial focus and update count on page load
 */
document.addEventListener('DOMContentLoaded', function() {
	updateCount();
	input.focus();
});

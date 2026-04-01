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

const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const messageArea = document.querySelector('#input-message');
const countDisplay = document.querySelector('#count-display');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
	displayList(chapter);
});

button.addEventListener('click', () => {
	const formattedInput = formatAndValidateInput(input.value);

	if (!formattedInput) {
		showMessage('Invalid format. Please enter a Book of Mormon book and chapter (e.g., "Alma 5").', 'error');
		input.focus();
		return;
	}

	displayList(formattedInput);
	chaptersArray.push(formattedInput);
	setChapterList();
	input.value = '';
	input.focus();
	showMessage(`"${formattedInput}" added!`, 'success');
});

input.addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		button.click();
	}
});

input.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		input.value = '';
		clearMessage();
	}
});

function formatAndValidateInput(inputString) {
	const trimmed = inputString.trim();

	if (!trimmed) {
		return null;
	}

	const parts = trimmed.split(/\s+/);

	if (parts.length < 2) {
		return null;
	}

	let bookName = '';
	let chapterNumber = '';

	const lastPart = parts[parts.length - 1];
	if (/^\d+$/.test(lastPart)) {
		chapterNumber = lastPart;
		bookName = parts.slice(0, -1).join(' ');
	} else {
		return null;
	}

	bookName = bookName
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');

	const foundBook = BOM_BOOKS.find(book => book.toLowerCase() === bookName.toLowerCase());

	if (!foundBook) {
		return null;
	}

	return `${foundBook} ${chapterNumber}`;
}

function showMessage(text, type = 'error') {
	messageArea.textContent = text;
	messageArea.className = `message-area show ${type}`;

	if (type === 'success') {
		setTimeout(() => {
			messageArea.classList.remove('show');
		}, 3000);
	}
}

function clearMessage() {
	messageArea.classList.remove('show');
	messageArea.textContent = '';
}

function updateCount() {
	countDisplay.textContent = chaptersArray.length;
}

function displayList(item) {
	let li = document.createElement('li');
	let deletebutton = document.createElement('button');
	li.textContent = item;
	deletebutton.textContent = '❌';
	deletebutton.classList.add('delete');
	deletebutton.setAttribute('aria-label', `Remove ${item} from list`);
	li.append(deletebutton);
	list.append(li);
	deletebutton.addEventListener('click', function () {
		list.removeChild(li);
		deleteChapter(li.textContent);
		input.focus();
		showMessage(`"${item}" removed from your list.`, 'success');
		updateCount();
	});
}

function setChapterList() {
	localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
	return JSON.parse(localStorage.getItem('myFavBOMList'));
}

function deleteChapter(chapter) {
	chapter = chapter.slice(0, chapter.length - 1);
	chaptersArray = chaptersArray.filter(item => item !== chapter);
	setChapterList();
}

document.addEventListener('DOMContentLoaded', function() {
	updateCount();
	input.focus();
});

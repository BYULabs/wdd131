const CUSTOM_PHRASES_KEY = "customEcuadorianPhrases";

const defaultEcuadorianPhrases = [
    {
        palabra: "Ñaño/a",
        traduccion: "Brother/sister or close friend",
        ejemplo: "Oye ñaño, ¿me ayudas con eso?"
    },
    {
        palabra: "¡De ley!",
        traduccion: "Of course! / Definitely! / For sure!",
        ejemplo: "¿Vienes a la farra? —¡De ley, hermano!"
    }
];

function loadCustomPhrases() {
    const storedPhrases = localStorage.getItem(CUSTOM_PHRASES_KEY);
    if (!storedPhrases) {
        return [];
    }

    const parsedPhrases = JSON.parse(storedPhrases);
    if (!Array.isArray(parsedPhrases)) {
        return [];
    }

    return parsedPhrases
        .filter(item => item && typeof item === "object")
        .map(item => ({
            palabra: typeof item.palabra === "string" ? item.palabra.trim() : "",
            traduccion: typeof item.traduccion === "string" ? item.traduccion.trim() : "",
            ejemplo: typeof item.ejemplo === "string" ? item.ejemplo.trim() : "",
        }))
        .filter(item => item.palabra && item.traduccion && item.ejemplo);
}

const ecuadorianPhrases = [...defaultEcuadorianPhrases, ...loadCustomPhrases()];

let currentIndex = 0;

const phraseWordEl = document.getElementById('phraseWord');
const phraseTranslationEl = document.getElementById('phraseTranslation');
const phraseEl = document.getElementById('phrase');
const phraseNumberEl = document.getElementById('phraseNumber');
const phraseContentEl = document.getElementById('phraseContent');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');

function updatePhrase(index) {
    const phrase = ecuadorianPhrases[index];

    phraseContentEl.classList.remove('fade-in');

    void phraseContentEl.offsetWidth;

    phraseContentEl.classList.add('fade-in');

    phraseWordEl.textContent = phrase.palabra;
    phraseTranslationEl.textContent = phrase.traduccion;
    phraseEl.textContent = `"${phrase.ejemplo}"`;
    phraseNumberEl.textContent = `Phrase ${index + 1} of ${ecuadorianPhrases.length}`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % ecuadorianPhrases.length;
    updatePhrase(currentIndex);
});

resetBtn.addEventListener('click', () => {
    currentIndex = 0;
    updatePhrase(currentIndex);
})

updatePhrase(currentIndex);


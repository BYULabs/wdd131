const CUSTOM_PHRASES_KEY = "customEcuadorianPhrases";

const addSlangForm = document.getElementById("addSlangForm");
const wordInput = document.getElementById("word");
const translationInput = document.getElementById("translation");
const exampleInput = document.getElementById("example");
const clearCustomBtn = document.getElementById("clearCustomBtn");
const formMessage = document.getElementById("formMessage");

function getStoredPhrases() {
    const data = localStorage.getItem(CUSTOM_PHRASES_KEY);
    if (!data) {
        return [];
    }

    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
}

function setStoredPhrases(phrases) {
    localStorage.setItem(CUSTOM_PHRASES_KEY, JSON.stringify(phrases));
}

function setMessage(message, isError = false) {
    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;
    formMessage.classList.toggle("error", isError);
    formMessage.classList.toggle("success", !isError);
}

addSlangForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const word = wordInput.value.trim();
    const translation = translationInput.value.trim();
    const example = exampleInput.value.trim();

    if (!word || !translation || ! example) {
        setMessage("Please complete all fields before saving.", true);
        return;
    }

    const phrases = getStoredPhrases();
    phrases.push({
        palabra: word,
        traduccion: translation,
        ejemplo: example,
    });

    setStoredPhrases(phrases);
    setMessage("Phrase saved locally. Open the translator page tp see it.");
    addSlangForm.reset();
    wordInput.focus();
});

clearCustomBtn.addEventListener("click", () => {
    localStorage.removeItem(CUSTOM_PHRASES_KEY);
    setMessage("Your saved custom phrases were removed.");
});
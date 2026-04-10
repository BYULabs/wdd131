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
    },
    {
        palabra: "Chévere",
        traduccion: "Excellent / Cool / Great",
        ejemplo: "Ese concierto estuvo bien chévere."
    },
    {
        palabra: "Camello",
        traduccion: "Work / Labor / Job",
        ejemplo: "Tengo mucho camello en la oficina hoy."
    },
    {
        palabra: "Caleta",
        traduccion: "House / Home / Place",
        ejemplo: "Vamos a mi caleta a ver películas."
    },
    {
        palabra: "Farra",
        traduccion: "Party / Celebration",
        ejemplo: "Hay una farra en la casa de Diego el viernes."
    },
    {
        palabra: "Chuchaki",
        traduccion: "Hangover / Drunken state",
        ejemplo: "Amanecí con un chuchaki terrible por la cerveza."
    },
    {
        palabra: "Jama",
        traduccion: "Food / Meal",
        ejemplo: "La jama que preparó mi mamá estuvo deliciosa."
    },
    {
        palabra: "Guambra",
        traduccion: "Kid / Young person / Boy or girl",
        ejemplo: "Los guambras fueron a jugar al parque."
    },
    {
        palabra: "Cachar",
        traduccion: "To understand / To catch on / To get it",
        ejemplo: "¿Cachaste lo que te dije o te lo explico de nuevo?"
    },
    {
        palabra: "¡Qué bestia!",
        traduccion: "Wow! / That's crazy! / Amazing!",
        ejemplo: "¡Qué bestia, eso fue increíble!"
    },
    {
        palabra: "Achachay",
        traduccion: "Brrr, it's cold!",
        ejemplo: "¡Achachay! Esta mañana sí estuvo helada."
    },
    {
        palabra: "Arrarray",
        traduccion: "Ouch, it's hot!",
        ejemplo: "¡Arrarray! Ese café está hirviendo."
    },
    {
        palabra: "Mijín/mija",
        traduccion: "Buddy / Dear (informal affectionate address)",
        ejemplo: "Mijín, ¿vamos por un encebollado?"
    },
    {
        palabra: "Longo/a",
        traduccion: "Kid / Youngster (colloquial, can be playful)",
        ejemplo: "Cuando era longo, jugaba fútbol en la calle."
    },
    {
        palabra: "Sapear",
        traduccion: "To snitch / To tell on someone",
        ejemplo: "No me vayas a sapear con el profe."
    },
    {
        palabra: "Chiro/a",
        traduccion: "Broke / Out of money",
        ejemplo: "Estoy chiro hasta fin de mes."
    },
    {
        palabra: "Plata",
        traduccion: "Money / Cash",
        ejemplo: "No llevo mucha plata, pero alcanza."
    },
    {
        palabra: "Bacán",
        traduccion: "Awesome / Great / Nice",
        ejemplo: "Tu nueva bici está bacán."
    },
    {
        palabra: "Pilas",
        traduccion: "Pay attention / Be alert",
        ejemplo: "Pilas con el celular en el bus."
    },
    {
        palabra: "Mandarina",
        traduccion: "Easy task / Piece of cake",
        ejemplo: "Ese examen estuvo mandarina."
    },
    {
        palabra: "Simiar",
        traduccion: "To steal / To swipe",
        ejemplo: "Le simiaron la billetera en la fiesta."
    },
    {
        palabra: "Lámpara",
        traduccion: "Show-off / Attention seeker",
        ejemplo: "No seas lámpara, deja que todos hablen."
    },
    {
        palabra: "Atatay",
        traduccion: "Yuck! / Gross!",
        ejemplo: "¡Atatay! Esa comida ya se dañó."
    },
    {
        palabra: "Chuta",
        traduccion: "Darn! / Oops!",
        ejemplo: "¡Chuta! Me olvidé las llaves en la casa."
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


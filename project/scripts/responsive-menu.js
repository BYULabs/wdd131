const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (hamButton && navigation) {
    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    const navLinks = navigation.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            hamButton.classList.remove("open");
        });
    });
}
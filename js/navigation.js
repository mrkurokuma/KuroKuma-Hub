// Sidebar Navigation

const navButtons = document.querySelectorAll(".nav-button");
navButtons[0].classList.add("active");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from every button
        navButtons.forEach(btn => btn.classList.remove("active"));

        // Highlight the clicked button
        button.classList.add("active");

        const target = button.dataset.target;

        if (!target) return;

        document.getElementById(target).scrollIntoView({
            behavior: "smooth"
        });

    });

});
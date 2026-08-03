/*
==================================
KuroKuma Hub
KuroKuma Labs

Storage and Shared Data
==================================
*/

let projects =
    JSON.parse(localStorage.getItem("kuroKumaProjects")) || [];

let tasks =
    JSON.parse(localStorage.getItem("kuroKumaTasks")) || [];

function saveProjects() {
    localStorage.setItem(
        "kuroKumaProjects",
        JSON.stringify(projects)
    );
}

function saveTasks() {
    localStorage.setItem(
        "kuroKumaTasks",
        JSON.stringify(tasks)
    );
}
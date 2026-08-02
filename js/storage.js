/*
==================================
KuroKuma Hub
KuroKuma Labs

Projects Module
==================================
*/

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
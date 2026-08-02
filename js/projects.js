/*
==================================
KuroKuma Hub
KuroKuma Labs

Projects Module
==================================
*/

// --------------------
// Projects tracker
// --------------------

const projectForm = document.getElementById("projectForm");
const projectInput = document.getElementById("projectInput");
const projectSearch = document.getElementById("projectSearch");
const projectList = document.getElementById("projectList");


let projects =
    JSON.parse(localStorage.getItem("kuroKumaProjects")) || [];



function displayProjects() {
    projectList.innerHTML = "";

    const searchText = projectSearch.value
        .trim()
        .toLowerCase();

    const filteredProjects = projects.filter(function (project) {
        return project.toLowerCase().includes(searchText);
    });

    if (filteredProjects.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No projects found.";
        emptyMessage.className = "empty-message";
        projectList.appendChild(emptyMessage);
        return;
    }

    filteredProjects.forEach(function (project) {
        const index = projects.indexOf(project);

        const listItem = document.createElement("li");
        listItem.className = "project-item";

        const projectName = document.createElement("span");
        projectName.textContent = project;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {
            projects.splice(index, 1);
            saveProjects();
            displayProjects();
            updateDashboard();
        });

        listItem.appendChild(projectName);
        listItem.appendChild(deleteButton);
        projectList.appendChild(listItem);
    });
}
projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const projectName = projectInput.value.trim();

    if (projectName === "") {
        return;
    }

  projects.push(projectName);
saveProjects();
displayProjects();
updateDashboard();

projectInput.value = "";
projectInput.focus();
});

projectSearch.addEventListener("input", function () {
    displayProjects();
});

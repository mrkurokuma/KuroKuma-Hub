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

    projects.forEach(function (project, index) {
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

displayProjects();

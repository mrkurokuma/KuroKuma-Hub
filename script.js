// --------------------
// Projects tracker
// --------------------

const projectForm = document.getElementById("projectForm");
const projectInput = document.getElementById("projectInput");
const projectList = document.getElementById("projectList");

let projects =
    JSON.parse(localStorage.getItem("kuroKumaProjects")) || [];

function saveProjects() {
    localStorage.setItem(
        "kuroKumaProjects",
        JSON.stringify(projects)
    );
}

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

// --------------------
// Tasks tracker
// --------------------

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks =
    JSON.parse(localStorage.getItem("kuroKumaTasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "kuroKumaTasks",
        JSON.stringify(tasks)
    );
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        const taskName = document.createElement("span");
        taskName.textContent = task.name;
        taskName.className = "task-name";

        if (task.completed) {
            taskName.classList.add("task-complete");
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";
        completeButton.className = "complete-button";

        completeButton.addEventListener("click", function () {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
    updateDashboard();
});

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
    updateDashboard();
});

        listItem.appendChild(taskName);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

   saveTasks();
displayTasks();
updateDashboard();

taskInput.value = "";
    taskInput.focus();
});

displayTasks();
// --------------------
// Dashboard Statistics
// --------------------

function updateDashboard() {

    document.getElementById("projectCount").textContent = projects.length;

    document.getElementById("taskCount").textContent = tasks.length;

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    document.getElementById("completedCount").textContent = completedTasks;

}

updateDashboard();
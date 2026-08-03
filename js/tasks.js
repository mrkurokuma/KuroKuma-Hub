/*
==================================
KuroKuma Hub
KuroKuma Labs

Projects Module
==================================
*/

// --------------------
// Tasks tracker
// --------------------

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskSearch = document.getElementById("taskSearch");
const taskList = document.getElementById("taskList");

let tasks =
    JSON.parse(localStorage.getItem("kuroKumaTasks")) || [];



function displayTasks() {
    taskList.innerHTML = "";

    const searchText = taskSearch.value
        .trim()
        .toLowerCase();

  const filteredTasks = tasks.filter(function (task) {
    const words = task.name
        .toLowerCase()
        .split(/\s+/);

    return words.some(function (word) {
        return word.startsWith(searchText);
    });
});

    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks found.";
        emptyMessage.className = "empty-message";
        taskList.appendChild(emptyMessage);
        return;
    }

    filteredTasks.forEach(function (task) {

        const index = tasks.indexOf(task);

        const listItem = document.createElement("li");
        listItem.className = "task-item";

        // Check whether the task is overdue
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (task.dueDate) {
            const dueDateParts = task.dueDate.split("-");
            const dueDate = new Date(
                Number(dueDateParts[0]),
                Number(dueDateParts[1]) - 1,
                Number(dueDateParts[2])
            );

            if (!task.completed && dueDate < today) {
                listItem.classList.add("task-overdue");
            }
        }

        const taskDueDate = document.createElement("span");

       if (task.dueDate) {

    const formattedDate = new Date(task.dueDate)
        .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

    taskDueDate.textContent = "📅 " + formattedDate;

} else {

    taskDueDate.textContent = "";

}

        taskDueDate.className = "task-date";

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
        listItem.appendChild(taskDueDate);
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
    dueDate: taskDate.value,
    completed: false
});
   saveTasks();
displayTasks();
updateDashboard();

taskInput.value = "";
taskDate.value = "";
taskInput.focus();
});

displayTasks();

taskSearch.addEventListener("input", displayTasks);

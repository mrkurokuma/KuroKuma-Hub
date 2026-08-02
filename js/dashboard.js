/*
==================================
KuroKuma Hub
KuroKuma Labs

Projects Module
==================================
*/

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


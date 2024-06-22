document.addEventListener("DOMContentLoaded", () => {
  const addTaskButton = document.getElementById("add-task-button");
  addTaskButton.addEventListener("click", addTask);

  loadTasks();

  function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;

    if (taskText !== "" && taskDateValue !== "") {
      const task = {
        text: taskText,
        date: taskDateValue,
        completed: false,
      };
      saveTask(task);
      taskInput.value = "";
      taskDate.value = "";
      displayTasks();
    }
  }

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    displayTasks();
  }

  function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskListContainer = document.getElementById("task-list-container");
    taskListContainer.innerHTML = "";

    const tasksByDate = tasks.reduce((acc, task) => {
      (acc[task.date] = acc[task.date] || []).push(task);
      return acc;
    }, {});

    Object.keys(tasksByDate).forEach((date) => {
      const taskList = document.createElement("div");
      taskList.className = "task-list";
      const taskListTitle = document.createElement("h3");
      taskListTitle.textContent = date;
      taskList.appendChild(taskListTitle);

      tasksByDate[date].forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        if (task.completed) {
          taskItem.classList.add("completed");
        }

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener("change", () => {
          task.completed = taskCheckbox.checked;
          saveAllTasks(tasks);
          displayTasks();
        });

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const deleteButton = document.createElement("img");
        deleteButton.src = "delete-icon.png"; // Add your delete icon image here
        deleteButton.alt = "Delete";
        deleteButton.addEventListener("click", () => {
          const index = tasks.indexOf(task);
          tasks.splice(index, 1);
          saveAllTasks(tasks);
          displayTasks();
        });

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
      });

      taskListContainer.appendChild(taskList);
    });
  }

  function saveAllTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

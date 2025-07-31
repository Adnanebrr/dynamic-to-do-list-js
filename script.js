document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn'); 
    const taskInput = document.getElementById('task-input');   
    const taskList = document.getElementById('task-list');     
    function saveTasksToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            const taskText = listItem.firstChild.textContent.trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, save = true) {
        if (taskText === "") {
            alert("Please enter a task!");
            return; 
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); 
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            taskInput.value = "";
            saveTasksToLocalStorage();
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', function() {
        addTask(taskInput.value.trim());
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    loadTasks();
});


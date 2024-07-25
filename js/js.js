document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const datetimeInput = document.getElementById('datetimeInput');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterTasks = document.getElementById('filterTasks');
  
    addTaskButton.addEventListener('click', addTask);
    filterTasks.addEventListener('change', filterTaskList);
  
    function addTask() {
      const taskText = taskInput.value;
      const taskDatetime = datetimeInput.value;
  
      if (taskText === '' || taskDatetime === '') {
        alert('Please enter a task and a date/time');
        return;
      }
  
      const task = document.createElement('li');
      task.classList.add('task-item');

      const texts = document.createElement('div');
      texts.classList.add('texts')
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('click', toggleComplete);
  
      const taskTextElement = document.createElement('span');
      taskTextElement.classList.add('task-text');
      taskTextElement.textContent = taskText;
      
      const taskDatetimeElement = document.createElement('span');
      taskDatetimeElement.classList.add('task-datetime');
      taskDatetimeElement.textContent = new Date(taskDatetime).toLocaleString();
  
      const editButton = document.createElement('button');
      editButton.textContent = '✏️';
      editButton.classList.add('edit');
      editButton.addEventListener('click', () => editTask(task, taskTextElement, taskDatetimeElement));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '🗑️';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', () => deleteTask(task));
  
      task.appendChild(checkbox);
      task.appendChild(texts);
      texts.appendChild(taskTextElement);
      texts.appendChild(taskDatetimeElement);
      task.appendChild(editButton);
      task.appendChild(deleteButton);
      
      taskList.appendChild(task);
      taskInput.value = '';
      datetimeInput.value = '';
    }
  
    function toggleComplete(event) {
      const task = event.target.parentElement;
      task.classList.toggle('completed');
    }
  
    function editTask(task, taskTextElement, taskDatetimeElement) {
      const newTaskText = prompt('Edit task', taskTextElement.textContent);
      const newTaskDatetime = prompt('Edit date/time', taskDatetimeElement.textContent);
      
      if (newTaskText !== null) {
        taskTextElement.textContent = newTaskText;
      }
  
      if (newTaskDatetime !== null) {
        taskDatetimeElement.textContent = new Date(newTaskDatetime).toLocaleString();
      }
    }
  
    function deleteTask(task) {
      taskList.removeChild(task);
    }
  
    function filterTaskList() {
      const filterValue = filterTasks.value;
      const tasks = taskList.childNodes;
      
      tasks.forEach(task => {
        switch (filterValue) {
          case 'all':
            task.style.display = 'flex';
            break;
          case 'completed':
            if (task.classList.contains('completed')) {
              task.style.display = 'flex';
            } else {
              task.style.display = 'none';
            }
            break;
          case 'uncompleted':
            if (!task.classList.contains('completed')) {
              task.style.display = 'flex';
            } else {
              task.style.display = 'none';
            }
            break;
        }
      });
    }
  });
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTask);
filterOption.addEventListener('change', filterTodo);

function addTodo(e) {
  e.preventDefault();

  const taskText = todoInput.value.trim(); // Trim to remove leading/trailing whitespace
  if (taskText) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = taskText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
  }
}

function handleTask(e) {
  const item = e.target;

  if (item.classList.contains('trash-btn')) {
    const todoItem = item.parentElement;
    todoItem.classList.add('fall');
    todoItem.addEventListener('transitionend', function () {
      todoItem.remove();
    });
  }

  if (item.classList.contains('complete-btn')) {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    const mStyle = todo.style;

    if (mStyle != undefined && mStyle != null) {
      switch (e.target.value) {
        case 'all':
          mStyle.display = 'flex';

          break;

        case 'completed':
          if (todo.classList.contains('completed')) {
            mStyle.display = 'flex';
          } else {
            mStyle.display = 'none';
          }

          break;

        case 'uncompleted':
          if (todo.classList.contains('completed')) {
            mStyle.display = 'none';
          } else {
            mStyle.display = 'flex';
          }

          break;
      }
    }
  });
}

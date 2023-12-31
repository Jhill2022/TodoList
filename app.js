const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTask);
filterOption.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)

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

    //Add todo to localstorage

    saveLocalTodos(todoInput.value)

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
    removeLocalTodos(todoItem)
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

function saveLocalTodos(todo) {
  //check --- hey do i already have thing in there?

  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem('todos'));
      }
      todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to localstorage


    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
      })
}

function removeLocalTodos(todo){
    let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}
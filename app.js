const todoButton = document.querySelector(".todo-button")

const todoInput = document.querySelector(".todo-input")

const todoList = document.querySelector(".todo-list")


todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleting)

function addTodo(e){
    e.preventDefault()

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    const completeBtn = document.createElement('button')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    completeBtn.classList.add("complete-btn")
    todoDiv.appendChild(completeBtn)
    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add("trash-btn")
    todoDiv.appendChild(trashBtn)

    todoList.appendChild(todoDiv)

    todoInput.value = '';
}


function deleting(e){

    const item = e.target

    if(item.classList.contains("trash-btn")){
        const todoItem = item.parentElement;
        todoItem.classList.add("fall")
        todoItem.addEventListener("transitionend", function(){
            todoItem.remove()
        })
    }

    if(item.classList.contains("complete-btn")){
        const todo = item.parentElement;

        todo.classList.toggle("completed")
    }
}
//Selectors
const todoInput = document.querySelector(".input-text");
const todoButton = document.querySelector(".input-btn");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteList);
filter.addEventListener("click", filterTodo);


//Functions
//add list
function addTodo(event){
    if (todoInput.value === '') {
        event.preventDefault();
        alert("$ERROR/ YOU MUST WRITE SOMETHING!");
      } 
    else{
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Complete button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    //Remove Button
    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fa fa-trash"></i>';
    removeButton.classList.add("remove-btn");
    todoDiv.appendChild(removeButton);
    //Append to UL
    todoList.appendChild(todoDiv);
    //Clear input bar after select
    todoInput.value ="";
    //No blank input
    }
}
//delete or check list
function deleteList(a){
    const item = a.target;
    //delete todo
    if(item.classList[0] === "remove-btn"){
        const todo = item.parentElement;
        todo.remove();
     }
    //check todo
    if(item.classList[0] === "check-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
//filter list
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display= "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                return;
        }
    });
}

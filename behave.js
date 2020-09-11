//Selectors
const todoInput = document.querySelector(".input-text");
const todoButton = document.querySelector(".input-btn");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");
const clear = document.querySelector(".clear-input");
const time = document.getElementById("time");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteList);
filter.addEventListener("click", filterTodo);
clear.addEventListener("click",resetInput)


//Functions

//Real time
var t = new Date();
time.innerHTML = t.toDateString();
//add list
function addTodo(event){
     //No blank input
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

    //add todos to local storage
    saveLocalTodos(todoInput.value);

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
    }
}
//delete or check list
function deleteList(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === "remove-btn"){
        const todo = item.parentElement;
        removeLocalTodos(todo);
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

function saveLocalTodos(todo) {
    //Check---Hey do i already have things in here?
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {

    //Check---Hey do i already have things in here?
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Complete Button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);

    //Remove Button
    const removeButton = document.createElement("button")
    removeButton.innerHTML = '<i class="fa fa-trash"></i>';
    removeButton.classList.add("remove-btn");
    todoDiv.appendChild(removeButton);

    //append to ul
    todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo) {
        //Check---Hey do i already have things in here?
        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function resetInput(){
    localStorage.clear();
    location.reload();
}

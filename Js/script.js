//Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoinput = document.querySelector('#todo-input');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const todoList = document.querySelector('#todo-list');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const search = document.querySelector('#search-input');

let oldInputValue;

//Funções 

const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoinput.value = ""
}


const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}


const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}

//Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoinput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
})


document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }
        
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle
    }
    
});


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});


editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
})


search.addEventListener('input', function() {
    var searchValue = this.value.toLowerCase();
    var listItems = document.querySelectorAll('.todo');
  
    listItems.forEach(function(item) {
      var text = item.textContent.toLowerCase();
      if (text.includes(searchValue)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
  
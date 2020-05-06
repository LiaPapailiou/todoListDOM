// /* Todo app javascript */
const todoList = [];

// Create <li> elements dynamically
function createList(element, itemOne, itemTwo) {
  element.insertAdjacentHTML('beforeend', `
  <li class="todo-item">
    <span id="todo">${itemOne}</span>
    <br>
    <span id="descr">${itemTwo}</span>
    <button class="done">Done</button>
    <button class="remove">Remove</button>
    </li>
  `);
}

// Main function to add to a clean array
function addToArray(todo, description) {
  const todos = {
    todo,
    description,
  };

  todoList.push(todos);

  const list = document.querySelector('.todo-list');

  // Save todos array in local storage
  localStorage.setItem('todo', JSON.stringify(todoList));
  createList(list, todos.todo, todos.description);

  // Remove item when the remove button is clicked
  function remove(e) {
    if (e.target.className === 'remove') {
      const itemToRemove = e.target.parentNode;
      const parent = itemToRemove.parentNode;
      parent.removeChild(itemToRemove);
    }
  }
  // Mark an item as done and push it to the bottom of the list
  function done(e) {
    if (e.target.className === 'done') {
      const itemToMove = e.target.parentNode;
      const parent = itemToMove.parentNode;
      parent.appendChild(itemToMove);
      itemToMove.classList.toggle('mark-done');
    }
  }

  // Event listeners
  list.addEventListener('click', remove);
  list.addEventListener('click', done);
}

// Form submission
const form = document.querySelector('.todo-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTodo = document.querySelector('.todo');
  const inputDescription = document.querySelector('.description');
  const todoText = inputTodo.value.trim();
  const descriptionText = inputDescription.value.trim();
  if (todoText !== '' && descriptionText !== '') {
    addToArray(todoText, descriptionText);
    inputTodo.value = '';
    inputDescription.value = '';
  }
});

// Load from local storage
function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem('todo'));
  const list = document.querySelector('.todo-list');
  data.forEach((todos) => createList(list, todos.todo, todos.description));
  localStorage.clear();
}

window.onload = loadFromStorage();

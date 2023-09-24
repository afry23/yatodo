const todos = [
  { description: "Buy milk", done: false },
  { description: "Clean kitchen", done: false },
  { description: "Learn JS", done: false },
];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");

for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("input", () => {
  console.log(addTodoInput.value.length);
  addTodoButton.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", addTodo);

function renderTodoInReadMode(todo) {
  console.log("Render", todo);
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = todo.description;

  if (todo.done) {
    span.classList.add("done");
  }

  if (!todo.done) {
    span.addEventListener("dblclick", () => {
      const idx = todos.indexOf(todo);
      todosList.replaceChild(renderTodoInEditMode(todo), todosList.children[idx]);
    });
  }
  li.append(span);

  if (!todo.done) {
    const button = document.createElement("button");
    button.textContent = "Done";
    button.id = "button-done";
    button.addEventListener("click", () => {
      const idx = todos.indexOf(todo);
      doneTodo(idx);
    });
    li.append(button);
  }
  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.description;
  li.append(input);

  const buttonUpdate = document.createElement("button");
  buttonUpdate.textContent = "Update";
  buttonUpdate.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });
  li.append(buttonUpdate);

  const buttonCancel = document.createElement("button");
  buttonCancel.textContent = "Cancel";
  buttonCancel.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    todosList.replaceChild(renderTodoInReadMode(todo), todosList.children[idx]);
  });
  li.append(buttonCancel);

  return li;
}

function doneTodo(index) {
  todos[index].done = true;
  const todo = renderTodoInReadMode(todos[index]);
  todosList.replaceChild(todo, todosList.childNodes[index]);
}

function addTodo() {
  const description = addTodoInput.value;
  const todo = { description: description, done: false };
  if (todoExists(description)) {
    alert("Todo already exists");
    return;
  }
  todos.push(todo);
  todosList.append(renderTodoInReadMode(todo));
  addTodoInput.value = "";
  addTodoButton.disabled = true;
  readTodo(description);
}

function updateTodo(idx, description) {
  todos[idx] = { description: description, done: false };
  const todo = renderTodoInReadMode(todos[idx]);
  todosList.replaceChild(todo, todosList.childNodes[idx]);
}

function todoExists(description) {
  const cleanTodos = todos.map((todo) => todo.description.trim().toLowerCase());
  return cleanTodos.includes(description.trim().toLowerCase());
}

function readTodo(description) {
  const message = new SpeechSynthesisUtterance();
  message.text = description;
  message.voice = speechSynthesis.getVoices()[0];
  speechSynthesis.speak(message);
}

// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklistElem = document.getElementById("tasklist");
// Create a new array called 'taskList'
var taskList = [];

// Set up submit button for Form 
form.addEventListener("submit", function(event) {
  event.preventDefault();

  console.log(form.elements.taskType.value)

  addTask(
    form.elements.taskName.value,
    form.elements.taskType.value,
    form.elements.taskRate.value,
    form.elements.taskTime.value,
    form.elements.taskClient.value,
  )
  console.log(taskList)
})

// Create and display new task object, directly passing in the input parameters
function addTask(name, type, rate, time, client) {
  
  let task = {
    name,
    type,
    id: Date.now(),
    date: new Date().toISOString(),
    rate,
    time,
    client
  }
  // Add the object to the taskList array
  taskList.push(task);
  // Save to local storage
  localStorage.setItem('savedTasks', JSON.stringify(taskList));
  // Display task to user
  displayTask(task);
}

// Add New Task object to DOM
function displayTask(task) {
  let item = document.createElement("li");
  item.setAttribute("data-id", task.id);
  item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p>`;

  tasklistElem.appendChild(item);

  // Clear the value of the input once the task has been added to the page
  form.reset();

  // Setup delete button DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton); // Adds a delete button to every task

  // Listen for when the delete button is clicked
  delButton.addEventListener("click", function(event) {

    taskList.forEach(function(taskArrayElement, taskArrayIndex) {
      if (taskArrayElement.id == item.getAttribute('data-id')) {
        taskList.splice(taskArrayIndex, 1)
      }
    })

    // Make sure the deletion worked by logging out the whole array
    console.log(taskList)
    localStorage.setItem('savedTasks', JSON.stringify(taskList));
    item.remove(); // Remove the task item from the page when button clicked
    // Because we used 'let' to define the item, this will always delete the right element
  })

  
}

//#region My Region
// Fetch previous tasks from Local Storage
let savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
  
  // Check if the item doesn't exist in localStorage by seeing if it is null
  if (savedTasks !== null){

    // Loop through the countries and add their names as list items to the page
    savedTasks.forEach((task) =>{
      taskList.push(task);
      displayTask(task);
    });
  }
//#region

// Call the function with test values for the input paramaters
addTask(Math.floor(Math.random()*1000), "Concept Ideation", 50, 5, "Google");

// Log the array to the console.
console.log(taskList);
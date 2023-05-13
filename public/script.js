// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const songListElem = document.getElementById("tasklist");
const artistAddButton = document.getElementById("artistButton");
const artistTextBox = document.getElementById("artistText");
const artistList = document.getElementById("artistList");
const errorTextElem = document.getElementById("errorText");

// Create a new array called 'taskList'
var songList = [];

// Set up "add" button for artist section of form
artistAddButton.addEventListener("click", function(event) {
  let newArtist = document.createElement("li");
  newArtist.innerHTML = artistTextBox.value;
  artistList.appendChild(newArtist);

  console.log("artist " + newArtist.innerHTML +" added!");
  artistTextBox.value = "";
});

// Set up submit button for Form 
form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (artistList.innerHTML === ''){
    errorTextElem.innerHTML = 'Please add at least 1 artist name';
    return;
  } else{
    errorTextElem.innerHTML = "";
  }

  console.log(form.elements);

  moodArray = [];

  Array.from(form.elements).forEach((input) => {
    if (input.className === "mood"){
      if (input.checked === true){
        moodArray.push(input.value);
      }
    }
  });

  console.log("mood array: " + moodArray);

  addSong(
    form.elements.songTitle.value,
    form.elements.songLink.value,
    form.elements.songYear.value,
    form.elements.songGenre.value,
    moodArray
  );
  console.log(songList);
})

// Create and display new task object, directly passing in the input parameters
function addSong(newTitle, newLink, newYear, newGenre,moodArray) {
  
  let song = {
    title: newTitle,
    link: newLink,
    year: parseInt(newYear),
    genre: newGenre,
    image: null,
    id: Date.now(),
    date: new Date().toISOString(),
    artists:[],
    moods: moodArray
  }

  // add artists
  artistList.childNodes.forEach((child) =>{
    // console.log(child.innerHTML);
    song.artists.push(child.innerHTML);
  });

  artistList.innerHTML = "";
  // Add the object to the taskList array
  songList.push(song);
  // Save to local storage
  localStorage.setItem('savedSongs', JSON.stringify(songList));
  // Display task to user
  displaySong(song);
}

// Add New Task object to DOM
function displaySong(song) {
  let item = document.createElement("li");
  item.setAttribute("data-id", song.id);
  item.innerHTML = `<p><strong>${song.title}</strong><br>
  ${song.genre}</p><br>
  ${song.link}</p><br>
  ${song.year}</p><br>
  ${song.artists.toString()}</p><br>
  ${song.moods.toString()}</p><br>`;


  songListElem.appendChild(item);

  // Clear the value of the input once the task has been added to the page
  form.reset();

  // Setup delete button DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton); // Adds a delete button to every task

  // Listen for when the delete button is clicked
  delButton.addEventListener("click", function(event) {

    songList.forEach(function(songArrayElement, songArrayIndex) {
      if (songArrayElement.id == item.getAttribute('data-id')) {
        songList.splice(songArrayIndex, 1)
      }
    })

    // Make sure the deletion worked by logging out the whole array
    console.log(songList)
    localStorage.setItem('savedSongs', JSON.stringify(songList));
    item.remove(); // Remove the task item from the page when button clicked
    // Because we used 'let' to define the item, this will always delete the right element
  })

  
}

//#region My Region
// Fetch previous tasks from Local Storage
let savedSongs = JSON.parse(localStorage.getItem('savedSongs'));  
// Check if the item doesn't exist in localStorage by seeing if it is null
if (savedSongs !== null){

  // Loop through the countries and add their names as list items to the page
  savedSongs.forEach((task) =>{
    songList.push(task);
    displaySong(task);
  });
}
//#region

// Call the function with test values for the input paramaters
// addTask(Math.floor(Math.random()*1000), "Concept Ideation", 50, 5, "Google");

// Log the array to the console.
console.log(songList);
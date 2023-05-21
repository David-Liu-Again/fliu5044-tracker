// importing images
import images from './images/thumbnails/*.png';
console.log(images);

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
  item.setAttribute("class","wide-card");
  
  // item.innerHTML = `<img src='${songImage}' width='50'/>
  // <p><strong>${song.title}</strong></p><br>
  // <p>${song.genre}</p><br>
  // <p>${song.link}</p><br>
  // <p>${song.year}</p><br>
  // <p>${song.artists.toString()}</p><br>
  // <p>${song.moods.toString()}</p><br>`;

  //Create the top section of the list element
  item.appendChild(generateBasicInfo(song, item));

  // Add the song to the song List element
  songListElem.appendChild(item);

  // Clear the value of the input once the task has been added to the page
  form.reset();
}

function generateBasicInfo(song, item){
// This functions creates all the unhidden DOM elements in a song list item
let basicInfo = document.createElement("section");
basicInfo.className = "basic-info";

// Fetch the thumbnail URL and add it to the DOM
let imagePath = null;
imagePath = images[song.genre];
if (imagePath == null){
  imagePath = './images/thumbnails/Error.png';
  console.log('Thumbnail error');
}
let thumbnail = document.createElement("img");
thumbnail.src = imagePath;
thumbnail.alt = song.genre + " thumbnail";
// Thumbnail is housed in a link element
let imageLink = document.createElement("a");
imageLink.href = song.link;
// link opens in new tab
// I followed this article : https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
imageLink.target = "_blank";
imageLink.rel = "noopener noreferrer";
imageLink.appendChild(thumbnail);
basicInfo.appendChild(imageLink);

// Create div element inside basic-info that houses buttons and text content
let basicContent = document.createElement("div");
basicContent.className = "basic-content";
basicInfo.appendChild(basicContent);

// basic-content is split into two sections: top and bottom
let topSection = document.createElement("section");
topSection.className = "top";
let bottomSection = document.createElement("section");
bottomSection.className = "bottom";
basicContent.appendChild(topSection);
basicContent.appendChild(bottomSection);

// Create div element housing the title and artist of song
let nameArtistDiv = document.createElement("div");
nameArtistDiv.className = "name-artist";
topSection.appendChild(nameArtistDiv);
// Create and add song title DOM element
let titleElem = document.createElement("strong");
titleElem.innerHTML = song.title;
nameArtistDiv.appendChild(titleElem);
// Create and add song artists DOM element
let artistsElem = document.createElement("p");
artistsElem.innerHTML= song.artists.toString();
nameArtistDiv.appendChild(artistsElem);

// Setup the delete Button
let deleteButton = document.createElement("button");
let delButtonText = document.createTextNode("Delete");
deleteButton.appendChild(delButtonText);
topSection.appendChild(deleteButton);
// Listen for when the delete button is clicked
deleteButton.addEventListener("click", function(event) {
  songList.forEach(function(songArrayElement, songArrayIndex) {
    if (songArrayElement.id == song.id) {
      songList.splice(songArrayIndex, 1)
    }
  });
  // Make sure the deletion worked by logging out the whole array
  console.log(songList);
  localStorage.setItem('savedSongs', JSON.stringify(songList));
  item.remove(); // Remove the task item from the page when button clicked
  // Because we used 'let' to define the item, this will always delete the right element
});

// Create and add the "More Info" button
// This goes in the bottom section
let moreButton = document.createElement("button");
let moreButtonText = document.createTextNode("More Info");
moreButton.appendChild(moreButtonText);
moreButton.className = "more-button";
bottomSection.appendChild(moreButton);
// Listen for when the "More Info" button is clicked
moreButton.addEventListener("click", function(event) {
  console.log(song.id);
});

// Create div element housing song mood "tags"
// This goes in the bottom section
let tagsDiv = document.createElement("div");
tagsDiv.className = "tags";
bottomSection.appendChild(tagsDiv);
// Add in each mood associated with a song
song.moods.forEach(function(mood) {
  let moodTag = document.createElement("p");
  moodTag.className = "tag ";
  moodTag.textContent = mood;
  tagsDiv.appendChild(moodTag);
});

return basicInfo;
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


// Log the array to the console.
console.log(songList);
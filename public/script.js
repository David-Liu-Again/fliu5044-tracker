// importing images
import thumbnailImages from './images/thumbnails/*.png';
import uiImages from './images/ui/*.svg';
console.log(uiImages);

// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("songform");
const songListElem = document.getElementById("songlist");
const artistAddButton = document.getElementById("artistButton");
const artistTextBox = document.getElementById("artistText");
const artistListElem = document.getElementById("artist-list");
const msgTextElem = document.getElementById("error-text");
const msgArtistElem = document.getElementById("artist-msg");
const formModal = document.getElementById("formModal");
const addSongButton = document.getElementById("fixed");
const formClose = document.getElementsByClassName("close")[0];

// Create a new array called 'taskList'
var songList = [];

// Backend array to keep track of the artists listed in the form
var artistList = [];

// Set up "add" button for artist section of form
artistAddButton.addEventListener("click", function(event) {
  if (artistTextBox.value==""){
    msgArtistElem.innerHTML = 'Artist name cannot be blank';
    msgArtistElem.classList.add("error");
    return;
  }else if(artistList.indexOf(artistTextBox.value.trim()) != -1){
    //artist name already present on form
    msgArtistElem.innerHTML = 'Artist has already been added';
    msgArtistElem.classList.add("error");
    artistTextBox.value = "";
    return;
  } else{
    msgArtistElem.innerHTML = 'Please add at least 1 artist name. Click to delete an artist.';
    msgArtistElem.classList.remove("error");
  }

  let newArtist = document.createElement("li");
  newArtist.innerHTML = artistTextBox.value.trim();
  artistList.push(artistTextBox.value);
  artistListElem.appendChild(newArtist);
  newArtist.classList.add("artist-tag");
  console.log(artistList);

  newArtist.addEventListener("click", function(event) {
    newArtist.remove(); // Make artist name delete itself when clicked
    const index = artistList.indexOf(newArtist.innerHTML);
    artistList.splice(index,1);
    console.log(artistList);
  });

  console.log("artist " + newArtist.innerHTML +" added!");
  artistTextBox.value = "";
});

{
  // Modal code from  https://www.w3schools.com/howto/howto_css_modals.asp --------

  // When the user clicks on the button, open the modal
  addSongButton.onclick = function() {
    formModal.style.display = "block";
    document.querySelector(".modal-content").scrollIntoView();
  }

  // When the user clicks on <span> (x), close the modal
  formClose.onclick = function() {
    formModal.style.display = "none";
    resetForm();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == formModal) {
      formModal.style.display = "none";
      resetForm();
    }
  }
}


// Set up submit button for Form 
form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (artistListElem.innerHTML === ''){
    msgTextElem.innerHTML = 'Please add at least 1 artist name';
    msgTextElem.classList.add("error");
    return;
  } else{
    msgTextElem.innerHTML = "";
    msgTextElem.classList.remove("error");
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

  msgTextElem.innerHTML = `New song added!`;
  console.log(songList);

  // Clear the value of the input once the task has been added to the page
  resetForm();
})

function resetForm(){
  //function resets the form on close, including removing error messages
  form.reset();
  msgTextElem.innerHTML = "";
  msgArtistElem.innerHTML = 'Please add at least 1 artist name. Click to delete an artist.';
  msgTextElem.classList.remove("error");
  msgArtistElem.classList.remove("error");
  artistListElem.innerHTML="";
  artistList = [];
}

// Create and display new task object, directly passing in the input parameters
function addSong(newTitle, newLink, newYear, newGenre,moodArray) {
  
  let song = {
    title: newTitle,
    link: newLink,
    year: parseInt(newYear),
    genre: newGenre,
    image: null,
    id: Date.now(),
    date: new Date(),
    artists:[],
    moods: moodArray
  }

  // add artists
  artistListElem.childNodes.forEach((child) =>{
    // console.log(child.innerHTML);
    song.artists.push(child.innerHTML);
  });

  artistListElem.innerHTML = "";
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
  item.setAttribute("class","song-card");
  
  //Create the top section of the list element
  let basicInfo = generateBasicInfo(song, item);
  item.appendChild(basicInfo);
  
  //Create the bottom section of the list element
  let hiddenInfo= generateHiddenInfo(song, item);
  item.appendChild(hiddenInfo);
  

  // Listen for when the more-info button is clicked
  let moreButton = item.querySelector(".more");
  let moreButtonText = moreButton.querySelector("p");
  // console.log(moreButtonText);
  let summarisedMoods = basicInfo.querySelector(".summarised");
  console.log(summarisedMoods);

  moreButton.addEventListener("click", function(event) {
    hiddenInfo.hidden = !hiddenInfo.hidden;
    summarisedMoods.hidden = !hiddenInfo.hidden;
    if (!hiddenInfo.hidden){
      // Content is not hidden
      moreButton.classList.add("checked");
      moreButtonText.innerHTML = "Show Less";
    } else {
      // Content is hidden
      moreButton.classList.remove("checked");
      moreButtonText.innerHTML = "Show More";
    }
    console.log(hiddenInfo.hidden);
  });


  // Add the song to the song List element
  songListElem.appendChild(item);


}

function appendMoods(tagsElem, song){
  song.moods.forEach(function(moodArrayElement, moodArrayIndex) {
    // summarised boolean determines whether we are displaying mood tags for the collapsed view
    var summarised = tagsElem.className.includes("summarised");

    if ((moodArrayIndex > 1) && summarised){
      // Limit to two moods for summarised view
      console.log("Summarised moods for " + song.id);
      return;
    }

    let moodTag = document.createElement("p");
    moodTag.className = "tag";
    if (!summarised){
      moodTag.classList.add(moodArrayElement);
    }
    moodTag.textContent = moodArrayElement;
    tagsElem.appendChild(moodTag);
  });
}

function generateBasicInfo(song, item){
  // This functions creates all the unhidden DOM elements in a song list item
  let basicInfo = document.createElement("section");
  basicInfo.className = "basic-info";

  // Fetch the thumbnail URL and add it to the DOM
  let imagePath = null;
  imagePath = thumbnailImages[song.genre];
  if (imagePath == null){
    imagePath = './images/thumbnails/Error.png';
    console.log('Thumbnail error');
  }

  // Thumbnail link opens in new tab
  // I followed this article : https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
  basicInfo.innerHTML = 
  `<div class="thumbnail-area">
    <a href="${song.link}" target="_blank" rel="noopener noreferrer">
      <img class="thumbnail" src="${imagePath}" alt="${song.genre + " Thumbnail"}">
    </a>
  </div>
  <section class="top">
    <div class="name-artist">
      <a href="${song.link}" target="_blank" rel="noopener noreferrer">
        <strong>${song.title}</strong>
        <img src=${uiImages["link"]} alt="link icon">
        <br>
        <p>${song.artists.toString()}</p>
      </a>
    </div>
    <img  class='delete' src=${uiImages["bin"]} alt="delete button">
  </section>

  <section class="bottom">
    <button class="more">
      <img src = "${uiImages["triangle"]}">
      <p>Show More</p>
    </button>

    <div class="tags summarised">
    </div>
  </section>`

  // Listen for when the delete button is clicked
  let deleteButton = basicInfo.querySelector(".delete");
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

  //Add mood tags to the DOM
  let tags = basicInfo.querySelector(".tags");
  appendMoods(tags, song);

  return basicInfo;
}

function generateHiddenInfo(song, item){
  let hiddenInfoContainer= document.createElement("section");
  hiddenInfoContainer.className = "hidden-info";
  hiddenInfoContainer.hidden = true;

  // Used CSS grid generator for below HTML:
  // https://grid.layoutit.com
  hiddenInfoContainer.innerHTML = `
    <div class="mood-area">
      <strong>Moods</strong>
      <div class="tags">
      </div>
    </div>
    <div class="date-area">
      <strong>Date Added</strong>
      <p>${song.date.toString().slice(0, 10)}</p>
    </div>
    <div class="year-area">
      <strong>Year</strong>
      <p>${song.year}</p>
    </div>
  `
  //Add mood tags to the DOM
  let tags = hiddenInfoContainer.querySelector(".tags");
  // console.log(tags);
  appendMoods(tags, song);

  return hiddenInfoContainer;
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


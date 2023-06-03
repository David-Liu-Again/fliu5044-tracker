// Importing images so that they can be added to the DOM where necessary
import thumbnailImages from './images/thumbnails/*.png';
import uiImages from './images/ui/*.svg';

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
const noSongElem= document.getElementById("blank-msg");


// Backend array to store all added songs
var songList = [];

// Backend array to keep track of the artists currently listed in the form
var artistList = [];

// CODE FOR THE ARTIST SECTION OF FORM BEGINS HERE---------------------------------------------------
// Set up the "add" button for the artist section of the form
artistAddButton.addEventListener("click", function(event) {

  if (artistTextBox.value==""){
    // Blank input for an artist is not accepted 
    msgArtistElem.innerHTML = 'Artist name cannot be blank';
    msgArtistElem.classList.add("error");
    return; //Nothing is added

  }else if(artistList.indexOf(artistTextBox.value.trim()) != -1){
    //If an artist name already present on form it is not accepted
    msgArtistElem.innerHTML = 'Artist has already been added';
    msgArtistElem.classList.add("error");
    artistTextBox.value = "";
    return; //Nothing is added

  } else{
    // The default instructions become visible again once input is entered correctly
    msgArtistElem.innerHTML = 'Please add at least 1 artist name. Click to delete an artist.';
    msgArtistElem.classList.remove("error");
  }

  // below code executes only if input is valid

  // Create a DOM element representing a new artist and display it
  let newArtist = document.createElement("li");
  newArtist.innerHTML = artistTextBox.value.trim();
  artistList.push(artistTextBox.value);
  artistListElem.appendChild(newArtist);
  newArtist.classList.add("artist-tag");

  newArtist.addEventListener("click", function(event) {
    // This function allows the user to delete an displayed artist name if it is clicked
    newArtist.remove(); 
    const index = artistList.indexOf(newArtist.innerHTML);
    artistList.splice(index,1);
    console.log(artistList);
  });

  // Reset the text box input
  artistTextBox.value = "";
});

// CODE FOR THE FORM SUBMISSION FUNCTIONALITY BEGINS HERE---------------------------------
// Set up submit button for Form 
form.addEventListener("submit", function(event) {
  // disable default functionality of the form submit
  event.preventDefault();

  if (!artistListElem.hasChildNodes()){
    // If any form field is empty the form will not submit
    // Since the artist section of the form is custom, we have to perform input verification manually
    msgTextElem.innerHTML = 'Please add at least 1 artist name';
    msgTextElem.classList.add("error");
    return;
  } else{
    msgTextElem.innerHTML = "";
    msgTextElem.classList.remove("error");
    console.log(artistListElem.childNodes);
  }

  moodArray = [];
  Array.from(form.elements).forEach((input) => {
    // Store all the selected moods for the new song inside the above array
    if (input.className === "mood"){
      if (input.checked === true){
        moodArray.push(input.value);
      }
    }
  });

  //Create backend record of song and display it to user
  addSong(
    form.elements.songTitle.value,
    form.elements.songLink.value,
    form.elements.songYear.value,
    form.elements.songGenre.value,
    moodArray
  );

  // Give confirmaton feedback to user
  msgTextElem.innerHTML = `New song added!`;

  // Clear the value of the inputs once the task has been added to the page
  resetForm();
})

function resetForm(){
  //This function resets the form on close, including removing error messages
  form.reset();
  msgTextElem.innerHTML = "";
  msgArtistElem.innerHTML = 'Please add at least 1 artist name. Click to delete an artist.';
  msgTextElem.classList.remove("error");
  msgArtistElem.classList.remove("error");
  //remove all displayed arstist names from form
  while (artistListElem.hasChildNodes()){
    artistListElem.removeChild(artistListElem.firstChild);
  }
  artistList = [];
}

// CODE FOR THE FORM'S POPUP FUNCTIONALITY BEGINS HERE---------------------------------
// Modal/pop-up code from  https://www.w3schools.com/howto/howto_css_modals.asp --------

// When the user clicks on the "Add SOng" button in the bottom right, open the modal
addSongButton.onclick = function() {
  formModal.style.display = "block";
  document.querySelector(".modal-content").scrollIntoView();
}

// When the user clicks on the "x" button in the popup, close the modal
formClose.onclick = function() {
  formModal.style.display = "none";
  resetForm();
}

// When the user clicks anywhere outside of the pop-up, close it
window.onclick = function(event) {
  if ((event.target == formModal) && (screen.width > 900)) {
    // This function is disabled for mobile to prevent users accidentally closing the form
    formModal.style.display = "none";
    resetForm();
  }
}

// CODE FOR CREATING AND DISPLAYING SONGS BEGINS HERE---------------------------------
function addSong(newTitle, newLink, newYear, newGenre,moodArray) {
  // Create and display new song object, directly passing in the input parameters
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

  // add artists directly from the DOM element
  artistListElem.childNodes.forEach((child) =>{
    if (child.innerHTML != null){
      console.log(child);
      song.artists.push(child.innerHTML);
    }
  });

  // Add the object to the array
  songList.push(song);

  // Save to local storage
  localStorage.setItem('savedSongs', JSON.stringify(songList));
  
  // Display song to user
  displaySong(song);

  checkBlank();
}

function displaySong(song) {
  // Add New Song object to DOM
  //(display information about it to the user)

  // setup DOM element
  let item = document.createElement("li");
  item.setAttribute("data-id", song.id);
  item.setAttribute("class","song-card");

  // Displayed song elements have a collapsed/truncated view containing less information and a
  // expanded view containing more informaton
  
  // Create the basic info section of the list element
  // This section is visible when song element is in collapsed view
  let basicInfo = generateBasicInfo(song, item);
  item.appendChild(basicInfo);
  
  // Create the expanded info section of the list element
  // This section is visible when song element is in expanded view
  let hiddenInfo= generateHiddenInfo(song, item);
  item.appendChild(hiddenInfo);
  
  // Setting up variables for our HTML elements to enable user to expand/collapse song element
  let moreInfoButton = item.querySelector(".more");
  let moreButtonText = moreInfoButton.querySelector("p");
  // User only sees up to 2 moods associated with a song in collapsed view
  // This summarised moods view corresponds to the variable on the below line
  let summarisedMoods = basicInfo.querySelector(".summarised");
  
  
  moreInfoButton.addEventListener("click", function(event) {
    // Listen for when the more-info button is clicked

    // This toggles the expands/collapses the song element
    hiddenInfo.hidden = !hiddenInfo.hidden;

    // We hide the summarised moods as there is a more comprehensive view
    // of the song's moods in the (un)hidden info of the song element
    summarisedMoods.hidden = !hiddenInfo.hidden;

    // Alter appearance of "More Info" button, depending on whether song element is expanded or truncated
    if (!hiddenInfo.hidden){
      // Content is not hidden
      moreInfoButton.classList.add("checked");
      moreButtonText.innerHTML = "Show Less";
    } else {
      // Content is hidden
      moreInfoButton.classList.remove("checked");
      moreButtonText.innerHTML = "Show More";
    }
  });

  // Add the song to the songlist element to actually display it
  songListElem.appendChild(item);
}

function generateBasicInfo(song, item){
  // function called in displaySong()
  // This functions creates all the unhidden DOM elements in a song list item
  // The basic info section is visible when song element is in collapsed view
  let basicInfo = document.createElement("section");
  basicInfo.className = "basic-info";

  // Fetch the thumbnail genre image URL and add image to the DOM
  let imagePath = null;
  imagePath = thumbnailImages[song.genre];
  if (imagePath == null){
    // In case there is a problem fetching the URL
    imagePath = './images/thumbnails/Error.png';
    console.log('Thumbnail error');
  }

  // Clicking on the thumbnail, song title or artist name(s) opens the song's link in new tab
  // I followed this article for guidance: https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
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

    // Remove song from backend array
    songList.forEach(function(songArrayElement, songArrayIndex) {
      if (songArrayElement.id == song.id) {
        songList.splice(songArrayIndex, 1)
      }
    });

    // Make sure the deletion worked by logging out the whole array
    console.log(songList);

    // Update local storage to reflect deletion
    localStorage.setItem('savedSongs', JSON.stringify(songList));
    item.remove(); // Remove the song item from the page when button clicked
    // Because we used 'let' to define the item, this will always delete the right element

    checkBlank();
  });

  //Add mood tag elements to the basic info div
  let tags = basicInfo.querySelector(".tags");
  appendMoods(tags, song);

  return basicInfo;
}

function generateHiddenInfo(song, item){
  // function called in displaySong()
  // This functions creates all the hidden DOM elements in a song list item
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
  appendMoods(tags, song);

  return hiddenInfoContainer;
}

function appendMoods(tagsElem, song){
  // function called in generateBasicInfo() and generateHiddenInfo()
  // This function creates DOM elements to represent moods associated with a song

  song.moods.forEach(function(moodArrayElement, moodArrayIndex) {
    // summarised boolean determines whether we are displaying mood tags for the collapsed or expanded view of a song
    var summarised = tagsElem.className.includes("summarised");

    if ((moodArrayIndex > 1) && summarised){
      // Limit to two moods for summarised view
      console.log("Summarised moods for " + song.id);
      return;
    }

    let moodTag = document.createElement("p");
    moodTag.className = "tag";
    if (!summarised){
      //Moods are only coloured in expanded view
      moodTag.classList.add(moodArrayElement);
    }

    moodTag.textContent = moodArrayElement;
    tagsElem.appendChild(moodTag);
  });
}

// CODE FOR LOADING SONGS FROM LOCAL STORAGE BEGINS HERE---------------------------------
let savedSongs = JSON.parse(localStorage.getItem('savedSongs'));  
if (savedSongs !== null){
  // Loop through the songs and add them to the DOM and backend array
  savedSongs.forEach((song) =>{
    songList.push(song);
    displaySong(song);
  });
}
checkBlank();

// MISC CODE BEGINS HERE---------------------------------

function checkBlank(){
  // display a message to user if there are no songs visible
  if (songList.length == 0){
    noSongElem.innerHTML = "No Songs have been added yet :(";
  } else{
    noSongElem.innerHTML = "";
  }
}

// Log the array to the console.
console.log(songList);


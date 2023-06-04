# 🎶 My Song History

This a simple web application for keeping track of what songs you have listened to.

## Setup
**Please make sure you have [node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine before running this setup procedure.**

1. Clone this Github repository onto your local machine.
2. In your chosen terminal, navigate to the root directory of the local cloned repository.
3. Run  the command `npm i` in your terminal. This installs all necessary dependencies. 
4. Run  the command `npm run dev` in your terminal. This starts the web app itself. The URL of the web app should appear in your terminal (e.g. `localhost:1234`)
5. Open up any browser and copy-paste the URL from your terminal into the search bar. Then hit enter.
6. The web app should load. Now you can add songs to your heart's content. Wow. 

## Screen Configurations
The web app is responsive and should work with most desktop and mobile resolutions. During development, the following two resolutions were used for testing:
+ Desktop Monitor **(1920px x 1080px)**
+ Samsung Galaxy S8+ **(360px x 740px)**

## Development Process

### Iteration 1 - Functional but Ugly

<img width="500" alt="iteration 1 form" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/1f9cd4c3-0134-4e5b-9b62-a6daf1da164a">

<img width="500" alt="iteration 1 songs" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/6a0a27c4-de58-416f-a113-73e7ff08ca74">

Development began by cloning a single-page, generic task tracker template (thanks Rob) and changing the form fields to accommodate the data that needed to be stored about each song. The user interface was extremely messy, but the core functionality of the web app was mostly there. Users could add songs via a form at the top of the page. The form inputs for moods and artist names were not yet coded due to their complexity.

### Iteration 2 - Better Functionality
<img width="500" alt="iteration 2 songs" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/a8ae0f7b-8eb5-4ae4-bfb2-f8e2a2353f21">

<img width="500" alt="iteration 2 form" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/702877de-e0ad-451c-857a-a05a246c1046">

<br>

Some basic styling was applied to the app, for faster debugging and iteration. Moods and artists could now be added to songs via the form. Whilst testing out the form, I realised that users could get away with submitting a form without inputting an artist, since the functionality for adding artist names was more than simple text input. I had to manually check (with JavaScript) that the user had input an artist name when they submitted the form, which is something that probably applies to any custom form input system.

Also, following feedback on my proposed design for the app, I decided to change the layout. Previously, the "Add New Song" form and the list of songs were two sections of one long webpage. Users had to scroll up and down to access the form or view a particular song in the list, which was time-consuming. So, I turned the form into a modal pop-up that could be accessed anywhere, from the button fixed to the bottom right of the screen. This will make the user experience more efficient.

### Iteration 3 - Cleaning it up
This stage was all about applying CSS styles to make the web app look professional. I opted for a dark, subtle colour palette, inspired by the Spotify interface. 

#### Desktop
<img width="500" alt="iteration 3 desktop songs" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/d8efb793-0e19-476c-a442-19bb39751697">

<img width="500" alt="iteration 3 desktop form top" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/e06d807a-d816-4897-9822-ff6d9be3453f">

<img width="500" alt="iteration 3 desktop form bottom" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/edef91f3-4947-463b-a7e7-2589433f3722">

Feedback on the design indicated that users did not recognise that a song's title, artist name(s), and image were links that would open a new tab. I added some styling to make this function more obvious. This included adding the link icon to the right of the song title and making the song title and artist name underlined when users hovered over them, since the underlined text is usually associated with a link. I reduced the brightness of the images slightly. The images now only return to full brightness when the mouse is hovered over them, to signify interactivity.

#### Mobile

<img height="400" alt="iteration 3 mobile songs" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/e084ec58-31ab-4161-a009-3423cb438420">

<img height="400" alt="iteration 3 mobile songs" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/a1dadb6f-791e-4550-9abd-a7c42fe22e8f">

<img height="400" alt="iteration 3 mobile songs" src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/978e2aee-11e6-4b39-8f1d-34c0cb65e1ab">

A few concessions were made for mobile users. The most prominent one, from a development perspective, was simplifying the structure of the song element. All of the content visible in the collapsed view of a song element (e.g. the thumbnail, artist and song name, delete button) used to be contained in nested divs with flexbox display styling. However, when it came to the mobile styling, I wanted to alter the overall layout of this content, so that the "Show More" button and mood tags would be under the thumbnail, rather than beside it. This was hard to do with flexbox divs and I ended up replacing multiple divs with just one and styling it with a CSS grid so that the layout could be changed between mobile and desktop. In the future, it's better for complex layouts to be styled with a CSS grid. Flexbox only suits single columns/rows.

## Future Improvements
Currently, the functionality of My Song History is very basic. The typical user journey for this app is as follows:
1.	The user listens to a song they like on a streaming platform, the radio, or elsewhere.
2.	They open up the app and click the bottom-right button to add a song.
3.	They manually fill in the form with details related to their song. If they don't know what data to enter (e.g. they don't know what year a song was released), they might make it up or search online for the correct data.
4.	The user submits the form and the song is added to the list view.
5.	Over time, the user builds up a list of songs they like, by adding and deleting songs when they feel like it.

Some users might find that the app has utility, in that it is a convenient place to learn about and listen to their favourite music. However, during development, I came up with several ideas on how to improve and expand its functionality. Here are a few:


### 🔍Filter and Sort Functions
![filter and search functions](https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/08fe670a-e31d-499e-b878-dd1f693b9f08)

The initial design for My Song History included a search bar, placed above the list of added songs. Users could enter an artist name, genre, year of release, or mood and the list below would automatically filter for any songs matching the user input, as the user types. Left of the search bar was a dropdown and toggle button, to allow users to sort the order of the songs in the list below. They could sort songs by artist name, year of release, song title, or date added by selecting an option on the dropdown. The toggle button would reverse the sort order when clicked.

This functionality is found in most search engines and music-streaming websites. Users would likely expect something like this, so it would be beneficial to add it in future iterations.

###  🔄 Auto-save and "Reset" button for Form
Currently, the form resets itself when the user closes it. It would be better if the form automatically saved the user's input as they entered it, even if they closed the form or the browser tab. Then the user would not have to type in the details of their song all over again. To complement this, a "reset" button could be placed near the top of the form. When clicked, it would clear all the user input from the form. this would be useful if, halfway through filling out the form, a user decided that they no longer wanted to add a song.

### 🔮Autofill for Form
<img src="https://github.com/David-Liu-Again/fliu5044-tracker/assets/128761089/db280760-fc09-4d39-bc1d-2ab3419dfff8"  width="400" height="auto" style="margin = 0 auto">

As a user types in the title of a song, the web app would present the names of existing songs under the textbox, using an API linked to some music-related database. This would function like the suggestions on Google or the most popular search engines. Clicking on a suggested song would auto-fill most of the form fields (e.g. year of release, genre), based on API data. This would make the form-filling process much more efficient.

### 📝 Edit Existing Songs
Allowing the users to change the details of existing songs after they have been added to the app would be highly beneficial. Users could use the feature to fix typos and factually incorrect data, or add/remove moods to the song, as their interpretation of the music changes.

## Bibliography
### Images, Fonts and Icons
+ Wireframe kit . (n.d.) [Assets]. Patrik Melis. Retrieved April 29, 2023, from https://www.figma.com/community/file/1148152271646787632/WireframeKitMaterial design 
+ icons. (n.d.). smrkv. Retrieved April 29, 2023, from https:// www.figma.com/community/file/878585965681562011/Material-DesignIcons
+ Multiple images from:
  + Unsplash. (n.d.). Unsplash. Unsplash. Retrieved June 3, 2023, from http://unsplash.com 
+  Pellennec, S. (2011). Film texture - grain explosion [Image]. https:// www.deviantart.com/stephanepellennec/art/Film-texture-grainexplosion-194364262
+  flaticon. (n.d.). Exit Top Right free icon. https://www.flaticon.com/free-icon/exit-top-right_82118?term=link&#38;page=1&#38;position=19&#38;origin=tag&#38;related_id=82118
+  Giron, J. (1993). Kurt Cobain. https://www.npr.org/sections/therecord/2014/04/05/299197941/weve-never-stopped-thinking-about-kurt-cobain
+  Moon Armada. (n.d.). Head of Baby Doll with Wires coming out of it. https://www.musicradar.com/news/10-weirdest-musical-instruments
+  Getty Images (n.d.). Slash the Guitarist. https://loudwire.com/slash-how-technology-changed-soul-rock-music-interview/
+  Imgur. (n.d.). Concrete Texture. Retrieved June 3, 2023, from https://imgur.com/9TNATCF
+    Google. (n.d.). Autocomplete occuring on Google search bar. https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/sf_autocomplete_search.jpg
+      ijeab. (n.d.). Metal Texture. https://www.freepik.com/free-photo/metal-texture-with-dust-scratches-cracks-textured-backgrounds_1235314.htm#query=grunge%20overlay&#38;position=0&#38;from_view=keyword&#38;track=ais

### Fonts and Icons
+  SiPanji. (2022, August 31). Zombies coming graffiti font. Fontspace. https://www.fontspace.com/zombies-coming-graffiti-font-f84155 
+ Pinhorn, J. (n.d.) Poppins. Google Fonts. https://fonts.google.com/specimen/Poppins

### Code
+   How to make a modal box with CSS and javascript. (n.d.). Retrieved June 3, 2023, from https://www.w3schools.com/howto/howto_css_modals.asp
+   Koishigawa, K. (2020, September 8). How to use HTML to open a link in a new tab. freeCodeCamp.Org. https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
+   Layoutit Grid — CSS Grids layouts made easy! (n.d.). Layoutit Grid. Retrieved June 3, 2023, from https://grid.layoutit.com
+   Checkbox display as button. (n.d.). CodePen. Retrieved June 3, 2023, from https://codepen.io/attilahajzer/pen/WbbLpe

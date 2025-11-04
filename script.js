console.log("This text means the javascript is working!!");
//GLOBAL VARIABLES
//ARRAY of all song data
const songs = [
  //Open arms
  {
    coverImage: "/images/song-covers/Troy_Saga.jpg",
    songFile: "/audio/Open-Arms.mp3",
    songName: "Open Arms",
  },
  //Remember Them
  {
    coverImage: "/images/song-covers/Cyclops_Saga.jpg",
    songFile: "/audio/Remember-Them.mp3",
    songName: "Remember Them",
  },
  //Ruthlessness
  {
    coverImage: "/images/song-covers/The_ocean_saga2.jpg",
    songFile: "/audio/Ruthlessness.mp3",
    songName: "Ruthlessness",
  },
  //Would'nt you like
  {
    coverImage: "/images/song-covers/The_Circe_Saga.jpg",
    songFile: "/audio/Wouldn't-You-Like.mp3",
    songName: "Would'nt you like",
  },
  //Monster
  {
    coverImage: "/images/song-covers/Underworld_Saga.jpg",
    songFile: "/audio/Monster.mp3",
    songName: "Monster",
  },
  //Scylla
  {
    coverImage: "/images/song-covers/Thunder_Saga.jpg",
    songFile: "/audio/Scylla.mp3",
    songName: "Scylla",
  },
  //Legendary
  {
    coverImage: "/images/song-covers/Wisdom_Saga.jpg",
    songFile: "/audio/Legendary.mp3",
    songName: "Legendary",
  },
  //Dangerous
  {
    coverImage: "/images/song-covers/Vengeance_Saga.jpg",
    songFile: "/audio/Dangerous.mp3",
    songName: "Dangerous",
  },
  //Odysseus
  {
    coverImage: "/images/song-covers/Ithaca_Saga.jpg",
    songFile: "/audio/Odysseus.mp3",
    songName: "Odysseus",
  },
];
//sets the first song
let songIndex = 0;
//get a reference for the play button
const playButton = document.getElementById("pause-play-button");
//get a reference for the skip back button
const skipBackButton = document.getElementById("skip-back-button");
//get a reference for the skip forward button
const skipForwardButton = document.getElementById("skip-forward-button");
//get a reference for the volume bar
const soundBar = document.getElementById("volume-bar");
//get a reference to the text elements
const trackTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
//get a reference to the seek bar
const seekBar = document.getElementById("seek-bar");
//audio object to manage loading and playback
let myAudio = new Audio("audio/Open-Arms.mp3");
//store if the user is interacting with the bar
let isSeeking = false;
//get a reference for the current song image
const currentSongImg = document.getElementById("current-song-img");
//get a reference for the current song name
const currentSongName = document.getElementById("song-name-text");

//SONG SELECTORS
//get a reference for open arms
const openArmsBtn = document.getElementById("open-arms");
//get a reference for remember them
const rememberThemBtn = document.getElementById("remember-them");
//get a reference for ruthlessness
const ruthlessnessBtn = document.getElementById("ruthlessness");
//get a refenence for wouldn't you like
const wouldntYouLikeBtn = document.getElementById("wouldn't-you-like");
//get a reference for monster
const monsterBtn = document.getElementById("monster");
//get a reference for scylla
const scyllaBtn = document.getElementById("scylla");
//get a refence for legendary
const legendaryBtn = document.getElementById("legendary");
//get a reference for dangerous
const dangerousBtn = document.getElementById("dangerous");
//get a reference for odysseus
const odysseusBtn = document.getElementById("odysseus");

//LISTENERS
const trackBtns = document.getElementsByClassName("trackBtn");
for (let i = 0; i < trackBtns.length; i++) {
  // console.log(trackBtns[i]) test to make sure it works
  trackBtns[i].onclick = (event) => {
    // console.log(event.target.dataset.id)
    songIndex = event.currentTarget.dataset.id;
    playSong();
    playButton.src = "images/play.svg";
  };
}
//listen for an audio load event
myAudio.onloadedmetadata = () => {
  //makes sure track time is 0
  trackTime.innerHTML = formatTime(0);
  //set totalTime to the song duration
  totalTime.innerHTML = formatTime(myAudio.duration);
  //set the bar max to match the total time however round down as decimals don't work
  seekBar.max = Math.floor(myAudio.duration);
  //set the bar to 0
  seekBar.value = 0;
  //set the volume to max
  soundBar.value = 100;
};
//when the play button is clicked, play or pause the audio according to the state
playButton.onclick = () => {
  if (myAudio.paused == true) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
};
//manage play - pause icon
myAudio.onplay = () => {
  playButton.src = "images/pause.svg";
};
myAudio.onpause = () => {
  playButton.src = "images/play.svg";
};
//when time updates, update the text too
myAudio.ontimeupdate = () => {
  trackTime.innerHTML = formatTime(myAudio.currentTime);
  //update the seekbar when user not interacting with it
  if (isSeeking == false) {
    seekBar.value = Math.floor(myAudio.currentTime);
  }
};
//when user interacts with the seekbar
seekBar.oninput = () => {
  isSeeking = true;
};
//on seekbar change, update time
seekBar.onchange = () => {
  myAudio.currentTime = seekBar.value;
  //if the audio is playing, change after interaction
  if (myAudio.paused == false) {
    myAudio.play();
  }
  //set isSeeking to false
  isSeeking = false;
};

soundBar.oninput = () => {
  if (myAudio) {
    myAudio.volume = soundBar.value / 100;
  }
};

skipForwardButton.onclick = () => {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  console.log(songIndex);
  playSong();
  playButton.src = "images/play.svg";
};

skipBackButton.onclick = () => {
  if (songIndex < 1) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  console.log(songIndex);
  playSong();
  playButton.src = "images/play.svg";
};

myAudio.onended = () => {
    // console.log(songIndex);
    // console.log(songs.length-1);
    // console.log(songIndex == songs.length-1);
  if (Number(songIndex) === songs.length-1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  playSong();
  playButton.src = "images/pause.svg";
  myAudio.play();
};

//SWITCHES
// openArmsBtn.onclick = () =>{
//     myAudio.pause = true;
//     trackTime.innerHTML = formatTime(0);
//     myAudio = new Audio("/audio/Open-Arms.mp3");
// }

// rememberThemBtn.onclick = () =>{
//     trackTime.innerHTML = formatTime(0);
//     myAudio.pause = true;

//     myAudio = new Audio("/audio/Remember-Them.mp3");
// }

/**
 * This formatTime function will format time from seonds to a readable time
 * @param {number} secs
 * @returns {string} a string with hrs:mins:secs or min:sec if hrs = 00
 */
function formatTime(secs) {
  let hours = Math.floor(secs / 3600);
  let minutes = Math.floor((secs - hours * 3600) / 60);
  let seconds = Math.floor(secs - hours * 3600 - minutes * 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (hours > 0) {
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ":" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
}

function playSong() {
  let data = songs[songIndex];
  myAudio.src = data.songFile;
  currentSongImg.src = data.coverImage;
  currentSongName.innerHTML = data.songName;
}

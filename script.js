console.log("This text means the javascript is working!!")
//GLOBAL VARIABLES
//get a reference for the play button
const playButton = document.getElementById("pause-play-button");
//get a reference for the skip back button
const skipBackButton = document.getElementById("skip-back-button")
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
const myAudio = new Audio("audio/Open-Arms.mp3");
//store if the user is interacting with the bar
let isSeeking = false;

//LISTENERS
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
    soundBar.value = 1
}
//when the play button is clicked, play or pause the audio according to the state
playButton.onclick = () =>{
    if(myAudio.paused == true){
        myAudio.play();
    }else{
        myAudio.pause();
    }
}
//manage play - pause icon
myAudio.onplay = () =>{
    playButton.src = "images/pause.svg"
}
myAudio.onpause = () =>{
    playButton.src = "images/play.svg"
}
//when time updates, update the text too
myAudio.ontimeupdate = () =>{
    trackTime.innerHTML = formatTime(myAudio.currentTime);
    //update the seekbar when user not interacting with it
    if(isSeeking == false){
        seekBar.value = Math.floor(myAudio.currentTime);
    }
}

seekBar.onchange = () =>{
    myAudio.currentTime = seekBar.value
}

soundBar.onchange = () =>{
    if (myAudio){
        myAudio.volume = soundBar.value / 100;
    }

    volumeTracker = soundBar.value/100;
}

/**
 * This formatTime function will format time from seonds to a readable time
 * @param {number} secs
 * @returns {string} a string with hrs:mins:secs or min:sec if hrs = 00
 */
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}
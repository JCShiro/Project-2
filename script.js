console.log("This text means javascript is working!!")


/**
 * This formatTime function will format time from seonds to a readable time
 * @param {number} secs
 * @returns {string} a string with hrs:mins:secs or min:sec if hrs = 00
 */
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    if (hours < 10){
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
    } else  {
        return minutes + ":" + seconds;
    }
}
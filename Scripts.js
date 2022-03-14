// 1. ytplayer code: https://developers.google.com/youtube/player_parameters#IFrame_Player_API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

FocusedOn = 0;

//Replaces video
function ReplaceVid() {
    temp = document.getElementById("YoutubeURL").value;
    if (temp.indexOf("?") != -1 && temp.indexOf("v=") != -1) {
      player.loadVideoById(temp.substring(temp.indexOf("v=")+2));
    } else if (temp.indexOf("/") != -1) {
      player.loadVideoById(temp.substring(temp.lastIndexOf("/")+1));
    } else {
      player.loadVideoById(document.getElementById("YoutubeURL").value);
    }
    //document.getElementById('EndTime').placeholder = "End loop (default: " + player.playerInfo.duration + ")";
}

//Handles all resizings
function reSizes() {
    document.getElementById('ytplayer').height = 9/16* document.getElementById('ytplayer').clientWidth;
}
window.addEventListener('resize', reSizes);

//Handles Buttons Under the loop inputs
function clearNum(startOrEnd) {
  if (startOrEnd == 0) {
    document.getElementById('StartTime').value = '';
  } else {
    document.getElementById("EndTime").value = '';
  }
}
function currentTimeSetTo(startOrEnd) {
  /* https://youtu.be/3MF4-KGwBz8 */
  ez = player.playerInfo.currentTime;

  days = Math.floor(ez/86400);
  hours = Math.floor((ez%86400)/3600);
  if (days != 0 && hours < 10) { hours = "0" + hours; }
  minutes = Math.floor((ez%3600)/60);
  if (hours != 0 && minutes < 10) { minutes = "0" + minutes; }
  seconds = Math.floor(ez%60);
  if (minutes != 0 && seconds < 10) { seconds = "0" + seconds; }

  fullPrint = days + ":" + hours + ":" + minutes + ":" + seconds;
  while (true) {
    if (fullPrint.substring(0, fullPrint.indexOf(":")) == "00" || fullPrint.substring(0, fullPrint.indexOf(":")) == "0") {
      fullPrint = fullPrint.substring(fullPrint.indexOf(":")+1);
    } else {
      break
    }
  }
  
  if (startOrEnd == 0) {
    document.getElementById("StartTime").value = fullPrint;
  } else {
    document.getElementById("EndTime").value = fullPrint;
  }
}

//handles moving video forward/backward a set amount
function move(amt) {
  player.seekTo(player.playerInfo.currentTime + amt, true);
}

//Handles Keyboard Navigation
document.addEventListener("keydown", function(event) {
  if (event.code === 'Enter') {
    if (FocusedOn == 1) { ReplaceVid(); }
    if (FocusedOn == 2) { clearNum(0); }
    if (FocusedOn == 3) { currentTimeSetTo(0); }
    if (FocusedOn == 4) { clearNum(1); }
    if (FocusedOn == 5) { currentTimeSetTo(1); }

    if (FocusedOn == 6) { move(-15); }
    if (FocusedOn == 7) { move(-10); }
    if (FocusedOn == 8) { move(-5); }

    if (FocusedOn == 9) { move(5); }
    if (FocusedOn == 10) { move(10); }
    if (FocusedOn == 11) { move(15); }
  }
});

function focusChange(changeTo, doReset) {
  if (doReset == 1 && FocusedOn == changeTo) {
    FocusedOn = 0;
  } else {
    FocusedOn = changeTo;
  }
}

//Forces video to start at user inputted time
//Forces video to go back to user inputted time
setInterval(function() {
  curTime = player.playerInfo.currentTime;
  dur = player.playerInfo.duration;
  
  startTime = 0;
  if (document.getElementById('StartTime').value != "") {
    temp = document.getElementById('StartTime').value.split(":");
    for (let i = 0; i < temp.length; i++) {
      try {
        if (i != 3) {
          startTime += temp[temp.length-1-i]*Math.pow(60, i);
        } else {
          startTime += temp[temp.length-1-i]*86400;
        }
      } catch (error) {
        startTime = null;
        break;
      }
    }
  }

  endTime = dur;
  if (document.getElementById('EndTime').value != "") {
  endTime = 0;
  temp = document.getElementById('EndTime').value.split(":");
    for (let i = 0; i < temp.length; i++) {
      try {
        if (i != 3) {
          endTime += temp[temp.length-1-i]*Math.pow(60, i);
        } else {
          endTime += temp[temp.length-1-i]*86400;
        }
      } catch (error) {
        endTime = null;
        break;
      }
    }
  }

  //console.log(startTime + "   " + endTime);

  if (curTime == dur) {
    try {
      player.seekTo(startTime, true);
    } catch (error) {
      player.seekTo(0, true);
    }
  }
  if (startTime != null) {
    if (curTime < startTime) {
      player.seekTo(startTime, true);
    }
    if (endTime != null) {
      if (curTime >= endTime) {
        player.seekTo(startTime,true);
      }
    }
  }
},1000);

//Makes initial Video
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '360',
    width: '100%',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      playlist: 'M7lc1UVf-VE',
      loop: 1,
    }
  });
  reSizes();
}

/*
<div class = "ButtonTemplate ButtonTop" id = "YoutubeURL2" tabindex="0" onclick="clicked(this)">
  Click to Replace Video
</div>
function clicked(thisThing) {
  console.log(thisThing.id)
}

const form = document.getElementById('form');
form.addEventListener('focus', (event) => {
  event.target.style.background = 'pink';
}, true);
form.addEventListener('blur', (event) => {
  event.target.style.background = '';
}, true);
*/
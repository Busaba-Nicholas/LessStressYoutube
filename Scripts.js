// 1. ytplayer code: https://developers.google.com/youtube/player_parameters#IFrame_Player_API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Replaces video
document.getElementById("YoutubeURL2").addEventListener("click", function() {
    temp = document.getElementById("YoutubeURL").value;
    id = temp.substring(temp.indexOf("?v=")+3);
    player.loadVideoById(id);
});
document.getElementById("YoutubeID2").addEventListener("click", function() {
  id = document.getElementById("YoutubeID").value;
  player.loadVideoById(id);
});

//Handles all resizings
function reSizes() {
    //VideoHeight
    document.getElementById('ytplayer').height = 9/16* document.getElementById('ytplayer').clientWidth;
    //Text size
    document.getElementById('YoutubeURL').fontSize = "clamp(1vw, 10px, 20ww);";
}
window.addEventListener('resize', reSizes);

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

//Forces video to start at user inputted time
//Forces video to go back to user inputted time
setInterval(function() {
    if (document.getElementById('StartTime').value != "") {
      if (player.playerInfo.currentTime < document.getElementById('StartTime').value) {
        player.seekTo(document.getElementById('StartTime').value, true);
      }
      if (document.getElementById('EndTime').value != "") {
        if (player.playerInfo.currentTime >= document.getElementById('EndTime').value) {
          player.seekTo(document.getElementById('StartTime').value,true);
        }
      }
    }
},1000);
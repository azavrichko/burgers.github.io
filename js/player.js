//player

var player = (function(){
  const container = document.querySelector('.player__play'),
        player = document.querySelector('.player__video'),
        playerToolbarIcon = document.querySelector('.player__toolbar-icon'),
        playerVolumeIcon = document.querySelector('.player__volume-icon'),
        playerToolbarRange = document.querySelector('.player__toolbar-range'),
        playerVolumeRange = document.querySelector('.player__volume-range'),
        playerToolbarRangeButton = document.querySelector('.player__toolbar-range-circle'),
        playerVolumeRangeButton = document.querySelector('.player__volume-range-circle');

  var interval; 
  var previousVolume = 0; 

  var playStop = function(){
    if (player.paused){
      player.play();
      container.classList.remove('player__play-img');
      playerToolbarIcon.classList.add('player__toolbar-icon_paused');
    }else{
      player.pause();
      container.classList.add('player__play-img');
      playerToolbarIcon.classList.remove('player__toolbar-icon_paused');
    }
  }

  var changeButtonPos = function(percent){
    playerToolbarRangeButton.style.left = `${percent}%`
  }

  var changeVolumePos = function(percent){
    playerVolumeRangeButton.style.left = `${percent}%`
  }

  var onPlayerReady = function(){
    const duration = player.duration;

    interval = setInterval(function(){
      const completed = player.currentTime;
      const percent = (completed / duration) * 100;
      changeButtonPos(percent);
    }, 1000 + 300)
  }
  


  var startPlayer = function(){

    container.addEventListener('click', function(e){
      e.preventDefault();
      const target = e.target;
      if (target.closest('.player__play-link')||target.closest('.player__toolbar-icon')||target.closest('.player__video')){
        this.classList.remove('player__play-bg');
        playStop();
      }
    })

    playerVolumeIcon.addEventListener('click', function(){
      this.classList.toggle('player__volume-icon_mute');
      
      if (player.muted){
        player.volume = previousVolume;
        changeVolumePos(previousVolume*100);
        player.muted = false;
      }else{
        previousVolume = player.volume;
        player.volume = 0;
        player.muted = true;
        changeVolumePos(0);
      }
    })

    playerToolbarRange.addEventListener('click', function(e){
      const leftPos = this.getBoundingClientRect().left;
      const rightPos = this.getBoundingClientRect().right;
      const width = rightPos - leftPos;
      const newButtonPos = e.pageX - leftPos;
      const clickedPercent = (newButtonPos / width) * 100;
      const newPlayerTime = (player.duration / 100) * clickedPercent;
      player.currentTime = newPlayerTime;
      changeButtonPos(clickedPercent);
    })

    player.addEventListener('play', onPlayerReady);
    player.addEventListener('pause', function(){
      clearInterval(interval);
    });


    playerVolumeRange.addEventListener('click', function(e){
      const leftPos = this.getBoundingClientRect().left;
      const rightPos = this.getBoundingClientRect().right;
      const width = rightPos - leftPos;
      const newButtonPos = e.pageX - leftPos;
      const clickedPercent = (newButtonPos / width) * 100;
      player.volume = clickedPercent / 100;
      changeVolumePos(clickedPercent);
    })
  }

  return {init: startPlayer};
})()

//export {player};
//import {player} from './js/player.js';
//player.init();
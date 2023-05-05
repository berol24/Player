const $playerWrap = document.querySelector('#myplayer');
const $player = document.querySelector('video');
const $btnPlay = document.querySelector('.btn-play');
const $btnPause = document.querySelector('.btn-pause');
const $btnMute = document.querySelector('.btn-mute');
const $btnUnmute = document.querySelector('.btn-unmute');
const $btnVolume = document.querySelector('.btn-volume');
const $btnFullscreen = document.querySelector('.btn-fullscreen');
const $progress = document.querySelector('.progress');
const $progressBar = document.querySelector('.progress_bar');
const $menu = document.querySelector('.menu');

$btnPlay.addEventListener('click', function () {
  $player.play();
});

$btnPause.addEventListener('click', function () {
  $player.pause();
});

$player.addEventListener('click', function () {
  if ($player.paused) {
    $player.play();
  } else {
    $player.pause();
  }
});

// extraire des comportements dans une fonction
const mute = function () {
  $player.muted = true;

  // si on veut gérer l'affichage dans les fonctions
  // plutôt que les events
  // $btnUnmute.classList.remove('is-hidden');
  // $btnMute.classList.add('is-hidden');
};

const unmute = function () {
  $player.muted = false;

  // si on veut gérer l'affichage dans les fonctions
  // plutôt que les events
  // $btnUnmute.classList.add('is-hidden');
  // $btnMute.classList.remove('is-hidden');
};

$btnMute.addEventListener('click', function () {
  mute();
});

$btnUnmute.addEventListener('click', function () {
  unmute();
});

$btnVolume.addEventListener('input', function () {
  $player.volume = $btnVolume.value;

  // si on veut forcer le volume
  // à se remttre quand quelqu'un touche
  // à la barre de volume
  $player.muted = false;
});

$btnFullscreen.addEventListener('click', function () {
  if (document.fullscreen) {
    document.exitFullscreen();
  } else {
    $playerWrap.requestFullscreen();
  }
});

$progress.addEventListener('click', function (event) {
  const time = event.offsetX / $progress.offsetWidth * $player.duration;

  $player.currentTime = time;
});

$player.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  console.log('toto');
  $menu.classList.add('is-active');
  $menu.style.left = event.offsetX + 'px';
  $menu.style.top = event.offsetY + 'px';
});

$player.addEventListener('play', function () {
  $btnPlay.classList.add('is-hidden');
  $btnPause.classList.remove('is-hidden');
});

$player.addEventListener('pause', function () {
  $btnPause.classList.add('is-hidden');
  $btnPlay.classList.remove('is-hidden');
});

$player.addEventListener('timeupdate', function () {
  const progressBarWidth = $player.currentTime / $player.duration * 100;
  $progressBar.style.width = progressBarWidth + '%';
});

$player.addEventListener('volumechange', function () {
  if ($player.muted) {
    $btnUnmute.classList.remove('is-hidden');
    $btnMute.classList.add('is-hidden');
  } else {
    $btnUnmute.classList.add('is-hidden');
    $btnMute.classList.remove('is-hidden');
  }
});

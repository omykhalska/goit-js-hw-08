import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';
let currentTimeStored = 0;

if (localStorage.getItem(LOCALSTORAGE_KEY)) {
  currentTimeStored = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

player.setCurrentTime(currentTimeStored);

function onPlayerTimeUpdate(data) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data.seconds));
}

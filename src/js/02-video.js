import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let currentTimeStored = 0;

if (localStorage.getItem('videoplayer-current-time')) {
  currentTimeStored = JSON.parse(localStorage.getItem('videoplayer-current-time'));
}

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

player.setCurrentTime(currentTimeStored);

function onPlayerTimeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}

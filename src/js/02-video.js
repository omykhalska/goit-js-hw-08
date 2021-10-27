import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let currentTimeStored = 0;

if (localStorage.getItem('videoplayer-current-time')) {
  currentTimeStored = JSON.parse(localStorage.getItem('videoplayer-current-time'));
  console.log(
    `Мы остановили просмотр на ${Number.parseInt(currentTimeStored / 60)}мин:${
      Number.parseInt(currentTimeStored) % 60
    }сек. Продолжаем :-)`,
  );
}

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(currentTimeStored);

function onPlay(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}

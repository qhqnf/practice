// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;
const clock = clockContainer.querySelector(".js-dday");

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2020-12-24:00:00:00+0900");
  const date = new Date();
  const gap = xmasDay - date;
  let second = gap / 1000;
  const day = parseInt(second / 86400);
  second = second % 86400;
  const hour = parseInt(second / 3600);
  second = second % 3600;
  const minute = parseInt(second / 60);
  second = parseInt(second % 60);
  clock.innerText = ` ${day}d  ${hour < 10 ? `0${hour}h` : `${hour}h`}  ${
    minute < 10 ? `0${minute}m` : `${minute}m`
  }  ${second < 10 ? `0${second}s` : `${second}s`}`;
}

function init() {
  setInterval(getTime, 1000);
}
init();

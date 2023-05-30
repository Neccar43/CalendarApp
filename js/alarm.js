const currentTime = document.querySelector('.event-current-time');

let alarmTime, isAlarmSet, eventTitle;
ringtone = new Audio('./mp3/ringtone.mp3');

setInterval(() => {
  // Güncel saati dakika ve saniye ile göstermek için
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = 'AM';
  if (h >= 12) {
    h = h - 12;
    ampm = 'PM';
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    setTimeout(() => {
      if (isAlarmSet && confirm(`${eventTitle} etkinliğinizin saati geldi!`)) {
        ringtone.pause();
        return (isAlarmSet = false);
      }
    }, 3000);
  }
});

function setAlarm(timeFrom, eventTit) {
  eventTitle = eventTit;
  alarmTime = timeFrom;
  isAlarmSet = true;
  console.log('Alarm time atandı', alarmTime);
}

console.log(23 % 12 || 'furkan');

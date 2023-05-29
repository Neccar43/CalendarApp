const outPanelBtn = document.querySelector('.btn__panel--close'),
  goCalendarBtn = document.querySelector('.btn__calendar'),
  table = document.querySelector('tbody');

outPanelBtn.addEventListener('click', e => {
  e.preventDefault();
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    localStorage.removeItem('currentAccount');
    return (window.location.href = 'login.html');
  }
});

goCalendarBtn.addEventListener(
  'click',
  () => (window.location.href = 'calendar.html')
);

// Etkinlikleri tabloda gösterme
const eventsArray = [];
function getEvents() {
  if (localStorage.getItem('events') === null) {
    return;
  }
  eventsArray.push(...JSON.parse(localStorage.getItem('events')));
}
getEvents();
console.log(eventsArray);

let index = 0; // Event No tutmak için
function addUserHTML(event) {
  let gün = event.day + '';
  let ay = event.month + '';
  let yıl = event.year;
  index += 1;

  gün = gün.length == 1 ? `0${gün}` : gün;
  ay = ay.length == 1 ? `0${ay}` : ay;

  let html = `
  <tr class='table-row'>
    <td>${index}</td>
    <td>${event.title}</td>
    <td>${event.eventType}</td>
    <td>${gün}/${ay}/${yıl}</td>
    <td><strong>${event.timeTo}</strong></td>
    <td><strong>${event.timeFrom}</strong></td>
  </tr>
  `;

  table.insertAdjacentHTML('beforeend', html);
}

eventsArray.forEach(event => {
  event.events.forEach(birOlay => {
    addUserHTML(birOlay);
  });
});

const currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
const labelWelcome = document.querySelector('.welcome');
const updateUI = function (acc) {
  // Display Message
  labelWelcome.textContent = `Welcome back, ${acc.name.split(' ')[0]}`;
};
updateUI(currentAccount);
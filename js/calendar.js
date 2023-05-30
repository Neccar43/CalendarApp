const calendar = document.querySelector('.calendar'),
  date = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  todayBtn = document.querySelector('.today-btn'),
  gotoBtn = document.querySelector('.goto-btn'),
  dateInput = document.querySelector('.goto__date-input'),
  eventDay = document.querySelector('.event-day'),
  eventDate = document.querySelector('.event-date'),
  eventsContainer = document.querySelector('.events'),
  addEventBtn = document.querySelector('.add-event'),
  addEventWrapper = document.querySelector('.add-event-wrapper '),
  addEventCloseBtn = document.querySelector('.close '),
  addEventTitle = document.querySelector('.event-name '),
  addEventFrom = document.querySelector('.event-time-from '),
  addEventTo = document.querySelector('.event-time-to '),
  addEventType = document.querySelector('.event-type'),
  addEventSubmit = document.querySelector('.add-event-btn '),
  labelWelcome = document.querySelector('.welcome'),
  outBtn = document.querySelector('.right__top--btn'),
  goPanelBtn = document.querySelector('.go-panel');
// bugün'ün kontrolünü yapmak için
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Login'den giriş yapan kullanıcıyı çekip ona göre UI ekranı çizicez
let currentAccount;
currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
console.log(currentAccount);

const updateUI = function (acc) {
  // Display Message
  labelWelcome.textContent = `Welcome back, ${acc.name.split(' ')[0]}`;
  // Display EVENTS
};
updateUI(currentAccount);

// Kullanıcı çıkış yaparsa
outBtn.addEventListener('click', e => {
  e.preventDefault();
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    localStorage.removeItem('currentAccount');
    return (window.location.href = 'login.html');
  }
});

const eventsArr = [];
getEvents(); // Bu olmak zorudna yoksa local'den eventları çekemeyiz!!
console.log(eventsArr);
// Takvim yaprağını her çizmesini istediğimizde çalıştırılacak metod
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + ' ' + year;

  let days = '';

  // İlk haftada önceki aydan olan günleri yazdırmak için
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Şuanki ayın günlerini yazdır
  for (let i = 1; i <= lastDate; i++) {
    // Event'ın o gün olup olmadığını kontrol edin
    let event = false;
    eventsArr.forEach(eventObj => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    // Günün bugün olup olmadığını kontrol et. Çünkü güncel gün için bir class ekliyoruz böylece farklı görünüyor!
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      // Takvim yaprağında olay eklediği günü üstüne tekrar tıklayınca olayların gözükmesi için
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  // Son haftada gelecek aydan olan günleri eklemek için
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

// Önceki aylara gitmek için
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Gelecek aylara gitmek için
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// İleri geri ikonlarına basınca metod çalışsın
prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

initCalendar();

// Takvim yaprağında kullanıcı herhangi bir güne tıklarsa class eklemek için
// e.target.innerHTML = Tıklanılan yerdeki html etiketinin içeriğini alır. Yani burada tıklanan takvim yaprağındaki gün'ü çeker. Kullanıcı ayın kaçıncı gününe tıklamış
function addListner() {
  const days = document.querySelectorAll('.day');
  days.forEach(day => {
    day.addEventListener('click', e => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      // Eğer takvimde herhangi bir güne tıklama olursa önce tüm active'leri sil
      days.forEach(day => {
        day.classList.remove('active');
      });
      // Bir yapraktaki önceki tarihe veya sonraki tarihe tıklanırsa o aya geç
      if (e.target.classList.contains('prev-date')) {
        prevMonth();
        // ay değiştikten sonra tıklanan güne aktif ekle
        setTimeout(() => {
          // önceki ayın bir gününe tıklarsa o tarihe git ve active classı ekle
          const days = document.querySelectorAll('.day');
          days.forEach(day => {
            if (
              !day.classList.contains('prev-date') &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add('active');
            }
          });
        }, 100);
        // Sonraki ayın bir gününe tıklarsa o tarihe git ve active classı ekle
      } else if (e.target.classList.contains('next-date')) {
        nextMonth();
        // ay değiştirildikten sonra tıklanan güne aktif ekle
        setTimeout(() => {
          const days = document.querySelectorAll('.day');
          days.forEach(day => {
            if (
              !day.classList.contains('next-date') &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add('active');
            }
          });
        }, 100);
      } else {
        e.target.classList.add('active');
      }
    });
  });
}

// Today butonuna tıklayınca bugünün tarihine atması için

todayBtn.addEventListener('click', () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener('input', e => {
  // Kullanıcının sadece sayı girmesi için
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
  if (dateInput.value.length === 2) {
    dateInput.value += '/';
  }
  // 6'dan fazla sayı girmemesi için
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === 'deleteContentBackward') {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener('click', gotoDate);
function gotoDate() {
  console.log('here');
  const dateArr = dateInput.value.split('/');
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert('Invalid Date');
}

// Saatin sağındaki ve solundaki değerleri yazdırmak için
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(' ')[0];
  eventDay.innerHTML = dayName;
  // eventDate.innerHTML = date + ' ' + months[month] + ' ' + year;
  eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Girilen olay ile gün eşleşirse event container'da olayı listele
function updateEvents(date) {
  let events = '';
  eventsArr.forEach(event => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach(event => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === '') {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

// Sağ en alttaki olay ekleme butonu
addEventBtn.addEventListener('click', () => {
  addEventWrapper.classList.toggle('active');
});

// Sağdaki olay eklemenin içerisindeki X kapatma iconu için
addEventCloseBtn.addEventListener('click', () => {
  addEventWrapper.classList.remove('active');
});

// Sağdaki olay eklemenin içerisinde başka bir yere tıklayınca kapanması için
document.addEventListener('click', e => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove('active');
  }
});

// eventtitle'da 40 karakter sınırı için
addEventTitle.addEventListener('input', e => {
  addEventTitle.value = addEventTitle.value.slice(0, 40);
});

// Event Time From için
addEventFrom.addEventListener('input', e => {
  // Sadece sayılara izin vermek için
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ':';
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

// Event Time to için
addEventTo.addEventListener('input', e => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
  if (addEventTo.value.length === 2) {
    addEventTo.value += ':';
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Add Event butonu için
addEventSubmit.addEventListener('click', () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  const eventType = addEventType.value;
  if (
    eventTitle === '' ||
    eventTimeFrom === '' ||
    eventTimeTo === '' ||
    eventType === ''
  ) {
    alert('Please fill all the fields');
    return;
  }

  // doğru saat biçimini kontrol et
  const timeFromArr = eventTimeFrom.split(':');
  const timeToArr = eventTimeTo.split(':');
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert('Invalid Time Format');
    return;
  }
  console.log(eventTimeFrom, eventTimeTo);
  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  // etkinliğin zaten eklenip eklenmediğini başlıkla kontrol et
  let eventExist = false;
  eventsArr.forEach(event => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach(event => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert('Event already added');
    return;
  }

  // newEvent objesinin içerisini doldur.
  const newEvent = {
    title: eventTitle,
    time: timeFrom + ' - ' + timeTo,
    timeFrom: timeFrom,
    timeTo: timeTo,
    eventType: eventType,
    day: activeDay,
    month: month + 1,
    year: year,
  };
  console.log('new event objesi dolduruldu;');
  console.log(newEvent);
  console.log('seçilen gün - active day değeri;');
  console.log(activeDay);

  // O günde önceden en az bir tane etkinlik varsa
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach(item => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
        setAlarm(newEvent.timeFrom, newEvent.title);
        console.log(newEvent.timeFrom, newEvent.title);
      }
    });
  }

  // O gün ilk defa etkinlik ekleniyorsa
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
    setAlarm(newEvent.timeFrom, newEvent.title);
    console.log(newEvent.timeFrom, newEvent.title);
  }

  // Etkinlik başarılı bir şekilde eklenirse popup'taki tüm alanları temizle
  console.log(eventsArr);
  addEventWrapper.classList.remove('active');
  addEventTitle.value = '';
  addEventFrom.value = '';
  addEventTo.value = '';
  addEventType.value = '';
  updateEvents(activeDay);

  // etkin günü seçin ve eklenmemişse etkinlik sınıfını ekleyin
  const activeDayEl = document.querySelector('.day.active');
  if (!activeDayEl.classList.contains('event')) {
    activeDayEl.classList.add('event');
  }
});

// olaya tıklandığında olayı silme işlevi
eventsContainer.addEventListener('click', e => {
  console.log(e.target); // Ekli bir event'ı seç
  console.log(e.target.children[0].children[1].innerHTML); // EVENT BAŞLIĞINI AL
  if (e.target.classList.contains('event')) {
    if (confirm('Are you sure you want to delete this event?')) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach(event => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          console.log(event);
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          // Bir günde hiç etkinlik kalmadıysa, o günün etkinlik çizgisini kaldır
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            // Etkinlik sınıfını günden kaldır
            const activeDayEl = document.querySelector('.day.active');
            if (activeDayEl.classList.contains('event')) {
              activeDayEl.classList.remove('event');
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

// Etkinlikleri storage'de stringify ile array list olarak tut!
function saveEvents() {
  localStorage.setItem('events', JSON.stringify(eventsArr));
}

// Uygulama her açıldığında eventsArr dizisini doldurup ekrana yazıcaz!
function getEvents() {
  // olayların zaten yerel depolamaya kaydedilip kaydedilmediğini kontrol edin, ardından olayı başka hiçbir şey döndürmeyin
  if (localStorage.getItem('events') === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem('events')));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(':');
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? 'PM' : 'AM';
  timeHour = timeHour % 12 || 12;
  timeHour = timeHour < 10 ? '0' + timeHour : timeHour;
  timeMin = timeMin < 10 ? '0' + timeMin : timeMin;
  time = timeHour + ':' + timeMin + ' ' + timeFormat;
  return time;
}

// Aşağıdaki kod JS ile HTML sayfasına eleman ekledim
function defineProperty() {
  var university = document.createElement('div');
  university.innerHTML = 'Celal Bayar Üniversitesi ';
  university.style.position = 'absolute';
  university.style.bottom = '0';
  university.style.right = '0';
  university.style.fontSize = '1.7rem';
  university.style.color = '#000';
  university.style.fontFamily = 'sans-serif';
  university.style.padding = '5px';
  university.style.background = '#fff';
  university.style.borderTopLeftRadius = '5px';
  university.style.borderBottomRightRadius = '5px';
  university.style.boxShadow = '0 0 5px #ccc';
  document.body.appendChild(university);
}
defineProperty();
console.log(activeDay);

////////////////////////////////////////

goPanelBtn.addEventListener('click', () => {
  return (window.location.href = 'userPanel.html');
});

console.log(JSON.parse(localStorage.getItem('events')));

/*


*/

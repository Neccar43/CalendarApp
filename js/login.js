const accounts = [
    {
      name: 'Nurullah',
      username: 'nurullah',
      id: '111',
      number: '12345',
      email: 'nurullah@gmail.com',
      address: 'nurullah adres',
      password: 111111,
      eventsArr: ['admin'],
    },
    {
      name: 'Furkan',
      username: 'furkan',
      id: '111',
      number: '12345',
      email: 'furkan@gmail.com',
      address: 'furkan adres',
      password: 111111,
      eventsArr: ['admin'],
    },
    {
      name: 'Hasan',
      username: 'hasan',
      id: '111',
      number: '12345',
      email: 'hasan@gmail.com',
      address: 'hasan adres',
      password: 111111,
      eventsArr: ['admin'],
    },
    {
      name: 'Abdulkerim',
      username: 'kerimabdul',
      id: '111',
      number: '0123',
      email: 'sdfsf@gmail.com',
      address: 'sdlfkms',
      password: 111111,
      eventsArr: ['admin'],
    },
  ];
  
  // Hesapları local storage'a ekle. Username'ler aynı ise ekleme.
  accounts.forEach(acc => {
    if (!localStorage.getItem(`${acc.username}`)) {
      localStorage.setItem(`${acc.username}`, JSON.stringify(acc));
    } else {
      console.log(
        ` ${acc.username} Kullanıcı adı daha önce kayıt edilmiştir. Lütfen başka bir kullanıcı adı deneyiniz`
      );
    }
  });
  // localStorage.setItem('accounts', JSON.stringify(accounts));
  getAccounts();
  console.log(accounts);
  const newAccounts = [];
  
  ///////////////////////////////////////
  // ELEMENTS
  
  // Doğrulama olunca takvimdeki ve paneldeki açılan sayfa için
  const labelWelcome = document.querySelector('.welcome');
  const btnLogin = document.querySelector('.login__btn'),
    inputLoginUsername = document.querySelector('.login__input--user'),
    inputLoginPin = document.querySelector('.login__input--password'),
    containerLogin = document.querySelector('.container__login'),
    pwShowHide = document.querySelectorAll('.showHidePw'),
    pwFields = document.querySelectorAll('.password'),
    signUp = document.querySelector('.signup-link'),
    login = document.querySelector('.login-link'),
    registrationName = document.querySelector('.registration__input--name'),
    registrationUsername = document.querySelector(
      '.registration__input--username'
    ),
    registrationId = document.querySelector('.registration__input--id'),
    registrationNumber = document.querySelector('.registration__input--number'),
    registrationEmail = document.querySelector('.registration__input--email'),
    registrationAddress = document.querySelector('.registration__input--address'),
    registrationPassword = document.querySelector(
      '.registration__input--password '
    ),
    btnSignUp = document.querySelector('.registration__signup');
  
  // Parolayı göstermek/gizlemek ve simgeyi değiştirmek
  pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', () => {
      pwFields.forEach(pwField => {
        if (pwField.type === 'password') {
          pwField.type = 'text';
  
          pwShowHide.forEach(icon => {
            icon.classList.replace('uil-eye-slash', 'uil-eye');
          });
        } else {
          pwField.type = 'password';
  
          pwShowHide.forEach(icon => {
            icon.classList.replace('uil-eye', 'uil-eye-slash');
          });
        }
      });
    });
  });
  
  ///////////////////////////////////////
  // Tıklama İşlemleri
  
  // let currentAccount;
  
  window.onload = function () {
    btnLogin?.addEventListener('click', function (e) {
      // Sayfaya f5 atmaması için
      e.preventDefault();
  
      if (inputLoginPin.value === '' || inputLoginUsername.value === '') {
        return alert('Lütfen tüm alanları doldurun');
      } else {
        // Giriş yapan hesabı bulma
        let currentAccount = accounts.find(
          acc => acc.username === inputLoginUsername.value
        );
        localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
  
        console.log(currentAccount?.name.split(' ')[0]);
  
        // Girilen bilgileri doğrulama
        if (
          currentAccount &&
          currentAccount.password === Number(inputLoginPin.value)
        ) {
          console.log(
            `Parola ve Username doğru. Hoşgeldiniz ${currentAccount.name}`
          );
          console.log(currentAccount);
          // Display UI
          return (window.location.href = 'calendar.html');
        } else if (inputLoginPin.value && inputLoginUsername.value) {
          inputLoginPin.value = '';
          inputLoginUsername.value = '';
          return window.alert('Username veya parola hatalı');
        }
      }
    });
  };
  
  // Register ve Login formu arası geçiş
  if (signUp) {
    signUp.addEventListener('click', () => {
      containerLogin.classList.add('active');
    });
  }
  
  // Login Now
  if (login) {
    login.addEventListener('click', () => {
      containerLogin.classList.remove('active');
    });
  }
  
  // Kayıt olma
  btnSignUp.addEventListener('click', () => {
    const name = registrationName.value;
    const username = registrationUsername.value;
    const id = registrationId.value;
    const number = registrationNumber.value;
    const email = registrationEmail.value;
    const address = registrationAddress.value;
    const password = Number(registrationPassword.value);
  
    if (
      name === '' ||
      username === '' ||
      id === '' ||
      number === '' ||
      email === '' ||
      address === '' ||
      password === ''
    ) {
      return alert('Lütfen tüm alanları doldurunuz!');
    }
  
    newAccounts.push({
      name: name,
      username: username,
      id: id,
      number: number,
      email: email,
      address: address,
      password: password,
      eventsArr: [],
    });
  
    console.log(newAccounts);
    console.log(accounts);
  
    newAccounts.forEach(acc => {
      console.log(acc);
      if (!localStorage.getItem(`${acc.username}`)) {
        localStorage.setItem(`${acc.username}`, JSON.stringify(acc));
        accounts.push(acc);
        saveAccounts();
        console.log(accounts);
        newAccounts.pop();
        alert(
          'Kayıt olma işleminiz başarıyla tamamlandı. Giriş  ekranına yönlendiriliyorsunuz..'
        );
        window.location.href = 'login.html';
      } else {
        newAccounts.pop();
        return alert(
          ` ${acc.username} Kullanıcı adı daha önce kayıt edilmiştir. Lütfen başka bir kullanıcı adı deneyiniz`
        );
      }
    });
  });
  
  function saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
  
  // Sadece bir kere en baştta çalıştıracaksın localdeki tüm  accountları çekicek
  function getAccounts() {
    if (localStorage.getItem('accounts') === null) {
      return;
    }
    accounts.push(...JSON.parse(localStorage.getItem('accounts')));
    console.log(accounts);
  }
  
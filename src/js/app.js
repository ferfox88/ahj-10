import createElement from './createElement';

createElement();

const inputText = document.querySelector('.input_text');

inputText.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    geolocation();
  }
});

function checkInputValue() {
  if (inputText.value !== '') {
    return inputText.value;
  }
  return false;
}

export default function addCard(position) {
  if (checkInputValue()) {
    document.querySelector('.timeline').insertAdjacentHTML('afterbegin', `
        <div class="card">
            <div class="card_content">
                <p class="card_text">${checkInputValue()}</p>
                <span class="card_date">${getTime()}</span>
            </div>
                <span class="card_position">📍[${position}]</span>
        </div>
        `);
    inputText.value = '';
  }
}

function getTime() {
  const dateNow = new Date();
  const dateYear = dateNow.getFullYear();
  const dateMonth = dateNow.getMonth() + 1;
  const dateDay = dateNow.getDate();
  const dateHour = dateNow.getHours();
  const dateMinutes = dateNow.getMinutes();

  if (dateMonth < 10) {
    return `${dateYear}.0${dateMonth}.${dateDay} ${dateHour}:${dateMinutes}`;
  }
  return `${dateYear}.${dateMonth}.${dateDay} ${dateHour}:${dateMinutes}`;
}

function geolocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        addCard(`${latitude}, ${longitude}`);
        resolve('Complete');
      }, () => {
        modalError();
      });
    }
  });
}

function modalError() {
  document.querySelector('.modal_error').insertAdjacentHTML('afterbegin', `
    <div class="error_card">
      <h3 class="error_title">Что-то пошло не так</h3>
      <p class="error_content">К сожалению, нам не удалось опредлить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную</p>
      <p class="error_content_value">Широта и долгота через запятую</p>
      <input type="text" class="error_input">
      <div class="button">
        <button class="cancel">Отмена</button>
        <button class="ok">Ок</button>
      </div>
    </div>
  `);

  const cancel = document.querySelector('.cancel');
  const ok = document.querySelector('.ok');

  cancel.addEventListener('click', () => {
    document.querySelector('.modal_error').removeChild(document.querySelector('.error_card'));
  });

  ok.addEventListener('click', () => {
    const errorInput = document.querySelector('.error_input');

    if (validateCoords(errorInput.value)) {
      addCard(errorInput.value);
      document.querySelector('.modal_error').removeChild(document.querySelector('.error_card'));
    } else {
      alert('Введите корректные координаты');
    }
  });
}

function validateCoords(coords) {
  const arr = coords.split(',');
  const latitude = arr[0].replace(/\[/, '');
  const longitude = arr[1].replace(/\]/, '').replace(/\s/, '');
  return `${latitude}, ${longitude}`;
}

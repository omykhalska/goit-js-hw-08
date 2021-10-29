import throttle from 'lodash.throttle';

const inputRef = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let dataStored = { email: '', message: '' };
const parsedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

if (localStorage.getItem(LOCALSTORAGE_KEY)) {
  inputRef.email.value = parsedData.email;
  inputRef.message.value = parsedData.message;
}

inputRef.addEventListener('input', throttle(onFormInput, 500));
inputRef.addEventListener('submit', onBtnSubmit);

function onFormInput(e) {
  if (e.target.name === 'email') {
    dataStored.email = e.target.value.trim();
    dataStored.message = inputRef.message.value;
  } else if (e.target.name === 'message') {
    dataStored.email = inputRef.email.value;
    dataStored.message = e.target.value.trim();
  }

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataStored));
}

function onBtnSubmit(e) {
  if (!dataStored.email || !dataStored.message) {
    alert(`All the fields must be filled in`);
    return;
  }
  e.preventDefault();
  console.log(dataStored);
  clearData(LOCALSTORAGE_KEY);
}

function clearData(key) {
  localStorage.removeItem(key);
  inputRef.reset();
  dataStored = { email: '', message: '' };
}

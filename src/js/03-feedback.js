import throttle from 'lodash.throttle';

const inputRef = document.querySelector('.feedback-form');
let dataStored = { email: '', message: '' };
const parsedData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (localStorage.getItem('feedback-form-state')) {
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

  localStorage.setItem('feedback-form-state', JSON.stringify(dataStored));
}

function onBtnSubmit(e) {
  e.preventDefault();
  console.log(dataStored);
  clearData('feedback-form-state');
}

function clearData(key) {
  localStorage.removeItem(key);
  inputRef.reset();
  dataStored = { email: '', message: '' };
}

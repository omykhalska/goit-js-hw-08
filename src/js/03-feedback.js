import throttle from 'lodash.throttle';

const inputRef = document.querySelector('.feedback-form');
const dataStored = { email: '', message: '' };
const parsedData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (localStorage.getItem('feedback-form-state')) {
  inputRef.email.value = parsedData.email;
  inputRef.message.value = parsedData.message;
}

inputRef.addEventListener('input', throttle(onForminput, 500));
inputRef.addEventListener('submit', onBtnSubmit);

function onForminput(e) {
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
  removeLocalDataStored('feedback-form-state');
  inputRef.reset();
}

function removeLocalDataStored(key) {
  localStorage.removeItem(key);
}

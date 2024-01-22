import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('.timer-input-box button');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let userSelectedDate = '';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      btnStart.setAttribute('disabled', true);
      izitoast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      btnStart.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};
const datePicker = flatpickr(dateTimePicker, options);
dateTimePicker.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
});
btnStart.addEventListener('click', () => {
  const selectedDateTime = userSelectedDate.getTime();
  const curentDateTime = new Date().getTime();
  if (selectedDateTime - curentDateTime < 0) {
    izitoast.error({
      position: 'topRight',
      message: 'Please choose a date in the future',
    });
    return;
  }
  dateTimePicker.setAttribute('disabled', true);
  btnStart.setAttribute('disabled', true);
  let intervalid = setInterval(() => {
    let deltaTime = selectedDateTime - new Date().getTime() - 1000;
    if (deltaTime < 1000) {
      clearInterval(intervalid);
      dateTimePicker.removeAttribute('disabled');
      btnStart.removeAttribute('disabled');
    }
    let deltaTimer = convertMs(deltaTime);
    dataDays.textContent = `${addLeadingZero(deltaTimer.days)}`;
    dataHours.textContent = `${addLeadingZero(deltaTimer.hours)}`;
    dataMinutes.textContent = `${addLeadingZero(deltaTimer.minutes)}`;
    dataSeconds.textContent = `${addLeadingZero(deltaTimer.seconds)}`;
  }, 1000);
});
function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
///////////////////////////////////////////////////////////////////////////
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// iziToast.show({
//   title: 'Hey',
//   message: 'What would you like to add?',
// });

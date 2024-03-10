import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//    ........   //
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  const result = new String(value).padStart(2, '0');
  return result;
}
const startButton = document.querySelector('button[data-start]');
startButton.setAttribute('disabled', 'disabled');
const daysOutput = document.querySelector('span[data-days]');
const hoursOutput = document.querySelector('span[data-hours]');
const minutesOutput = document.querySelector('span[data-minutes]');
const secondOutput = document.querySelector('span[data-seconds]');
let userSelectedDate;
let timerInterval;
const dateInput = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please select a future date in the future',
      });
      startButton.setAttribute('disabled', 'disabled');
      return;
    }
    userSelectedDate = selectedDates[0];
    startButton.removeAttribute('disabled');
    console.log(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);
function showOutputDate(days, hours, minutes, seconds) {
  daysOutput.textContent = addLeadingZero(days);
  hoursOutput.textContent = addLeadingZero(hours);
  minutesOutput.textContent = addLeadingZero(minutes);
  secondOutput.textContent = addLeadingZero(seconds);
}
function updateDisplayOutputCountdown(endTime) {
  const currentDate = Date.now();
  const remainingTime = endTime - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  showOutputDate(days, hours, minutes, seconds);
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    showOutputDate(0, 0, 0, 0);
  }
}
function handleStartCountdown(event) {
  if (!userSelectedDate) {
    return;
  }
  dateInput.setAttribute('disabled', 'disabled');
  startButton.setAttribute('disabled', 'disabled');
  const currentDate = Date.now();
  const selectedDateMs = userSelectedDate.getTime();
  const remainingTime = selectedDateMs - currentDate;
  timerInterval = setInterval(() => {
    updateDisplayOutputCountdown(selectedDateMs);
  }, 1000);
}

startButton.addEventListener('click', handleStartCountdown);

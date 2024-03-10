import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//    ........   //
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
      window.alert('Please choose a date in the future');
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
  daysOutput.textContent = days;
  hoursOutput.textContent = hours;
  minutesOutput.textContent = minutes;
  secondOutput.textContent = seconds;
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

import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const input = document.getElementById('datetime-picker');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('button');
startBtn.addEventListener('click', startClick);

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
      return;
    }
    startBtn.removeAttribute('disabled');
    userSelectedDate = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

function startClick() {
  let startTime = Date.now();
  let timeMs = userSelectedDate - startTime;
  let timeToDate = convertMs(userSelectedDate - startTime);

  timerText(timeToDate);

  const idInt = setInterval(() => {
    startTime = Date.now();
    timeMs = userSelectedDate - startTime;
    console.log(timeMs);

    if (timeMs <= 0) {
      clearInterval(idInt);
      startBtn.removeAttribute('disabled');
      input.removeAttribute('disabled');
    } else {
      timeToDate = convertMs(timeMs);
      timerText(timeToDate);
    }
  }, 1000);

  startBtn.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
}

function timerText(obj) {
  const value = Object.values(obj);
  const block = [...timer.querySelectorAll('.value')];
  block.forEach(
    (elem, i) => (elem.textContent = String(value[i]).padStart(2, 0))
  );
}

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

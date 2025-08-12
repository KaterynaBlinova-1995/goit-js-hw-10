import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate;
const buttonElem = document.querySelector('[data-start]');
const spanElems = document.querySelectorAll('.timer span.value');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      buttonElem.disabled = true;
    } else {
      buttonElem.disabled = false;
    }

    userSelectedDate = selectedDate;
  },
});
buttonElem.addEventListener('click', handleButtonClick);
function handleButtonClick(e) {
  const intervalIld = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const timeObject = convertMs(diff);
    console.log(timeObject);
    spanElems[0].textContent = addLeadingZero(timeObject.days);
    spanElems[1].textContent = addLeadingZero(timeObject.hours);
    spanElems[2].textContent = addLeadingZero(timeObject.minutes);
    spanElems[3].textContent = addLeadingZero(timeObject.seconds);

    if (diff < 1000) {
      clearInterval(intervalIld);
    }
  }, 1000);
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
function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

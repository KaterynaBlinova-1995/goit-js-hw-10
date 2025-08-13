import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let intervalId = null;

const buttonElem = document.querySelector('[data-start]');
const spanElems = document.querySelectorAll('.timer span.value');
const dateTimePicker = document.querySelector('#datetime-picker');

buttonElem.disabled = true;

const fp = flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      buttonElem.disabled = true;
    } else {
      buttonElem.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
});

buttonElem.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  if (!userSelectedDate) return;

  buttonElem.disabled = true;
  dateTimePicker.disabled = true;

  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff < 0) {
      clearInterval(intervalId);

      dateTimePicker.disabled = false;
      return;
    }

    const timeObject = convertMs(diff);
    spanElems[0].textContent = addLeadingZero(timeObject.days);
    spanElems[1].textContent = addLeadingZero(timeObject.hours);
    spanElems[2].textContent = addLeadingZero(timeObject.minutes);
    spanElems[3].textContent = addLeadingZero(timeObject.seconds);

    if (diff < 1000) {
      clearInterval(intervalId);
      dateTimePicker.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
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
  return value.toString().padStart(2, '0');
}

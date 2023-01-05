import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    startBtn: document.querySelector('button[data-start]'),
    input: document.querySelector('input#datetime-picker'),
    
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}
const { startBtn,days,input, hours, minutes, seconds } = refs;

let timeToFinish = null;
let currentTime = null;

startBtn.disabled = true;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
    onClose(selectedDates) {
    if (currentTime !== null) {
    Notiflix.Notify.warning("Wait until the timer was finished");
    return;
    };
    if (options.defaultDate >= selectedDates[0]) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
    };
    startBtn.disabled = false;
    timeToFinish = selectedDates[0].getTime() - options.defaultDate.getTime();
},
};
flatpickr('input#datetime-picker', options);

startBtn.addEventListener('click', onStart);

function onStart() {
    currentTime = timeToFinish;
    input.addEventListener('click', closeInput);
    createEventTime();
    updateEventTime();
};

const closeInput = () => {
    flatpickr('input#datetime-picker', options).close();
}

const addLeadingZero = value => value.padStart(2, '0');

function createEventTime() {
    const startTime = convertMs(currentTime);
    days.textContent = addLeadingZero(`${startTime.days}`);
    hours.textContent = addLeadingZero(`${startTime.hours}`);
    minutes.textContent = addLeadingZero(`${startTime.minutes}`);
    seconds.textContent = addLeadingZero(`${startTime.seconds}`);
}
function updateEventTime() {
    startBtn.disabled = true;

    const timerId = setInterval(() => {
        currentTime = (timeToFinish -= 1000);
        createEventTime()

        if (timeToFinish < 1000) {
            clearInterval(timerId);
            timeToFinish = null;
            currentTime = null;
            startBtn.disabled = false;
            input.removeEventListener('click', closeInput)
        }

    }, 1000)
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

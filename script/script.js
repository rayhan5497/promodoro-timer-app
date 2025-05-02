//default option
document.addEventListener('DOMContentLoaded', () => {
  promodoro();
  timeCountdown.textContent = formatTime(promodoroTime.value);
});


const defaultPromodoroTime = 25 * 60;
const defaultShortBreakTime = 5 * 60;
const defaultLongBreakTime = 15 * 60;

//Set Timer
let countdownInterval,
  timeCountdown,
  time,
  promodoroTime,
  shortBreakTime,
  longBreakTime,
  confirmation;
let isCountdownRunning = false;
time = { value: 0 };
promodoroTime = { value: 0 };
shortBreakTime = { value: 0 };
longBreakTime = { value: 0 };

function resetCountdown() {
  isCountdownRunning = false;
  timeLimit.querySelectorAll('button').forEach((button) => {
    button.style.backgroundColor = 'transparent';
    removeGlow();
  });
  clearInterval(countdownInterval);
  promodoro();
  timeCountdown.textContent = formatTime(defaultPromodoroTime);
  promodoroTime.value = defaultPromodoroTime;
}

const timeLimit = document.querySelector('.time-limit');
document.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('promodoro') ||
    event.target.classList.contains('short-break') ||
    event.target.classList.contains('long-break')
  ) {
    if (isCountdownRunning) {
      confirmation = confirm('If You Click OK > Countdown Will Be Reset!');
    }

    if (confirmation || !isCountdownRunning) {
      isCountdownRunning = false;
      timeLimit.querySelectorAll('button').forEach((button) => {
        button.style.backgroundColor = 'transparent';
        removeGlow();
      });
      clearInterval(countdownInterval);
      if (event.target.classList.contains('promodoro')) {
        promodoro();
        timeCountdown.textContent = formatTime(promodoroTime.value);
      } else if (event.target.classList.contains('short-break')) {
        shortBreak();
        timeCountdown.textContent = formatTime(shortBreakTime.value);
      } else if (event.target.classList.contains('long-break')) {
        longBreak();
        timeCountdown.textContent = formatTime(longBreakTime.value);
      }
    } else {
      return;
    }
  } else {
    return;
  }
});

timeCountdown = document.querySelector('.time-countdown');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}

function startCountdown() {
  isCountdownRunning = true;
  countdownInterval = setInterval(() => {
    if (time.value > 0) {
      time.value--;
      timeCountdown.textContent = formatTime(time.value);
    } else {
      clearInterval(countdownInterval);
      timeCountdown.textContent = '00:00';
    }
  }, 1000);
}

function promodoro() {
  const promodoro = document.querySelector('.promodoro');
  promodoro.style.backgroundColor = '#00000027';
  if (time !== promodoroTime) {
    promodoroTime = { value: 25 * 60 };
  }
  time = promodoroTime;
}

function shortBreak() {
  const shortBreak = document.querySelector('.short-break');
  shortBreak.style.backgroundColor = '#00000027';
  if (time !== shortBreakTime) {
    shortBreakTime = { value: 5 * 60 };
  }
  time = shortBreakTime;
}
function longBreak() {
  const longBreak = document.querySelector('.long-break');
  longBreak.style.backgroundColor = '#00000027';
  if (time !== longBreakTime) {
    longBreakTime = { value: 15 * 60 };
  }
  time = longBreakTime;
}

const startCountdownButton = document.querySelector('.start-countdown-button');
startCountdownButton.addEventListener('click', () => {
  if (isCountdownRunning) {
    isCountdownRunning = false;
    pause();
  } else {
    addGlow();

    if (time.value === promodoroTime.value) {
      promodoro();
      startCountdown();
    } else if (time.value === shortBreakTime.value) {
      shortBreak();
      startCountdown();
    } else if (time.value === longBreakTime.value) {
      longBreak();
      startCountdown();
    }
  }
});

function addGlow() {
  startCountdownButton.classList.add('glowing-box');
  startCountdownButton.textContent = 'PAUSE';
  timeCountdown.classList.add('glowing-text');
  const details = document.querySelector('details');
  details.querySelector('summary').classList.add('glowing-text');
  details.querySelector('.running-task-details').classList.add('glowing-text');
}

function removeGlow() {
  startCountdownButton.classList.remove('glowing-box');
  startCountdownButton.textContent = 'START';
  timeCountdown.classList.remove('glowing-text');
  const details = document.querySelector('details');
  details.querySelector('summary').classList.remove('glowing-text');
  details
    .querySelector('.running-task-details')
    .classList.remove('glowing-text');
}

//Animated Button
function glowingButton() {
  const details = document.querySelector('details');
  details.querySelector('summary').classList.add('glowing-text');
  details.querySelector('.running-task-details').classList.add('glowing-text');
}

//Pause
function pause() {
  clearInterval(countdownInterval);
  removeGlow();
  isCountdownRunning = false;
}

//Copyrights
const copyrights = document.querySelector('.footer-copyrights');
const date = new Date();
copyrights.innerHTML = `&copy; Stay Focused ${date.getFullYear()} All Rights Reserved.`;
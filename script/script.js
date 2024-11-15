//default option
document.addEventListener('DOMContentLoaded', () => {
  promodoro();
  timeCountdown.textContent = formatTime(promodoroTime);
});

//Set Timer
let countdownInterval,
  timeCountdown,
  time,
  promodoroTime,
  shortBreakTime,
  longBreakTime,
  confirmation;
let isCountdownRunning = false;

function resetCountdown() {
  isCountdownRunning = false;
  timeLimit.querySelectorAll('button').forEach((button) => {
    button.style.backgroundColor = 'transparent';
    removeGlowingText();
  });
    clearInterval(countdownInterval);
    promodoro();
    timeCountdown.textContent = formatTime(promodoroTime);
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
        removeGlowingText();
      });
      if (event.target.classList.contains('promodoro')) {
        clearInterval(countdownInterval);
        promodoro();
        timeCountdown.textContent = formatTime(promodoroTime);
      } else if (event.target.classList.contains('short-break')) {
        clearInterval(countdownInterval);
        shortBreak();
        timeCountdown.textContent = formatTime(shortBreakTime);
      } else if (event.target.classList.contains('long-break')) {
        clearInterval(countdownInterval);
        longBreak();
        timeCountdown.textContent = formatTime(longBreakTime);
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
    if (time > 0) {
      time--;
      timeCountdown.textContent = formatTime(time);
    } else {
      clearInterval(countdownInterval);
      timeCountdown.textContent = '00:00';
    }
  }, 1000);
}

function promodoro() {
  const promodoro = document.querySelector('.promodoro');
  promodoro.style.backgroundColor = '#00000027';
  promodoroTime = 25 * 60;
  time = promodoroTime;
}

function shortBreak() {
  const shortBreak = document.querySelector('.short-break');
  shortBreak.style.backgroundColor = '#00000027';
  shortBreakTime = 5 * 60;
  time = shortBreakTime;
}
function longBreak() {
  const longBreak = document.querySelector('.long-break');
  longBreak.style.backgroundColor = '#00000027';
  longBreakTime = 15 * 60;
  time = longBreakTime;
}

const startCountdownButton = document.querySelector('.start-countdown-button');
startCountdownButton.addEventListener('click', () => {
  glowingText();
  const buttonsOfTimeLimit = document
    .querySelector('.time-limit')
    .querySelectorAll('button')
    .forEach((button) => {
      if (time === promodoroTime && button.classList.contains('promodoro')) {
        promodoro();
        startCountdown();
      } else if (
        time == shortBreakTime &&
        button.classList.contains('short-break')
      ) {
        shortBreak();
        startCountdown();
      } else if (
        time === longBreakTime &&
        button.classList.contains('long-break')
      ) {
        longBreak();
        startCountdown();
      }
    });
});

function glowingText() {
  timeCountdown.classList.add('glowing-text');
  const details = document.querySelector('details');
  details.querySelector('summary').classList.add('glowing-text');
  details.querySelector('.running-task-details').classList.add('glowing-text');
}

function removeGlowingText() {
  timeCountdown.classList.remove('glowing-text');
  const details = document.querySelector('details');
  details.querySelector('summary').classList.remove('glowing-text');
  details
    .querySelector('.running-task-details')
    .classList.remove('glowing-text');
}

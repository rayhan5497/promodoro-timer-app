//Declear and assign variables
const form = document.querySelector('.form');
const task = document.getElementById('task');
const input = form.querySelector('input');
const textarea = form.querySelector('textarea');
//remove form
form.querySelector('.remove-form').addEventListener('click', () => {
  form.style.display = 'none';
  input.value = '';
  textarea.value = '';
});

// if (confirmation) {
//Show - Hide Form
task.querySelector('.add-task').addEventListener('click', () => {
  if (isCountdownRunning) {
    confirmation = confirm('If You Click OK > Countdown Will Be Reset!');
  }
  if (confirmation || !isCountdownRunning) {
    if (isCountdownRunning) {
        resetCountdown();
    }
      if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'flex';
      } else {
        form.style.display = 'none';
      }
  }
});

//Add Task
form.querySelector('button').addEventListener('click', () => {
  const runningTask = task.querySelector('.running-task');
  const runningTaskDetails = task.querySelector('.running-task-details');

  if (input.value !== '') {
    runningTask.textContent = input.value;
    if (textarea.value !== '') {
      runningTaskDetails.textContent = textarea.value;
    } else {
      runningTaskDetails.textContent = 'No Details!';
    }
    form.style.display = 'none';
    input.value = '';
    textarea.value = '';
  } else {
    input.classList.add('empty-input');
    input.style.boxShadow = '';
  }
});

input.addEventListener('focus', () => {
  input.style.boxShadow = '0 0 3px black';
  textarea.style.boxShadow = '';
  if (input.classList.contains('empty-input')) {
    input.classList.remove('empty-input');
  }
});

textarea.addEventListener('focus', () => {
  textarea.style.boxShadow = '0 0 3px black';
  input.style.boxShadow = '';
});
// }

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTime() {
  const currentTime = Math.floor((Date.now() - startTime + elapsedTime) / 1000);
  display.textContent = formatTime(currentTime);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = formatTime(0);
  laps = [];
  lapsList.innerHTML = '';
}

function lapTimer() {
  const currentTime = Math.floor((Date.now() - startTime + elapsedTime) / 1000);
  laps.push(currentTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(currentTime)}`;
  lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

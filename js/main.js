let hourSelect = document.querySelector(".hours");
let minuteSelect = document.querySelector(".minutes");
let AmPmSelect = document.querySelector(".AmPm");

let theTime = document.querySelector(".time");
let setBtn = document.querySelector(".setBtn");
let selection = document.querySelector(".selection");
let alarmAudio = new Audio("../images/audio.mp3");
let determinedTime;
let isClicked = false;
function getTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let flag = "AM";
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour -= 12;
    flag = "PM";
  }
  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  theTime.innerHTML = `${hour}:${minutes}:${seconds}` + " " + `${flag}`; //display current time on page load
  if (determinedTime === `${hour}:${minutes}:${flag}`) {
    alarmAudio.play();
    alarmAudio.loop = true;
  }
  setTimeout(() => {
    getTime();
  }, 1000);
}

getTime();

// create hours
for (let i = 12; i >= 1; i--) {
  let theHour = i < 10 ? "0" + i : i;
  let option = `<option value=${theHour}>${theHour}</option>`;
  hourSelect.insertAdjacentHTML("afterbegin", option);
}
// create minutes
for (let i = 60; i >= 1; i--) {
  let theMinute = i < 10 ? "0" + i : i;
  let option = `<option value=${theMinute}>${theMinute}</option>`;
  minuteSelect.insertAdjacentHTML("afterbegin", option);
}

// create AM/PM
for (let i = 2; i >= 1; i--) {
  let APM = i === 1 ? "AM" : "PM";
  let option = `<option value=${APM}>${APM}</option>`;
  AmPmSelect.insertAdjacentHTML("afterbegin", option);
}

function addAlarm() {
  if (isClicked) {
    alarmAudio.pause();
    selection.classList.remove("hidden");
    setBtn.innerHTML = "set alarm";
    determinedTime = "";
    return;
  }
  let time = `${hourSelect.value}:${minuteSelect.value}:${AmPmSelect.value}`;
  determinedTime = time;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    alert("You Should Determined Your Time .");
  }
  isClicked = true;
  setBtn.innerHTML = "You Should Wake Up !!!!!";
  selection.classList.add("hidden");
}
setBtn.addEventListener("click", () => {
  addAlarm();
});
console.log(isClicked);

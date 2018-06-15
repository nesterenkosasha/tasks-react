import { regExpText, regExpDate, currentTime, msInHour, msInMinute, msInSecond } from './constants';

export function currentMs(date) {
  const parsed = Date.parse(new Date(date));
  const ms = parsed - currentTime;
  if (ms > 0) {
    return ms;
  }
  throw new Error('Data is not valid');
}

export function validation(text, date) {
  try {
    if (!regExpText.test(text) || !regExpDate.test(date) || !currentMs(date)) {
      throw new Error('Your data is not valid!');
    } else {
      return true;
    }
  } catch ({ message }) {
    console.error(message);
    return false;
  }
}

export function renderToDom(domEl, childrens) {
  return childrens.forEach((element) => {
    domEl.appendChild(element);
  });
}

export function findById(id) {
  return document.getElementById(id);
}

export function showTimer(date) {
  const hours = (date - Date.now()) / msInHour;
  const minutes = ((date - Date.now()) % msInHour) / msInMinute;
  const seconds = (((date - Date.now()) % msInHour) % msInMinute) / msInSecond;
  return `${parseInt(hours, 10)} : ${parseInt(minutes, 10)} : ${parseInt(seconds, 10)}`;
}

// export function renderTimer(date) {
//   const interval = setInterval(() => {
//     if (this.date < Date.now()) {
//       console.log(interval);
//       clearInterval(interval);
//       const hours = (date - Date.now()) / msInHour;
//       const minutes = ((date - Date.now()) % msInHour) / msInMinute;
//       const seconds = (((date - Date.now()) % msInHour) % msInMinute) / msInSecond;
//       return `${parseInt(hours, 10)} : ${parseInt(minutes, 10)} : ${parseInt(seconds, 10)}`;
//     }
//   }, 1000);
// }

// export function checkTimer(date) {
//   const interval = setInterval(() => {
//     if (this.date < Date.now()) {
//       console.log(interval);
//       clearInterval(interval);
//       const hours = (date - Date.now()) / msInHour;
//       const minutes = ((date - Date.now()) % msInHour) / msInMinute;
//       const seconds = (((date - Date.now()) % msInHour) % msInMinute) / msInSecond;
//       return `${parseInt(hours, 10)} : ${parseInt(minutes, 10)} : ${parseInt(seconds, 10)}`;
//     }
//   }, 1000);
// }


// function showTime(time){
//     let hours = (time - Date.now()) /  msInHour;
//     let minutes = ((time - Date.now()) % msInHour) / msInMinute;
//     let seconds = (((time - Date.now()) % msInHour) % msInMinute) / msInSecond;
//     return `${parseInt(hours)} : ${parseInt(minutes)} : ${parseInt(seconds)}`
// }


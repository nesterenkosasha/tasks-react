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
    alert(message);
    return false;
  }
}

export function renderToDom(domEl, childrens) {
  return childrens.forEach((element) => {
    domEl.appendChild(element);
  });
}

export function selectByProperty(arr, property, value) {
  return arr.reduce((acc, obj) => {
    if(obj.hasOwnProperty(property) === true && obj[property] === value){
      acc = acc.concat(obj)
    }
    return acc
  }, [])
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

export function showDefaultTime() {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth()+1;
  const day = currentTime.getDate();
  const hour = currentTime.getHours();
  const min = currentTime.getMinutes()+1;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
}


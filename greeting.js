const form = document.querySelector(".js-form");
const usernameInput = document.querySelector("input");
const greeting = document.querySelector(".greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = usernameInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadname() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadname();
}

init();

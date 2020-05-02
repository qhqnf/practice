const form = document.querySelector(".calculator");
const resultScreen = document.querySelector(".result");

let carrying = 0;
let result = 0;
let screenNum = "";
let system = "";

function plus() {
  system = "plus";
}

function minus() {
  system = "minus";
}

function divid() {
  system = "divid";
}

function multiply() {
  system = "multiply";
}

function temp() {
  if (carrying !== 0) {
    equal();
    carrying = result;
  } else {
    carrying = parseInt(screenNum);
  }
  screenNum = "";
}

function equal() {
  if (system === "plus") {
    result = carrying + parseInt(screenNum);
    resultScreen.innerText = result;
  } else if (system === "minus") {
    result = carrying - parseInt(screenNum);
    resultScreen.innerText = result;
  } else if (system === "multiply") {
    result = carrying * parseInt(screenNum);
    resultScreen.innerText = result;
  } else if (system === "divid") {
    result = carrying / parseInt(screenNum);
    resultScreen.innerText = result;
  }
}

function clean() {
  carrying = 0;
  screenNum = "";
  resultScreen.innerText = "";
}

function handleButtonClick(event) {
  event.preventDefault();
  const btn = event.target;
  if (btn.classList.contains("num-btn")) {
    const num = btn.innerText;
    screenNum = screenNum + num;
    resultScreen.innerText = screenNum;
  } else if (btn.classList.contains("operation-btn")) {
    if (btn.classList.contains("plus")) {
      temp();
      plus();
    } else if (btn.classList.contains("minus")) {
      temp();
      minus();
    } else if (btn.classList.contains("divid")) {
      temp();
      divid();
    } else if (btn.classList.contains("multiply")) {
      temp();
      multiply();
    }
  } else if (btn.classList.contains("equal-btn")) {
    equal();
    carrying = 0;
  } else if (btn.classList.contains("clean-btn")) {
    clean();
  }
}

function init() {
  form.addEventListener("click", handleButtonClick);
}

init();

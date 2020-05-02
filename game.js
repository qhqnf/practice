const rangeForm = document.querySelector(".js-rangeForm");
const rangeInput = document.querySelector(".js-rangeInput");
const submitForm = document.querySelector(".js-submitForm");
const submitInput = document.querySelector(".js-submitInput");
const output = document.querySelector(".js-output");
const result = document.querySelector(".js-result");
const subtitleRange = document.querySelector(".js-subtitle__2");

let MAX_RANGE = 100;

function generateRandom() {
  const randomNum = Math.ceil(Math.random() * MAX_RANGE);
  return randomNum;
}

function catchRange(event) {
  event.preventDefault(event);
  const maxRange = rangeInput.value;
  MAX_RANGE = maxRange;
}

function handleSubmit(event) {
  event.preventDefault();
  const num = parseInt(submitInput.value);
  if (num !== "") {
    const machine = generateRandom();
    output.innerText = `You chose: ${num}, the machine chose: ${machine}.`;
    console.log(num);
    console.log(machine);
    if (num === machine) {
      result.innerText = "You Win!";
    } else {
      result.innerText = "You Lose!";
    }
  }
}

function init() {
  rangeForm.addEventListener("click", catchRange);
  rangeInput.addEventListener(
    "input",
    function () {
      subtitleRange.innerText = rangeInput.value;
    },
    false
  );
  submitForm.addEventListener("submit", handleSubmit);
}

init();

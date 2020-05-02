const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");
const task = document.querySelector(".js-taskForm");
const input = task.querySelector("input");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pendings = [];
let finisheds = [];

function backToPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.childNodes[0].innerText;
  finishedList.removeChild(li);
  const cleanFinishedList = finisheds.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  finisheds = cleanFinishedList;
  saveFinisheds();
  toPending(text);
}

function delPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPendingList = pendings.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  pendings = cleanPendingList;
  savePendings();
}

function delFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinishedList = finisheds.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  finisheds = cleanFinishedList;
  saveFinisheds();
}

function toFinished(event) {
  delPending(event);
  const btn = event.target;
  const text = btn.parentNode.childNodes[0].innerText;
  const li = document.createElement("li");
  const span = document.createElement("span");
  //li.removeChild(li.childNodes[1]);
  //li.removeChild(li.childNodes[1]);
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const newId = finisheds.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  backBtn.innerText = "↩";
  delBtn.addEventListener("click", delFinished);
  backBtn.addEventListener("click", backToPending);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: li.childNodes[0].innerText,
    id: newId,
  };
  finisheds.push(finishedObj);
  saveFinisheds();
}

function savePendings() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function saveFinisheds() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function loadFinished(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const newId = finisheds.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  backBtn.innerText = "↩";
  delBtn.addEventListener("click", delFinished);
  backBtn.addEventListener("click", backToPending);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: li.childNodes[0].innerText,
    id: newId,
  };
  finisheds.push(finishedObj);
  saveFinisheds();
}

function toPending(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendings.length + 1;
  delBtn.addEventListener("click", delPending);
  checkBtn.addEventListener("click", toFinished);
  delBtn.innerText = "❌";
  checkBtn.innerText = "✔";
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const pendingObj = {
    text: text,
    id: newId,
  };
  pendings.push(pendingObj);
  savePendings();
}

function handleSubmit(event) {
  event.preventDefault();
  const task = input.value;
  toPending(task);
  input.value = "";
}

function loadItems() {
  const loadPendingItem = localStorage.getItem(PENDING_LS);
  const loadFinishedItem = localStorage.getItem(FINISHED_LS);
  if (loadPendingItem !== null) {
    const paresedPending = JSON.parse(loadPendingItem);
    paresedPending.forEach(function (task) {
      toPending(task.text);
    });
  }
  if (loadFinishedItem !== null) {
    const parsedFinishedItem = JSON.parse(loadFinishedItem);
    parsedFinishedItem.forEach(function (task) {
      loadFinished(task.text);
    });
  }
}

function init() {
  loadItems();
  task.addEventListener("submit", handleSubmit);
}

init();

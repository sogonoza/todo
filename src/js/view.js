"use strict";

export const deleteCheckBox = document.querySelector(
  ".header__checkbox--input"
);
const list = document.querySelector(".list");
const form = document.querySelector(".addNewTask__form");
const orderSelect = document.querySelector(".orderSelect__select");
const addNewBtn = document.querySelector(".addNewTask__btn");

// DISPLAY ALL THE TASKS
export const renderTasks = function (data, deleteCheck) {
  const listContaier = document.querySelector(".list__container");
  let tasksCode = ``;

  const importanceMaker = function (word) {
    if (word === "死ぬほど重要") return "crucial";
    if (word === "重要") return "important";
    if (word === "普通") return "normal";
    if (word === "やらなくてもいい") return "unnecessary";
  };

  for (let i = 0; i < data.length; i++) {
    if (!deleteCheck && data[i].complete) continue;

    tasksCode += `
        <li class="list__item" data-id="${data[i].id}">
        <input type="checkbox" class="list__item--checkbox" ${
          deleteCheck && data[i].complete ? "checked" : ""
        } />
        <div class='list__item--content ${
          deleteCheck && data[i].complete ? "strikethrough" : ""
        } ${!deleteCheck && data[i].complete ? "completed" : ""}'>
        <div
            class="list__item--content--importance list__item--content--importance--${importanceMaker(
              data[i].importance
            )}"
        >
            ${data[i].importance}
        </div>
        <div class="list__item--content--title">${data[i].text}</div>
        <div class="list__item--content--deadline">期限:${
          data[i].deadline ? data[i].deadline : "なし"
        }</div>
        ${
          data[i].comment
            ? `<div class="list__item--content--notes">
        <img
        src="/src/img/comment.svg"
        alt=""
        class="list__item--content--notes--icon"
        />
        <div class="list__item--content--notes--comment">
            <p class="list__item--content--notes--comment--text">
            ${data[i].comment}
            </p>
        </div>
    </div>`
            : ""
        }
        </div>
    </li>
    `;
  }

  listContaier.innerHTML = "";

  listContaier.insertAdjacentHTML("beforeend", tasksCode);
};

// CHECKBOX CONTROL FOR COMPLETED TASK WITH DELETE OR STRIKETHROUGH
export const bindDeleteCheckHandler = function (handler) {
  deleteCheckBox.addEventListener("change", handler);
};

// CHECKBOX OF EACH TASK
export const bindCompleteCheckbox = function (handler) {
  list.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
      const clickedId = Number(e.target.closest("li").dataset.id);
      handler(clickedId);
    }
  });
};

// Handler for clicking "Add New" btn
export const bindAddNewBtn = function () {
  addNewBtn.addEventListener("click", function () {
    form.classList.toggle("active");
  });
};

// Handler for adding new task
export const bindAddNewTask = function (handler) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    handler();
  });
};

// Handler for changing select for order of the list
export const bindOrderSelect = function (handler) {
  orderSelect.addEventListener("change", function () {
    handler(orderSelect.value);
  });
};

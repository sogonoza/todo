import * as model from "./model.js";
import * as view from "./view.js";

const inputTaskTitle = document.querySelector(".addNewTask__form--title");
const inputComment = document.getElementById("comment");
const inputDeadline = document.getElementById("deadline");

// CHECKBOX CONTROL FOR COMPLETED TASK WITH DELETE OR STRIKETHROUGH
const deleteCheckHandler = function () {
  model.deleteCheckManage(view.deleteCheckBox);
  const listItems = document.querySelectorAll(".list__item");

  // re-display deleted task
  if (model.deleteCheck) {
    Array.from(listItems).forEach((el) => {
      if (el.classList.contains("completed")) {
        el.querySelector(".list__item--content").classList.add("strikethrough");
        el.classList.remove("completed");
      }
    });
  }
  if (!model.deleteCheck) {
    Array.from(listItems).forEach((el) => {
      if (el.querySelector("input").checked) {
        el.classList.add("completed");
        el.classList.remove("strikethrough");
      }
    });
  }
};

// CHECKBOX CONTROL FOR EVENTLISTENER
const completeCheckboxHandler = function (clickedId) {
  const listItems = document.querySelectorAll(".list__item");
  const currentItem = Array.from(listItems).find(
    (i) => Number(i.dataset.id) === clickedId
  );
  let currentItemContent = currentItem.querySelector(".list__item--content");
  let currentListItemCheckbox = currentItem.querySelector(
    ".list__item--checkbox"
  );

  model.toggleCompleteState(clickedId);

  if (
    model.deleteCheck === true &&
    model.model.find((el) => el.id === clickedId).complete
  ) {
    currentItemContent.classList.add("strikethrough");
  }
  if (
    model.deleteCheck === true &&
    !model.model.find((el) => el.id === clickedId).complete
  ) {
    currentItemContent.classList.remove("strikethrough");
    currentItem.classList.remove("completed");
  }
  if (
    model.deleteCheck === false &&
    model.model.find((el) => el.id === clickedId).complete
  ) {
    currentItem.classList.add("completed");
  }
};

const addNewTaskHandler = function () {
  const importance = document.getElementById("importance").value;
  const taskTitle = document.getElementById("taskTitle").value;
  const deadline = document.getElementById("deadline").value;
  const comment = document.getElementById("comment").value;

  const importanceNumList = {
    死ぬほど重要: 1,
    重要: 2,
    普通: 3,
    やらなくてもいい: 4,
  };

  if (taskTitle === "") {
    alert("タスク名がないと、何のタスクか分かりません😇");
    return;
  }

  model.addToModel({
    id: model.model.length + 1,
    importance: `${importance}`,
    importanceNum: `${importanceNumList[importance]}`,
    text: `${taskTitle}`,
    deadline: `${deadline}`,
    comment: `${comment}`,
    complete: false,
  });

  console.log(model.model);

  if (model.orderPreference === "old")
    view.renderTasks(model.model, model.deleteCheck);
  if (model.orderPreference === "new") {
    const orderedData = [...model.model].reverse();
    view.renderTasks(orderedData, model.deleteCheck);
  }
  if (model.orderPreference === "deadline") {
    const orderedData = [...model.model].sort(function (a, b) {
      if (a.deadline === "") return 1;
      if (b.deadline === "") return -1;

      const stringA = a.deadline.split("-").join("");
      const stringB = b.deadline.split("-").join("");

      if (stringA > stringB) {
        return 1;
      } else {
        return -1;
      }
    });
    view.renderTasks(orderedData, model.deleteCheck);
  }
  if (model.orderPreference === "importance") {
    const orderedData = [...model.model].sort(
      (a, b) => a.importanceNum - b.importanceNum
    );
    view.renderTasks(orderedData, model.deleteCheck);
  }

  inputTaskTitle.value = "";
  inputComment.value = "";
  inputDeadline.value = "";
};

// SELECT CONTROL FOR ORDER OF THE LIST
const orderSelectHandler = function (selectedPreference) {
  model.changeOrderPreference(selectedPreference);

  if (selectedPreference === "old") {
    view.renderTasks(model.model, model.deleteCheck, model.orderPreference);
  }
  if (selectedPreference === "new") {
    const reversedList = [...model.model].reverse();
    view.renderTasks(reversedList, model.deleteCheck, model.orderPreference);
  }

  if (model.orderPreference === "deadline") {
    const orderedData = [...model.model].sort(function (a, b) {
      if (a.deadline === "") return 1;
      if (b.deadline === "") return -1;

      const stringA = a.deadline.split("-").join("");
      const stringB = b.deadline.split("-").join("");

      if (stringA > stringB) {
        return 1;
      } else {
        return -1;
      }
    });
    view.renderTasks(orderedData, model.deleteCheck);
  }

  if (model.orderPreference === "importance") {
    const orderedData = [...model.model].sort(
      (a, b) => a.importanceNum - b.importanceNum
    );
    view.renderTasks(orderedData, model.deleteCheck);
  }
};

const init = function () {
  view.renderTasks(model.model, model.deleteCheck);
  view.bindAddNewTask(addNewTaskHandler);
  view.bindCompleteCheckbox(completeCheckboxHandler);
  view.bindDeleteCheckHandler(deleteCheckHandler);
  view.bindOrderSelect(orderSelectHandler);
  view.bindAddNewBtn();
};
init();

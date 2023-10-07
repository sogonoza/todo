export const model = [
  {
    id: 1,
    importance: "死ぬほど重要",
    importanceNum: 1,
    text: "宿題やる",
    deadline: "",
    comment:
      "これやらないと留年なので、確実にやる。去年、他のやつをパクった先輩が失格になったので、パクリなし。",
    complete: false,
  },
  {
    id: 2,
    importance: "重要",
    importanceNum: 2,
    text: "教授のところに謝りに行く",
    deadline: "",
    comment:
      "無断欠席で落第しそうなので、救済を求めに行く。差し入れのお菓子を持っていくべき。",
    complete: false,
  },
  {
    id: 3,
    importance: "やらなくてもいい",
    importanceNum: 4,
    text: "友達にノート貸す",
    deadline: "",
    comment: "貸しても良いことないので、貸さなくてもいい。",
    complete: false,
  },
];

// TOGGLE COMPLETE STATE
export const toggleCompleteState = function (id) {
  const targetItem = model.find((el) => el.id === id);
  targetItem.complete = !targetItem.complete;
};

// CHECKBOX CONTROL FOR COMPLETED TASK WITH DELETE OR STRIKETHROUGH
export let deleteCheck = false;
export const deleteCheckManage = function (targetBox) {
  if (targetBox.checked) {
    deleteCheck = true;
  } else {
    deleteCheck = false;
  }
};

// CONTROL FOR ADDING NEW TASK
export const addToModel = function (newTask) {
  model.push(newTask);
};

// PREFERENCE FOR THE ORDER OF THE LIST
export let orderPreference = "old";

export const changeOrderPreference = function (newPreference) {
  orderPreference = newPreference;
};

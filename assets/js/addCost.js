"use strict";

//Buttons
const openModal = document.getElementById("addExpense");
const logout = document.getElementById("logout");
const closeModal = document.getElementById("closeAddCostModal");
const addCost = document.getElementById("add");

//Dialog and expenses container
const expenseModal = document.getElementById("addExpenseModal");
const expenseContainer = document.getElementById("listExpenses");

//Inputs
const inputNome = document.getElementById("inputNome");
const inputValue = document.getElementById("inputValue");
const inputCategory = document.getElementById("inputCategory");

//Handling modal closing and opening
openModal.addEventListener("click", () => {
  expenseModal.showModal();
  expenseModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  expenseModal.close();
  expenseModal.style.display = "none";
});

const createEl = function (name, priceValue, categoryValue, currDate) {
  const element = document.createElement("div");
  element.classList.add("boxExpense");

  const title = document.createElement("h4");
  title.innerText = name;
  element.appendChild(title);

  const price = document.createElement("p");
  price.innerText = `R$ ${priceValue}`;
  element.appendChild(price);

  const category = document.createElement("p");
  category.innerText = categoryValue;
  element.appendChild(category);

  const todayDate = document.createElement("p");
  todayDate.innerText = currDate;
  element.appendChild(todayDate);

  const buttonElement = document.createElement("div");
  buttonElement.classList.add("buttons");

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';
  buttonElement.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
  buttonElement.appendChild(deleteBtn);

  element.appendChild(buttonElement);

  expenseContainer.appendChild(element);
};

const getTodayDate = function () {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const currDate = `${day}/${month}/${year}`;
  console.log(currDate);
  return currDate;
};

addCost.addEventListener("click", () => {
  const nameValue = inputNome.value;
  const priceValue = inputValue.value;
  const categoryValue = inputCategory.value;
  createEl(nameValue, priceValue, categoryValue, getTodayDate());

  //Reseting inputs values
  inputNome.value = "";
  inputValue.value = "";
  inputCategory.value = "";

  //Closing modal after adding a expense
  expenseModal.close();
  expenseModal.style.display = "none";
});

logout.addEventListener("click", () => {
  const href = (window.location.href = "index.html");
  window.location.replace(href);
});

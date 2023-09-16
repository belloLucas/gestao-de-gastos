"use strict";

//Buttons
const openAddModal = document.getElementById("addExpense");
const closeAddModal = document.getElementById("closeAddCostModal");
const closeEditModal = document.getElementById("closeEditCostModal");
const logout = document.getElementById("logout");
const addCost = document.getElementById("add");

//Modals and expenses container
const expenseModal = document.getElementById("addExpenseModal");
const editModal = document.getElementById("editExpenseModal");
const expenseContainer = document.getElementById("listExpenses");

//Add expense Inputs
const inputNome = document.getElementById("inputNome");
const inputValue = document.getElementById("inputValue");
const inputCategory = document.getElementById("inputCategory");

//Edit expense inputs
const editName = document.getElementById("editName");
const editPrice = document.getElementById("editValue");
const editCategory = document.getElementById("editCategory");

//Handling add Modal closing and opening
openAddModal.addEventListener("click", () => {
  expenseModal.showModal();
  expenseModal.style.display = "flex";
});

closeAddModal.addEventListener("click", () => {
  expenseModal.close();
  expenseModal.style.display = "none";
});

//Handling the creation of boxExpense element
const createEl = function (name, priceValue, categoryValue, currDate) {
  const element = document.createElement("div");
  element.classList.add("boxExpense");

  const title = document.createElement("h4");
  title.classList.add("title");
  title.innerText = name;
  element.appendChild(title);

  const price = document.createElement("p");
  price.classList.add("price");
  price.innerText = `R$ ${priceValue}`;
  element.appendChild(price);

  const category = document.createElement("p");
  category.classList.add("category");
  category.innerText = categoryValue;
  element.appendChild(category);

  const todayDate = document.createElement("p");
  todayDate.classList.add("todayDate");
  todayDate.innerText = currDate;
  element.appendChild(todayDate);

  const buttonElement = document.createElement("div");
  buttonElement.classList.add("buttons");

  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.onclick = editCost;
  editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';
  buttonElement.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.onclick = deleteCost;
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

//Handling edit
const editCost = function (e) {
  //Handling the modal opening and closing
  const clickedBtn = e.target;
  const boxExpense = clickedBtn.closest(".boxExpense");
  if (boxExpense) {
    editModal.showModal();
    editModal.style.display = "flex";

    const getValues = function () {
      //Getting the values from editInputs
      const editNameValue = editName.value;
      const editPriceValue = editPrice.value;
      const editCategoryValue = editCategory.value;

      //Getting the text elements from boxExpense
      const title = document.querySelector(".title");
      const price = document.querySelector(".price");
      const category = document.querySelector(".category");
      const date = document.querySelector(".todayDate");

      //Setting the new values
      title.innerText = editNameValue;
      price.innerText = `R$ ${editPriceValue}`;
      category.innerText = editCategoryValue;
      date.innerText = getTodayDate();
    };

    const addEdit = document.getElementById("edit");
    addEdit.addEventListener("click", () => {
      getValues();
      editModal.close();
      editModal.style.display = "none";
      editName.value = "";
      editPrice.value = "";
      editCategory.value = "";
    });

    closeEditModal.addEventListener("click", () => {
      editModal.close();
      editModal.style.display = "none";
    });
  }
};

//Handling delete
const deleteCost = function (e) {
  const clickedBtn = e.target;
  const boxExpense = clickedBtn.closest(".boxExpense");
  if (boxExpense) boxExpense.remove();
};

logout.addEventListener("click", () => {
  const href = (window.location.href = "index.html");
  window.location.replace(href);
});

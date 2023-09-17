"use strict";

window.onload = () => {
  const gain = parseFloat(prompt("Digite quanto você recebeu: "));
  getSalary(gain);
};

//Buttons
const openAddModal = document.getElementById("addExpense");
const closeAddModal = document.getElementById("closeAddCostModal");
const closeEditModal = document.getElementById("closeEditCostModal");
const logout = document.getElementById("logout");
const addCost = document.getElementById("add");

const search = document.getElementById("search");

//Values boxes
const gainValue = document.getElementById("gains");
const spentValue = document.getElementById("costs");
const totalValue = document.getElementById("total");
let spentCost = 0;
let total = 0;

//Modals and expenses container
const expenseModal = document.getElementById("addExpenseModal");
const editModal = document.getElementById("editExpenseModal");
const expenseContainer = document.getElementById("listExpenses");

//Add expense Inputs
const inputNome = document.getElementById("inputNome");
const inputValue = document.getElementById("inputValue");
const inputCategory = document.getElementById("inputCategory");

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

const getSalary = function (salary) {
  const gain = salary;
  const gainTitle = gainValue.querySelector("h1");
  gainTitle.innerText = `R$ ${parseFloat(gain)}`;

  const totalTitle = totalValue.querySelector("h1");
  totalTitle.innerText = `R$ ${parseFloat(gain)}`;
  total = gain;
};

addCost.addEventListener("click", () => {
  const nameValue = inputNome.value;
  const priceValue = parseFloat(inputValue.value);
  const categoryValue = inputCategory.value;
  createEl(nameValue, priceValue, categoryValue, getTodayDate());

  //Adding the cost value to the box Costs
  spentCost = spentCost += priceValue;
  spentValue.querySelector("h1").innerText = `R$ ${spentCost}`;

  //Subtracting the cost value from the total value
  total -= priceValue;
  totalValue.querySelector("h1").innerText = `R$ ${total}`;

  //Reseting inputs values
  inputNome.value = "";
  inputValue.value = "";
  inputCategory.value = "";

  //Closing modal after adding a expense
  expenseModal.close();
  expenseModal.style.display = "none";
});

//Handling edit
const editCost = function (event) {
  //Handling the modal opening and closing
  editModal.showModal();
  editModal.style.display = "flex";

  //Getting the edit inputs
  const editName = document.getElementById("editName");
  const editPrice = document.getElementById("editValue");
  const editCategory = document.getElementById("editCategory");

  const boxExpense = event.target.closest(".boxExpense");
  console.log(boxExpense);

  const addEdit = document.getElementById("edit");
  addEdit.addEventListener("click", () => {
    if (boxExpense === event.target.closest(".boxExpense")) {
      //Retrieving inputs values
      const editNameValue = editName.value;
      const editPriceValue = editPrice.value;
      const editCategoryValue = editCategory.value;

      //Setting the new values that were retrieved from the editInputs
      boxExpense.querySelector(".title").innerText = editNameValue;
      boxExpense.querySelector(".price").innerText = `R$ ${editPriceValue}`;
      boxExpense.querySelector(".category").innerText = editCategoryValue;
      boxExpense.querySelector(".todayDate").innerText = getTodayDate();
    }

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
};

//Handling delete
const deleteCost = function (e) {
  const clickedBtn = e.target;
  const boxExpense = clickedBtn.closest(".boxExpense");

  //Removing the price of the element that is being removed
  const priceEl = boxExpense.querySelector(".price");
  const priceText = priceEl.innerText;
  const price = parseFloat(priceText.replace("R$", "").trim());
  console.log(price);
  spentCost = spentCost - price;
  spentValue.querySelector("h1").innerText = `R$ ${spentCost}`;

  if (boxExpense) boxExpense.remove();
};

const filterBox = function () {
  const boxExpense = document.querySelectorAll(".boxExpense");
  if (search.value) {
    for (let box of boxExpense) {
      let titleEl = box.querySelector("h4");
      let title = titleEl.textContent.toLowerCase();

      let searchValue = search.value.toLowerCase();
      console.log(searchValue);

      if (!title.includes(searchValue)) {
        console.log("titulo difere do texto do filtro");
        box.style.display = "none";
      } else {
        console.log("titulo igual ao texto do input");
        box.style.display = "grid";
      }
    }
  } else {
    for (let box of boxExpense) {
      box.style.display = "grid";
    }
  }
};

search.addEventListener("input", filterBox);

logout.addEventListener("click", () => {
  const href = (window.location.href = "index.html");
  window.location.replace(href);
});

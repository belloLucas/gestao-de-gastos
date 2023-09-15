"use strict";

//Buttons
const openModalBtn = document.getElementById("openLoginModalButton");
const closeModalBtn = document.getElementById("closeLoginModal");
const loginBtn = document.getElementById("login");

//Other inputs
const loginModal = document.getElementById("loginModal");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

//User object, which contains the valid email and password
const user = {
  email: "email@email.com",
  password: "1234",
};

//Opening modal
openModalBtn.addEventListener("click", () => {
  loginModal.showModal();
  loginModal.style.display = "flex";
});

//Closing modal
closeModalBtn.addEventListener("click", () => {
  loginModal.close();
  loginModal.style.display = "none";
});

const login = function () {
  if (
    inputEmail.value === user.email &&
    inputPassword.value === user.password
  ) {
    alert("Login realizado com sucesso!");
    loginModal.close();
    loginModal.style.display = "none";

    //Redirecting to crud.html
    const href = (window.location.href = "crud.html");
    window.location.replace(href);
  } else {
    alert(
      "Não foi possível efetuar o login. Verifique seu e-mail e senha e tente novamente."
    );
  }
};

loginBtn.addEventListener("click", login);

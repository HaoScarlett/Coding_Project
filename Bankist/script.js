"use strict";
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const h1 = document.querySelector('h1');
//-------- Nav bar scroll --------//
// Touch every link and add the same fn to them. It's not efficient.
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Better solution: Target the common parent element
// then determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy: only trigger the event when target link is clicked
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//-------- H1 Dom traversing --------//
// h1.querySelectorAll('.highlight') 
h1.firstElementChild.style.color = "white";
// h1.closest('.header').style.background = "pink"


//-------- Modal window --------//
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// ----- Utility Functions -----
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Cookie message
const cookieMessage = document.createElement("div");
cookieMessage.classList.add("cookie-message");
cookieMessage.innerHTML =
  'We use cookies for improving analytics. <button class="btn btn--close-cookie">Got it.</button>';
header.append(cookieMessage);
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    cookieMessage.remove();
  });

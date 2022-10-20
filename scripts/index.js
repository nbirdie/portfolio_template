
// Tabs
const tabLinks = document.querySelectorAll(".tabs__header-item");
const tabPanels = document.querySelectorAll(".tabs__content-item");

for (let el of tabLinks) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".tabs__header-item.active ")
      .classList.remove("active");
    document
      .querySelector(".tabs__content-item.active")
      .classList.remove("active");

    const parentListItem = el;
    parentListItem.classList.add("active");
    const index = [...parentListItem.parentElement.children].indexOf(
      parentListItem
    );
    const panel = [...tabPanels].filter(
      (el) => el.getAttribute("data-index") == index
    );
    panel[0].classList.add("active");
  });
}

// Accordion
const accItems = document.querySelectorAll(".accordion__item");

for (let el of accItems) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const elHeader = e.target.closest(".accordion__header");
    if (!elHeader) {
      return;
    }
    const parentElemenet = document.querySelector(".tabs__content-item.active");
    const elOpenItem = parentElemenet.querySelector(".accordion__item_show");
    if (elOpenItem) {
      // и он не равен текущему, то переключим ему класс accordion__item_show
      elOpenItem !== elHeader.parentElement.parentElement
        ? elOpenItem.classList.toggle("accordion__item_show")
        : null;
    }
    // переключим класс accordion__item_show элемента .accordion__header
    elHeader.parentElement.parentElement.classList.toggle(
      "accordion__item_show"
    );
  });
}

// popup
const popup = document.querySelector(".popup");
const contactButton = document.querySelector(".contact__btn");
const closeButton = document.querySelector(".popup__close-button");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function submitByEnter(evt) {
  if ((evt.key = 13)) {
    closePopup(popup);
  }
}

function submitAction(evt) {
  evt.preventDefault();
  closePopup(popup);
}

contactButton.addEventListener("click", (e) => {
  e.preventDefault();
  openPopup(popup);
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("keyup", submitByEnter);
  popup.addEventListener("click", closePopupByClick);
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  closePopup(popup);
});

popup.addEventListener("submit", submitAction);

// smooth scrool

//change cursor
function changeCursor() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".follower");

  var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

gsap.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    
    gsap.set(follower, {
        css: {    
        left: posX - 12,
        top: posY - 12
        }
    });
    
    gsap.set(cursor, {
        css: {    
        left: mouseX,
        top: mouseY
        }
    });
  }
});

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

changeCursor();

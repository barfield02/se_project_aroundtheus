import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector("#add-card-form");

const cardTitleInput = addCardFormElement.querySelector(
  "#add-card-title-input"
);
const cardDescriptionInput = addCardFormElement.querySelector(
  "#add-card-description-input"
);
const addCardCloseButton = document.querySelector("#modal-add-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const editProfileCloseButton = document.querySelector(
  "#modal-edit-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardListEl = document.querySelector(".cards__list");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addImageCardModal = document.querySelector("#add-image-card-modal");
const addImageCardForm = addImageCardModal.querySelector(
  "#add-image-card-form"
);
const addImageCardCloseButton =
  addImageCardModal.querySelector(".modal__close");
const imageCaption = addImageCardModal.querySelector(".modal__caption");
const modalImage = addImageCardModal.querySelector(".modal__image");
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopup(openModal);
    }
  }
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function handleCardClick(data) {
  popupWithImage.open(data);
}
function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, InputValues.value);

  // profileTitle.textContent = profileTitleInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;

  //closePopup(profileEditModal);
  popupEditWithForm.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.value;
  renderCard({ name, link });
  // addCardFormElement.reset();
  // closePopup(addCardModal);
  popupAddWithForm.close();
  popupAddWithForm.resetForm();
  addFormValidator.disableButton();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

function renderCard(cardData) {
  // const cardElement = getCardElement(cardData);

  const cardElement = createCard(cardData);
  section.addItem(cardElement);
  // cardListEl.prepend(cardElement);
}

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormValidator.enableValidation();

const popupEditWithForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
popupEditWithForm.setEventListeners();

const popupAddWithForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
popupAddWithForm.setEventListeners();

// profileEditForm.addEventListener("click", () => {});
// addCardFormElement.addEventListener("click", () => {});

// Call it's setEventListeners() method
// Do this once for each form

const popupWithImage = new PopupWithImage({
  popupSelector: "#add-image-card-modal",
});
popupWithImage.setEventListeners();

const section = new Section({
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card);
  },
  selector: ".cards__list",
});

section.renderItems(initialCards);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// opening the edit-profile modal by clicking the profile edit button (the pencil icon)
profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.description;

  // call popup's open method instead
  //openPopup(profileEditModal);
  popupEditWithForm.open();
});

const closeButtons = document.querySelectorAll(".modal__close");
// remove: closing will be handled by popup class

//closeButtons.forEach((button) => {
// Find the closest popup only once
//  const popup = button.closest(".modal");
// Set the listener
//  button.addEventListener("click", () => closePopup(popup));
// });

// also remove submission listeners bc popupwithform will handle this
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// open modal
addNewCardButton.addEventListener("click", () => {
  popupAddWithForm.open();
});

//initialCards.forEach((cardData) => renderCard(cardData));

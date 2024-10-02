import Card from "../scripts/Card.js";
import FormValidator from "../scripts/formValidator.js";

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
[addImageCardModal, profileEditModal, addCardModal].forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

function handleCardClick() {
  modalImage.src = this.link;
  modalImage.alt = this.name;
  openPopup(addImageCardModal);
  imageCaption.textContent = this.name;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardDescriptionInput.value;
  renderCard({ name, link });
  e.target.reset();
  // addCardFormElement.reset();
  closePopup(addCardModal);
  addFormValidator.disableButton();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

function renderCard(cardData) {
  // const cardElement = getCardElement(cardData);

  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

// opening the edit-profile modal by clicking the profile edit button (the pencil icon)
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

// close the edit-profile modal by clicking the close button
//editProfileCloseButton.addEventListener("click", () => {
//closePopup(profileEditModal);
//});

//close the addCardModal by clicking the close button
//addCardCloseButton.addEventListener("click", () => {
// closePopup(addCardModal);
//});

//close the addImageCardModal
//addImageCardCloseButton.addEventListener("click", () => {
//closePopup(addImageCardModal);
//});
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// open modal
addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData));

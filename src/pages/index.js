import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";

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

function handleCardClick(data) {
  popupWithImage.open(data);
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  popupEditWithForm.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues["image-url"];

  renderCard({ name, link });
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

const popupWithImage = new PopupWithImage({
  popupSelector: "#add-image-card-modal",
});
popupWithImage.setEventListeners();

const section = new Section({
  renderer: (item) => {
    // const card = createCard(item);

    // section.addItem(card);
    renderCard(item);
  },
  selector: ".cards__list",
});

section.renderItems(initialCards);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.description;
  popupEditWithForm.open();
});

addNewCardButton.addEventListener("click", () => {
  popupAddWithForm.open();
});

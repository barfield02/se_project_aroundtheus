import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";

const deleteCardForm = document.querySelector("#delete-card-form");

const deleteCardButton = document.querySelector(
  "#modal-delete-card-close-button"
);
const deleteCardModal = document.querySelector("#delete-card-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector("#add-card-form");
const editAvatarButton = document.querySelector(".header__logo-button");

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
const avatarEditModal = document.querySelector("#profile-avatar-modal");
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
const avatarEditForm = avatarEditModal.querySelector(".modal__form");
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

// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     if (openModal) {
//       closePopup(openModal);
//     }
//   }
// }

function handleCardClick(data) {
  popupWithImage.open(data);
}

function handleProfileEditSubmit(inputValues) {
  popupEditWithForm.renderLoading(true);
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  popupEditWithForm.close();
  popupEditWithForm.renderLoading(false);
}

function handleDeleteClick(card) {
  popupDeleteWithForm.open();
  popupDeleteWithForm.setConfirmAction(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.removeCard();
        popupDeleteWithForm.close();
      })
      .catch(console.error);
  });
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues["image-url"];
  popupAddWithForm.renderLoading(true);
  api.addNewCard({ name, link }).then((data) => {
    renderCard(data);
    popupAddWithForm.close();
    popupAddWithForm.resetForm();
    addFormValidator.disableButton();
    popupAddWithForm.renderLoading(false);
  });
}

//const aaa = document.getElementById("aaa");

function handleAvatarFormSubmit(data) {
  popupAvatarEditForm.renderLoading(true);
  const url = data.url;
  api
    .updateProfilePicture(url)
    .then(() => {
      userInfo.setAvatarImage({ avatar: url });
      popupAvatarEditForm.close();
      popupAvatarEditForm.resetForm();
      editAvatarValidator.disableButton();
    })
    .catch((error) => {
      console.error("Error updatin avatar", error);
    })
    .finally(() => {
      // Put rending loading false here
      popupAvatarEditForm.renderLoading(false);
    });
}

function handleDeleteCardSubmit() {
  api.deleteCard(() => {
    deleteCardButton.setEventListeners();
  });
}

const modalSubmitButton = document.querySelector(".modal__button");

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getView();
}

function handleLikeClick(card) {
  api.updateLikes(card.isLiked, card.id).then(() => {
    card.toggleLikeIcon();
    card.isLiked = !card.isLiked;
  });
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

const editAvatarValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);
editAvatarValidator.enableValidation();

const deleteCardValidator = new FormValidator(
  validationSettings,
  deleteCardForm
);
deleteCardValidator.enableValidation();

const popupDeleteWithForm = new PopupWithConfirmation("#delete-card-modal");
popupDeleteWithForm.setEventListeners();

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

const popupAvatarEditForm = new PopupWithForm(
  "#profile-avatar-modal",
  handleAvatarFormSubmit
);
popupAvatarEditForm.setEventListeners();

// const popupDeleteCardForm = new PopupWithForm(
//   "#delete-card-modal"
//   //handleDe
// );
// popupDeleteCardForm.setEventListeners();

const section = new Section({
  renderer: (item) => {
    // const card = createCard(item);

    // section.addItem(card);
    renderCard(item);
  },
  selector: ".cards__list",
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
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

editAvatarButton.addEventListener("click", () => {
  popupAvatarEditForm.open();
});

//deleteCardButton.addEventListener("click", () => {
//popupDeleteWithForm.open();
//});
// instantiate API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
    "Content-Type": "application/json",
  },
});

// api
//   .getInitialCards()
//   .then((data) => {
//     // data will be an array with 1 card in it
//   })
//   .catch((err) => {});

// api
//   .getUserInfo()
//   .then((data) => {
//     // data will be an array with 1 card in it
//   })
//   .catch((err) => {});

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cards, userData]) => {
    section.renderItems(cards);
  }
);

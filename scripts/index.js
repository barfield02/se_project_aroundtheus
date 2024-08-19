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

const cardTitleInput = addCardFormElement.querySelector("#profile-title-input");
const cardDescriptionInput = addCardFormElement.querySelector(
  "#profile-description-input"
);
const addCardForm = addCardModal.querySelector("#add-card-form");
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
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function openPopup(popup) {
  popup.classList.add("modal_opened");
}
//closePopup(profileEditModal)

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  // set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  modalImage.alt = cardData.link;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    openPopup(addImageCardModal);
    imageCaption.textContent = cardData.name;
  });
  // return the ready HTML element with the filled-in data
  return cardElement;
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
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// opening the edit-profile modal by clicking the profile edit button (the pencil icon)
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

// close the edit-profile modal by clicking the close button
editProfileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

//close the addCardModal by clicking the close button
addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

//close the addImageCardModal
addImageCardCloseButton.addEventListener("click", () => {
  closePopup(addImageCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// open modal
addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData));

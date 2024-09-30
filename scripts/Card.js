export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // set listener on image element
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick();
    });
    // call the handleImageClick arg in the listener
  }
  _handleDeleteCard() {
    this._cardElement.remove();
  }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _handleCardClick() {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    openPopup(addImageCardModal);
    imageCaption.textContent = this._name;
  }
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._cardImageElement.alt = this._name;
    this._cardImageElement.src = this._link;

    // set the src and alt of image
    // set the text content of the title

    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}

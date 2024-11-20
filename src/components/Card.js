export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.name = data.name;
    this.link = data.link;
    this._data = data;
    this.isLiked = data.isLiked;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }
  removeCard() {
    this._cardElement.remove();
  }
  toggleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this.name;
    this._cardImageElement.alt = this.name;
    this._cardImageElement.src = this.link;
    if (this.isLiked) {
      this._likeButton.classList.toggle("card__like-button_active");
    }

    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}

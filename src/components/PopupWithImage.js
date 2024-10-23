import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector(".modal__caption");
  }
  open(data) {
    this._modalImage.src = data.link;
    this._modalImage.alt = data.name;
    this._imageCaption.textContent = data.name;
    super.open();
  }
}

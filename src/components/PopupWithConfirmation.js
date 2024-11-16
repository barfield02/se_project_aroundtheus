import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(
      ".modal__delete-button"
    );
    this._handleSubmitCallback = null;
  }

  setConfirmAction(callback) {
    this._handleSubmitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleSubmitCallback();
    });
  }
}

import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(".delete-button");
    this._handleConfirmCallback = null;
  }

  setConfirmAction(callback) {
    this._handleSubtCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    // this._confirmButton.addEventListener("click", () => {
    //   this._handleConfirmCallback();
    // });
  }
}

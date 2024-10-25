import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._inputElements = this._popupElement.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  resetForm() {
    this._formElement.reset();
  }
}

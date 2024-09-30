export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._form = formElement;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
  }
  _showInputError(inputElements) {
    const errorMessageEl = this._form.querySelector(
      "#" + inputElements.id + "-error"
    );
    inputElements.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElements.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      "#" + inputElement.id + "-error"
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _toggleButtonState() {
    let foundInvalid = false;

    this._inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      this.disableButton();
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    // const { inputSelector } = options;
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];

    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

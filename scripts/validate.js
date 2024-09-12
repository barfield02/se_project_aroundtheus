function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(
    "#" + inputElement.id + "-error"
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(
    "#" + inputElement.id + "-error"
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  console.log(inputElement.validity.valid);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function toggleButtonState(inputElement, submitButton) {
  const foundInvalid = false;
  inputElement.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ]; // check inputSelector
  const submitButton = formElement.querySelector(".modal__button");

  console.log(999);
  console.log(inputElements); // check how many inputs there are in your form

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      console.log(123123);
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElement, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = document.querySelectorAll(".modal__form");
  console.log(formElements);
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error class to input
    // display error message
    // disable button
    // reset error messages
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);

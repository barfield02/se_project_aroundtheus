const formElements = document.querySelectorAll(".modal__form");

// const inputElements = document.querySelectorAll(".modal__input");
const inactiveButtonClass = document.querySelector(".modal__button_disabled");
const hasInvalidInput = (inputElements) => {
  return inputList.some((inputList) => {
    return !inputElements.validity.valid;
  });
};
//const inputList = [...document.querySelectorAll(".modal__input")];

function showInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElements.querySelector(
    "#" + inputElements.id + "-error"
  );
  console.log(inputElements.id);
  inputElements.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElements.validationMessage;
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
  console.log(inputElement.validity);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  let foundInvalid = false;

  inputElements.forEach((inputElements) => {
    if (!inputElements.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;

  // if (hasInvalidInput(inputElement)) {
  //  submitButton.classList.add(inactiveButtonClass);
  //  submitButton.disabled = true;
  // } else {
  //  submitButton.classList.remove(inactiveButtonClass);
  //  submitButton.disabled = false;
  // }
  //const foundInvalid = false;
  //inputElements.forEach((inputElement) => {
  //if (!inputElement.validity.valid) {
  // foundInvalid = true;
  //}
  //});
  //if (foundInvalid) {
  //submitButton.classList.add(inactiveButtonClass);
  // }
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ]; // check inputSelector
  const submitButton = formElement.querySelector(".modal__button");

  // console.log(inputElements); // check how many inputs there are in your form

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = document.querySelectorAll(".modal__form");
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

//function handleEscape(evt) {
// handle it, check evt.key
//}

//function closePopup(modal) {
// modal.classList.remove("modal_opened");
//}
//function openPopup(popup) {
// popup.classList.add("modal_opened");
// document.addEventListener("keydown", handleEscape);
//}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);

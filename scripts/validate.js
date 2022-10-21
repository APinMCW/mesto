// включение валидации вызовом enableValidation
// все настройки передаются при вызове

function showInputError(
  inputElement,
  errorMessage,
  spanSelector,
  inputErrorClass,
  errorClass
) {
  const errorElement = inputElement.parentNode.querySelector(spanSelector);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  inputElement,
  spanSelector,
  inputErrorClass,
  errorClass
) {
  const errorElement = inputElement.parentNode.querySelector(spanSelector);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function setSubmitButton(button, state, inactiveButtonClass) {
  if (state) {
    button.removeAttribute("disabled");
    button.classList.remove(inactiveButtonClass);
  } else {
    button.setAttribute("disabled", true);
    button.classList.add(inactiveButtonClass);
  }
}

const checkInputValidity = (
  formElement,
  inputElement,
  submitButtonSelector,
  selectors
) => {
  const submitButton = formElement.querySelector(submitButtonSelector);
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      selectors.spanSelector,
      selectors.inputErrorClass,
      selectors.errorClass
    );
    setSubmitButton(submitButton, false, selectors.inactiveButtonClass);
  } else {
    hideInputError(
      inputElement,
      selectors.spanSelector,
      selectors.inputErrorClass,
      selectors.errorClass
    );
    setSubmitButton(submitButton, true, selectors.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, inputSelector, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        selectors.submitButtonSelector,
        selectors
      );
    });
  });
};

function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors.inputSelector, selectors);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  spanSelector: ".popup__error",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

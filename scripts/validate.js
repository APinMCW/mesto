// включение валидации вызовом enableValidation
// все настройки передаются при вызове

function showInputError(inputElement, errorMessage, selectors) {
  const errorElement = inputElement.parentNode.querySelector(
    selectors.spanSelector
  );
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

function hideInputError(inputElement, selectors) {
  const errorElement = inputElement.parentNode.querySelector(
    selectors.spanSelector
  );
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
}

function setSubmitButton(inputList, button, selectors) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(button, selectors);
  } else {
    enableSubmitButton(button, selectors);
  }
}

function disableSubmitButton(button, selectors) {
  button.setAttribute("disabled", true);
  button.classList.add(selectors.inactiveButtonClass);
}

function enableSubmitButton(button, selectors) {
  button.removeAttribute("disabled");
  button.classList.remove(selectors.inactiveButtonClass);
}

const checkInputValidity = (inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(inputElement, selectors);
  }
};

const setEventListeners = (formElement, inputSelector, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      setSubmitButton(inputList, submitButton, selectors);
      checkInputValidity(inputElement, selectors);
    });
  });
  const submitButton = formElement.querySelector(
    selectors.submitButtonSelector
  );
  setSubmitButton(inputList, submitButton, selectors.inactiveButtonClass);
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

enableValidation(settings);

function hasInvalidInput(inputList) {
  return inputList.some((inputList) => {
    return !inputList.validity.valid;
  });
}

function clearInputError() {
  const inputList = Array.from(
    document.querySelectorAll(`.${settings.inputErrorClass}`)
  );

  inputList.forEach((input) => {
    hideInputError(input, settings);
  });
}

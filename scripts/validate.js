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

function setSubmitButton(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    button.setAttribute("disabled", true);
    button.classList.add(inactiveButtonClass);
  } else {
    button.removeAttribute("disabled");
    button.classList.remove(inactiveButtonClass);
  }
}

const checkInputValidity = (inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      selectors.spanSelector,
      selectors.inputErrorClass,
      selectors.errorClass
    );
  } else {
    hideInputError(
      inputElement,
      selectors.spanSelector,
      selectors.inputErrorClass,
      selectors.errorClass
    );
  }
};

const setEventListeners = (formElement, inputSelector, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      setSubmitButton(inputList, submitButton, selectors.inactiveButtonClass);
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

function hasInvalidInput(inputList) {
  return inputList.some((inputList) => {
    return !inputList.validity.valid;
  });
}

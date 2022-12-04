export class FormValidator {
  constructor(popup, settings) {
    this._form = popup.querySelector(".popup__form")
    this._inputSelector = settings.inputSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._buttonSubmit = form.querySelector(this._submitButtonSelector);
    this._spanSelector = settings.spanSelector;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._setSubmitButtonState();
        this._toggleInputErrorState(inputElement);
      });
    });

    this._setSubmitButtonState();
  }

  _setSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
  }

  disableSubmitButton() {
    this._buttonSubmit.setAttribute("disabled", true);
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  }

  _enableSubmitButton() {
    this._buttonSubmit.removeAttribute("disabled");
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
  }

  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = inputElement.parentNode.querySelector(
      this._spanSelector
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.parentNode.querySelector(
      this._spanSelector
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  clearInputError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

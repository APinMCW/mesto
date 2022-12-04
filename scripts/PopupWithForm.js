import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form")
  }

  _getInputValues() {
    //собирает данные всех полей формы.
    this._inputList = this._popup.querySelectorAll(".popup__input");

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._handleSubmit();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

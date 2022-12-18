import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._buttonSubmit = this._popup.querySelector(".popup__button");
  }

  submitHandler(a) {
    this._handleSubmit = a;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}

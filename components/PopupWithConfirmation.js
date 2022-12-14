import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleSubmit }) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
      }
    
      setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._handleSubmit();
        });
      }
}
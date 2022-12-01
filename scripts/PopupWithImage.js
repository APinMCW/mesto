import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, link, alt) {
    super(popupSelector);
    this._img = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(".popup__caption");
    this._link = link;
    this._alt = alt;
  }

  open() {
    //нужно вставлять в попап картинку
    // с src изображения и подписью к картинке.
    this._img.src = this._link;
    this._img.alt = this._alt;
    this._caption.textContent = this._alt;
  }
}

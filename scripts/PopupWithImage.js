import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  open(link, name) {
    //нужно вставлять в попап картинку
    // с src изображения и подписью к картинке.
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

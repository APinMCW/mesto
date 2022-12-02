export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._handleEscCloseRef = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscCloseRef);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscCloseRef);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener("click", this.close());
    this._popup.addEventListener("click", () => {
      if (evt.target === evt.currentTarget || evt.which == 1) {
        this.close();
      }
    });
  }
}

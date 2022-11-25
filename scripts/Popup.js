export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(".popup__close");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
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

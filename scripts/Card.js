
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getCard() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__list")
      .cloneNode(true);

    return card;
  }

  creatCard() {
    this._newCard = this._getCard();
    this._newCard.querySelector(".elements__title").textContent = this._name;
    this._newCard.querySelector(".elements__img").src = this._link;
    
    this._setListeners();
    
    return this._newCard;
  }

  _setListeners() {
    const buttonDelete = this._newCard.querySelector(".elements__trash");
    buttonDelete.addEventListener("click", () => this._handleDelete());

    const buttonLike = this._newCard.querySelector(".elements__like");
    buttonLike.addEventListener("click", () => this._handleLike());

    const imgClick = this._newCard.querySelector(".elements__img");
    imgClick.addEventListener("click", () => this._handleImg());
  }

  _handleDelete() {
    const currentElement = this._newCard.closest(".elements__list"); // получаем родителя кнопки
    currentElement.remove(); // удаляем карточку
  }

  _handleLike() {
    const buttonLike = this._newCard.querySelector(".elements__like");
    buttonLike.classList.toggle("elements__like_active"); // переключаем состояние лайка
    
}

  _handleImg() {
    const overlayPreview = document.querySelector(".popup_type_preview");
    const previewImg = overlayPreview.querySelector(".popup__img");
    const previewImgCaption = overlayPreview.querySelector(".popup__caption");
    previewImg.src = this._link;
    previewImg.alt = this._name;
    previewImgCaption.textContent = this._name;
    // записать необходимые данные
    openOverlay(overlayPreview);
    // открыть модалку
    
  }
}
function openOverlay(overlay) {
    overlay.classList.add("popup_opened");
  }
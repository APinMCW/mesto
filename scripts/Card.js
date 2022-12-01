export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._buttonLike = this._newCard.querySelector(".elements__like");
    this._img = this._newCard.querySelector(".elements__img");

    this._img.alt = this._name;
    this._img.src = this._link;

    this._setListeners();

    return this._newCard;
  }

  _setListeners() {
    const buttonDelete = this._newCard.querySelector(".elements__trash");
    buttonDelete.addEventListener("click", () => this._handleDelete());

    this._buttonLike.addEventListener("click", () => this._handleLike());

    this._img.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _handleDelete() {
    this._newCard.remove(); // удаляем карточку
  }

  _handleLike() {
    this._buttonLike.classList.toggle("elements__like_active"); // переключаем состояние лайка
  }
}

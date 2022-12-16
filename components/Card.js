export class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    selfId,
    handleDelete,
    handleLike,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._ownerId = data.owner._id;
    this._selfId = selfId;
    this._handleDelete = handleDelete;
    this._likesValue = data.likes;
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
    this._countLikes = this._newCard.querySelector(".elements__like-count");

    this._img.alt = this._name;
    this._img.src = this._link;
    this._countLikes.textContent = this._likesValue.length;

    this._setListeners();

    if (this._ownerId !== this._selfId) {
      buttonDelete.remove();
    }

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

  isLiked() {
    for (let i = 0; i < this._likesValue.length; i++) {
      if (this._likesValue.i._id === this._selfId) {
        return true;
      }
    }
  }

  setLike() {
    this._buttonLike.classList.add("elements__like_active"); 
  }

  disLike(){
    this._buttonLike.classList.remove("elements__like_active"); 
  }
}

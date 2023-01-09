export class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    selfId,
    handleDelete,
    handleLike,
  }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._ownerId = data.owner._id;
    this._selfId = selfId;
    this._id = data._id;
    this._handleDelete = handleDelete;
    this._likesValue = this._data.likes;
  }

  _getCard() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__list")
      .cloneNode(true);

    return card;
  }

  handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  setLikesInfo(data) {
    this._countLikes.textContent = data.likes.length;
    this._likesValue = data.likes;

    if (this.isLiked()) {
      this._setLike();
    } else {
      this._disLike();
    }
  }

  creatCard() {
    this._newCard = this._getCard();
    this._newCard.querySelector(".elements__title").textContent = this._name;

    this._buttonLike = this._newCard.querySelector(".elements__like");
    this._buttonDelete = this._newCard.querySelector(".elements__trash");
    this._img = this._newCard.querySelector(".elements__img");
    this._countLikes = this._newCard.querySelector(".elements__like-count");

    this._img.alt = this._name;
    this._img.src = this._link;

    this.setLikesInfo(this._data);

    this._setListeners();

    if (this._ownerId !== this._selfId) {
      this._buttonDelete.remove();
    }

    return this._newCard;
  }

  _setListeners() {
    this._buttonDelete.addEventListener("click", () =>
      this._handleDelete(this._id)
    );

    this._buttonLike.addEventListener("click", () =>
      this._handleLike(this._id)
    );

    this._img.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  isLiked() {
    for (let step = 0; step < this._likesValue.length; step++) {
      if (this._likesValue[step]._id === this._selfId) {
        return true;
      }
    }
  }

  _setLike() {
    this._buttonLike.classList.add("elements__like_active");
  }

  _disLike() {
    this._buttonLike.classList.remove("elements__like_active");
  }
}

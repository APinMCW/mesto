export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse() {
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    };
  }

  getUserInfo() {
    return fetch(`${this._url}${"users/me"}`, {
      headers: this._headers,
      method: "GET",
    }).then(this._chechResponse);
  }

  getCards() {
    return fetch(`${this._url}${"cards"}`, {
      headers: this._headers,
      method: "GET",
    }).then(this._chechResponse);
  }

  setUserInfo({ userInfo }) {
    return fetch(`${this._url}${"users/me"}`, {
      headers: this._headers,
      "Content-type": "application/json",
      method: "PATCH",
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.job,
      }),
    }).then(this._chechResponse);
  }

  setCard({ card }) {
    return fetch(`${this._url}${"cards"}`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._chechResponse);
  }

  delCard(cardId) {
    return fetch(`${this._url}${"cards"}/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._chechResponse);
  }

  setLikeCard(cardId) {
    return fetch(`${this._url}${"cards"}/${cardId}${"likes"}`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._chechResponse);
  }

  delLikeCard(cardId) {
    return fetch(`${this._url}${"cards"}/${cardId}${"likes"}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._chechResponse);
  }

  setAvatar(avatar) {
    return fetch(`${this._url}${"users/me/avatar"}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then(this._chechResponse);
  }
}

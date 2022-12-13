export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._url}${"users/me"}`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    });
  }

  getCards() {
    return fetch(`${this._url}${"cards"}`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    });
  }

  setUserInfo({ userInfo }) {
    return fetch(`${this._url}${"users/me"}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.job,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    });
  }

  setCard({ card }) {
    return fetch(`${this._url}${"cards"}`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    });
  }
}

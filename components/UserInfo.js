export class UserInfo {
  constructor({ userNameSelector, aboutMeSelector }) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileJob = document.querySelector(aboutMeSelector);
  }

  getUserInfo() {
    //возвращает объект с данными пользователя.
    //Этот метод пригодится когда данные пользователя нужно будет
    //подставить в форму при открытии.
    const userInfo = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}

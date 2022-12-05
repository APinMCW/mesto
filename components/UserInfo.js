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
      userName: this._profileName.textContent,
      userAbout: this._profileJob.textContent,
    };
    return userInfo;
  }

  setUserInfo(nameInput, jobInput) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._profileName.textContent = nameInput.value;
    this._profileJob.textContent = jobInput.value;
  }
}

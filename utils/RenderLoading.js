export class RenderLoading {
  constructor({ popup, textLoader }) {
    this._button = popup._form.querySelector(".popup__button");

    this._text = textLoader;

    this._textButton = this._button.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = this._text;
    } else {
      this._button.textContent = this._textButton;
    }
  }
}
// когда-нибудь реализовать через switch case
// if (isLoading) {
//     switch (this._submitButtonText) {
//       case "Сохранить":
//         this._submitButton.textContent = "Сохранение...";
//         break;
//       case "Создать":
//         this._submitButton.textContent = "Создание...";
//         break;
//       case "Да":
//         this._submitButton.textContent = "Удаление...";
//         break;
//     }
//   } else {
//     this._submitButton.textContent = this._submitButtonText;
//   }

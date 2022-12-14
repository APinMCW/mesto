import { initialCards, settings } from "../utils/const.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "../pages/index.css";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../utils/Api.js";
import { apiConfig } from "../utils/apiConfig.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const buttonEditProfile = document.querySelector(".profile__button");
const buttonAddCard = document.querySelector(".profile__plus");
const selfId = '99286262-2a3b-4573-b8ec-05fef5373f68';

// функции
function handleCardClick(name, link) {
  popupPreview.open(name, link);
}

function handleDeleteCard () {
  popupConfirmation.open()
}

function createCard(item) {
  const cardInstance = new Card(
    item,
    ".elements-item-template",
    handleCardClick,
    selfId,
    handleDeleteCard
  );
  const cardElement = cardInstance.creatCard();
  return cardElement;
}

// создаем экземпляры класов
const popupPreview = new PopupWithImage(".popup_type_preview");

const api = new Api(apiConfig);

const popupConfirmation = new PopupWithConfirmation({
  popupSelector: 'popup_type_confirmation',
  handleSubmit: (card) => {
    api.delCard(card._id)
    popupConfirmation.close();
  }
})

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements"
);

const popupAddCard = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleSubmit: (item) => {    
    cardList.addItem(createCard(item));
    popupAddCard.close();
  },
});

const addCardFormValidation = new FormValidator(popupAddCard, settings);

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  aboutMeSelector: ".profile__job",
});

const popupProfileEdit = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupProfileEdit.close();
  },
});

const profileEditFormValidation = new FormValidator(popupProfileEdit, settings);

// вызываем методы экземпляров
cardList.render(initialCards);
popupAddCard.setEventListeners();
addCardFormValidation.enableValidation();
popupProfileEdit.setEventListeners();
profileEditFormValidation.enableValidation();
popupPreview.setEventListeners();

// устанавливаем слушатели:
// попап: редактирование профиля
buttonEditProfile.addEventListener("click", () => {
  profileEditFormValidation.clearInputError();
  const userData = userInfo.getUserInfo();
  popupProfileEdit.setInputValues(userData);  
  popupProfileEdit.open();
});

// попап: добавление карточки
buttonAddCard.addEventListener("click", () => {
  addCardFormValidation.clearInputError();
  addCardFormValidation.disableSubmitButton();
  popupAddCard.open();
});

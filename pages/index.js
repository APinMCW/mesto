import { initialCards, settings } from "../components/const.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "../pages/index.css";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const popupProfile = document.querySelector(".popup_type_profile");
const buttonEditProfile = document.querySelector(".profile__button");
const nameInput = popupProfile.querySelector(".popup__input_data_name");
const jobInput = popupProfile.querySelector(".popup__input_data_job");
const buttonAddCard = document.querySelector(".profile__plus");
const popupPreview = new PopupWithImage(".popup_type_preview");

function handleCardClick(name, link) {
  popupPreview.open(name, link);
  popupPreview.setEventListeners();
}

// создаем экземпляры класов
const cardList = new Section(
  {
    renderer: (item) => {
      const cardInstance = new Card(
        item,
        ".elements-item-template",
        handleCardClick
      );
      const card = cardInstance.creatCard();
      cardList.addItem(card);
    },
  },
  ".elements"
);

const popupAddCard = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleSubmit: (data) => {
    const cardInstance = new Card(
      data,
      ".elements-item-template",
      handleCardClick
    );
    const card = cardInstance.creatCard();
    cardList.addItem(card);
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
  handleSubmit: () => {
    userInfo.setUserInfo(nameInput, jobInput);
    popupProfileEdit.close();
  },
});

const profileEditFormValidation = new FormValidator(popupProfileEdit, settings);

cardList.render(initialCards);
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();

// устанавливаем слушатели:
// попап: редактирование профиля
buttonEditProfile.addEventListener("click", () => {
  profileEditFormValidation.clearInputError();
  profileEditFormValidation.enableValidation();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userAbout;
  popupProfileEdit.open();
});

// попап: добавление карточки
buttonAddCard.addEventListener("click", () => {
  addCardFormValidation.clearInputError();
  addCardFormValidation.disableSubmitButton();
  addCardFormValidation.enableValidation();
  popupAddCard.open();
});

import { settings } from "../utils/const.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "../pages/index.css";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import { apiConfig } from "../utils/apiConfig.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { RenderLoading } from "../utils/renderLoading.js";

const buttonEditProfile = document.querySelector(".profile__button");
const buttonAddCard = document.querySelector(".profile__plus");
const buttonAvatar = document.querySelector(".profile__button_avatar");
let selfId;

// функции
function setId(id) {
  selfId = id;
}

function handleCardClick(name, link) {
  popupPreview.open(name, link);
}

function createCard(item) {
  const cardInstance = new Card({
    data: item,
    templateSelector: ".elements-item-template",
    handleCardClick: handleCardClick,
    selfId: selfId,
    handleDelete: (id) => {
      popupConfirmation.open();
      popupConfirmation.submitHandler(() => {
        api.delCard(id).then(() => {
          cardInstance.handleDeleteCard();
        });
        popupConfirmation.close();
      });
    },
    handleLike: () => {
      api
        .changeLikeCardStatus(cardInstance._id, !cardInstance.isLiked())
        .then((data) => {
          cardInstance.setLikesInfo({ ...data });
        })
        .catch((err) => console.log(`Ошибка изменения статуса лайка: ${err}`));
    },
  });
  const cardElement = cardInstance.creatCard();
  return cardElement;
}

// создаем экземпляры класов
const popupPreview = new PopupWithImage(".popup_type_preview");

const api = new Api(apiConfig);

const popupConfirmation = new PopupWithConfirmation({
  popupSelector: ".popup_type_confirmation",
});

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
    api
      .setCard(item)
      .then((newItemData) => {
        cardList.addItem(createCard(newItemData));
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
    popupAddCard.close();
  },
});

const popupSetAvatar = new PopupWithForm({
  popupSelector: ".popup_type_set-avatar",
  handleSubmit: (data) => {
    api
      .setAvatar(data.avatar)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
      })
      .catch((err) => console.log(`Ошибка при смене аватарки: ${err}`));
    popupSetAvatar.close();
  },
});

const setAvatarFormValidation = new FormValidator(popupSetAvatar, settings);

const addCardFormValidation = new FormValidator(popupAddCard, settings);

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  aboutMeSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const popupProfileEdit = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleSubmit: (data) => {
    loader.renderLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(`Ошибка при отправке данных профиля: ${err}`))
      .finally(() => loader.renderLoading(false));
    popupProfileEdit.close();
  },
});

const profileEditFormValidation = new FormValidator(popupProfileEdit, settings);

const loader = new RenderLoading({
  popup: popupProfileEdit,
  textLoader: "Сохранение...",
});

// вызываем методы экземпляров
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    setId(data._id);
  })
  .catch((err) => console.log(`Ошибка при запросе данных профиля: ${err}`));

api
  .getCards()
  .then((items) => {
    cardList.render(items);
  })
  .catch((err) => console.log(`Ошибка при запросе карточек: ${err}`));

popupAddCard.setEventListeners();
addCardFormValidation.enableValidation();

popupProfileEdit.setEventListeners();
profileEditFormValidation.enableValidation();

popupPreview.setEventListeners();

popupSetAvatar.setEventListeners();
setAvatarFormValidation.enableValidation();

popupConfirmation.setEventListeners();

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

buttonAvatar.addEventListener("click", () => {
  setAvatarFormValidation.clearInputError();
  setAvatarFormValidation.disableSubmitButton();
  popupSetAvatar.open();
});

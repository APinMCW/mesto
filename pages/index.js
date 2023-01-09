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

const buttonEditProfile = document.querySelector(
  ".profile__button_type_edit-data"
);
const buttonAddCard = document.querySelector(".profile__plus");
const buttonAvatar = document.querySelector(".profile__button_type_avatar");

function handleCardClick(name, link) {
  popupPreview.open(name, link);
}

function createCard(item) {
  const cardInstance = new Card({
    data: item,
    templateSelector: ".elements-item-template",
    handleCardClick: handleCardClick,
    selfId: userInfo._id,
    handleDelete: (id) => {
      popupConfirmation.open();
      popupConfirmation.submitHandler(() => {
        api
          .delCard(id)
          .then(() => {
            cardInstance.handleDeleteCard();
            popupConfirmation.close();
          })
          .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
      });
    },
    handleLike: (id) => {
      api
        .changeLikeCardStatus(id, !cardInstance.isLiked())
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
    loaderAddCard.renderLoading(true);
    api
      .setCard(item)
      .then((newItemData) => {
        cardList.addItem(createCard(newItemData));
        popupAddCard.close();
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`))
      .finally(() => loaderAddCard.renderLoading(false));
  },
});

const popupSetAvatar = new PopupWithForm({
  popupSelector: ".popup_type_set-avatar",
  handleSubmit: (data) => {
    loaderSetAvatar.renderLoading(true);
    api
      .setAvatar(data.avatar)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        popupSetAvatar.close();
      })
      .catch((err) => console.log(`Ошибка при смене аватарки: ${err}`))
      .finally(() => loaderSetAvatar.renderLoading(false));
  },
});

const setAvatarFormValidation = new FormValidator(
  popupSetAvatar._form,
  settings
);

const addCardFormValidation = new FormValidator(popupAddCard._form, settings);

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  aboutMeSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const popupProfileEdit = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleSubmit: (data) => {
    loaderProdileEdit.renderLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfileEdit.close();
      })
      .catch((err) => console.log(`Ошибка при отправке данных профиля: ${err}`))
      .finally(() => loaderProdileEdit.renderLoading(false));
  },
});

const profileEditFormValidation = new FormValidator(
  popupProfileEdit._form,
  settings
);

const loaderProdileEdit = new RenderLoading({
  popup: popupProfileEdit,
  textLoader: "Сохранение...",
});

const loaderAddCard = new RenderLoading({
  popup: popupAddCard,
  textLoader: "Создание...",
});

const loaderSetAvatar = new RenderLoading({
  popup: popupSetAvatar,
  textLoader: "Сохранение...",
});

// вызываем методы экземпляров
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.render(cards);
  })
  .catch((err) => console.log(err));

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

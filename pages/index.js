import { initialCards, settings } from "../utils/const.js";
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

const buttonEditProfile = document.querySelector(".profile__button");
const buttonAddCard = document.querySelector(".profile__plus");
const avatar = document.querySelector(".profile__avatar");
const selfId = "99286262-2a3b-4573-b8ec-05fef5373f68";

// функции
function handleCardClick(name, link) {
  popupPreview.open(name, link);
}

function handleDeleteCard() {
  popupConfirmation.open();
}

function createCard(item) {
  const cardInstance = new Card({
    data: item,
    templateSelector: ".elements-item-template",
    handleCardClick: handleCardClick,
    selfId: selfId,
    handleDelete: handleDeleteCard,
    handleLike: (card) => {
      if (card.isLiked()) {
        api
          .delLikeCard(card._id)
          .then(() => cardInstance.disLike())
          .catch((err) => console.log(`Ошибка при удалениия лайка: ${err}`));
      } else {
        api
          .delLikeCard(card._id)
          .then(() => cardInstance.setLike())
          .catch((err) => console.log(`Ошибка при установки лайка: ${err}`));
      }
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
  handleSubmit: (card) => {
    api.delCard(card._id);
    popupConfirmation.close();
  },
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
      .setCard({ item })
      .then((newItemData) => {
        cardList.addItem(createCard(newItemData));
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
    popupAddCard.close();
  },
});

const popupSetAvatar = new PopupWithForm({
  popupSelector: ".popup_type_set-avatar",
  handleSubmit: (item) => {
    avatar.src = item.link;
    popupSetAvatar.close();
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
api.getCards()
.then((items) =>{
  console.log(items)
  cardList.render(items);
})
.catch((err) => console.log(`Ошибка при запросе карточек: ${err}`));
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

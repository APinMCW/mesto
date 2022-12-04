import { initialCards, settings } from "../scripts/const.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import "../pages/index.css";
import { UserInfo } from "../scripts/UserInfo.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";

// const popupProfile = document.querySelector(".popup_type_profile");
const buttonEditProfile = document.querySelector(".profile__button");
// const popupEditForm = popupProfile.querySelector(".popup__form");
// const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");
// const nameInput = popupProfile.querySelector(".popup__input_data_name");
// const profileName = document.querySelector(".profile__name");
// const jobInput = popupProfile.querySelector(".popup__input_data_job");
// const profileJob = document.querySelector(".profile__job");
// переменные для попап добавления карточки
// const popupAddCard = document.querySelector(".popup_type_add-card");
const buttonAddCard = document.querySelector(".profile__plus");
// const popupAddCardForm = popupAddCard.querySelector(".popup__form");
// const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");
// const inputNameAddCard = popupAddCard.querySelector(".popup__input_data_name");
// const inputUrlAddCard = popupAddCard.querySelector(".popup__input_data_url");
// переменные для функции добавления карточки
// const elementsList = document.querySelector(".elements");
// const popupPreview = document.querySelector(".popup_type_preview");
// const previewImg = document.querySelector(".popup__img");
// const previewImgCaption = popupPreview.querySelector(".popup__caption");
// const previewImgCloseButton = popupPreview.querySelector(".popup__close");
// создание валидаторов
// const profileEditFormValidation = new FormValidator(popupEditForm, settings);
// const addCardFormValidation = new FormValidator(popupAddCardForm, settings);

//функции открытия оверлея

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEsc);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// }

// function closePopupProfile() {
//   closePopup(popupProfile);
//   popupEditForm.reset();
//   // закрыть попап и очистить инпуты
// }

// function submitEditFormPopupProfile(event) {
//   event.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   // записать в профиль значения из инпутов
//   closePopupProfile();
// }

// function closePopupAddCard() {
//   closePopup(popupAddCard);
//   popupAddCardForm.reset();
//   // очистить форму
// }

// function renderNewCard(data) {
//   const newCard = new Card(data, ".elements-item-template", handleCardImgClick);
//   const card = newCard.creatCard();
//   elementsList.prepend(card); // вставляем созданную карточку в список
// }

// function handleSaveCard(evt) {
//   evt.preventDefault();

//   renderNewCard({
//     name: inputNameAddCard.value,
//     link: inputUrlAddCard.value,
//   });

//   closePopupAddCard();
// }
// function handleCardImgClick(name, link) {
//   previewImg.src = link;
//   previewImg.alt = name;
//   previewImgCaption.textContent = name;
//   // записать необходимые данные
//   openPopup(popupPreview);
//   // открыть модалку
// }

//создаем первоначальные 6 карточек
// initialCards.forEach(renderNewCard);

// function closeByClick(evt) {
//   if (evt.target === evt.currentTarget || evt.which == 1) {
//     closePopup(evt.target);
//   }
// }

// function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const popup = document.querySelector(".popup_opened");
//     closePopup(popup);
//   }
// }

//устанавливаем слушатели
const popupPreview = new PopupWithImage(".popup_type_preview");

function handleCardClick(link, name) {
  popupPreview.open(link, name);
  popupPreview.setEventListeners();
}

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
cardList.render(initialCards);

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
popupAddCard.setEventListeners();
console.log(popupAddCard)

const addCardFormValidation = new FormValidator(popupAddCard, settings);

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  aboutMeSelector: ".profile__job",
});

const popupProfileEdit = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleSubmit: () => {
    userInfo.setUserInfo();
    popupProfileEdit.close();
  },
});
popupProfileEdit.setEventListeners();

const profileEditFormValidation = new FormValidator(popupProfileEdit, settings);

// попап: редактирование профиля
buttonEditProfile.addEventListener("click", () => {
  profileEditFormValidation.clearInputError();
  profileEditFormValidation.enableValidation();
  const userData = userInfo.getUserInfo();
  // popupEditForm.reset();
  // openPopup(popupProfile);
  nameInput.value = userData.userName;
  jobInput.value = userData.userAbout;
  popupProfileEdit.open();
  // открыть попап и записать в интпуты значения из профиля
});
// popupEditForm.addEventListener("submit", submitEditFormPopupProfile);
// buttonClosePopupProfile.addEventListener("click", closePopupProfile);

//запуск валидации формы

// попап: добавление карточки
buttonAddCard.addEventListener("click", () => {
  addCardFormValidation.clearInputError();
  addCardFormValidation.disableSubmitButton();
  addCardFormValidation.enableValidation();
  popupAddCard.open();
});
// popupAddCardForm.addEventListener("submit", handleSaveCard);
// popupAddCardCloseButton.addEventListener("click", closePopupAddCard);

//запуск валидации формы

// попап: превью
// previewImgCloseButton.addEventListener("click", () => {
//   closePopup(popupPreview); // слушатель на кнопку закрытия превью
// });

// const allPopups = Array.from(document.querySelectorAll(".popup"));

// allPopups.forEach((popup) => {
//   popup.addEventListener("click", closeByClick);
// });

const overlayPopupProfile = document.querySelector(".popup_type_profile");
const buttonEditProfile = document.querySelector(".profile__button");
const popupEditForm = overlayPopupProfile.querySelector(".popup__form");
const buttonClosePopupProfile =
  overlayPopupProfile.querySelector(".popup__close");
const nameInput = overlayPopupProfile.querySelector(".popup__input_data_name");
const profileName = document.querySelector(".profile__name");
const jobInput = overlayPopupProfile.querySelector(".popup__input_data_job");
const profileJob = document.querySelector(".profile__job");
// переменные для попап добавления карточки
const overlayPopupAddCard = document.querySelector(".popup_type_add-card");
const buttonAddCard = document.querySelector(".profile__plus");
const popupAddCardForm = overlayPopupAddCard.querySelector(".popup__form");
const popupAddCardCloseButton =
  overlayPopupAddCard.querySelector(".popup__close");
const inputNameAddCard = overlayPopupAddCard.querySelector(
  ".popup__input_data_name"
);
const inputUrlAddCard = overlayPopupAddCard.querySelector(
  ".popup__input_data_url"
);
const buttonSubmitFormAddCard = popupAddCardForm.querySelector(
  settings.submitButtonSelector
);
// переменные для функции добавления карточки
const elementsList = document.querySelector(".elements");
const cardTemplate = document
  .querySelector(".elements-item-template")
  .content.querySelector(".elements__list");
const overlayPreview = document.querySelector(".popup_type_preview");
const previewImg = document.querySelector(".popup__img");
const previewImgCaption = overlayPreview.querySelector(".popup__caption");
const previewImgCloseButton = overlayPreview.querySelector(".popup__close");

//функции открытия оверлея
function openOverlay(overlay) {
  overlay.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closeOverlay(overlay) {
  overlay.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function closePopupProfile() {
  closeOverlay(overlayPopupProfile);
  popupEditForm.reset();
  // закрыть попап и очистить инпуты
}

function submitEditFormPopupProfile(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  // записать в профиль значения из инпутов
  closePopupProfile();
}

function closePopupAddCard() {
  closeOverlay(overlayPopupAddCard);
  popupAddCardForm.reset();
  // очистить форму
}

// Добавление новой карточки
function creatNewCard(card) {
  const newHtmlElement = cardTemplate.cloneNode(true); // клонируем ноду
  const header = newHtmlElement.querySelector(".elements__title");
  const image = newHtmlElement.querySelector(".elements__img");

  header.textContent = card.name; // устанавливаем заголовок элемента
  image.alt = card.name; // устанавливаем атрибут alt для картинки
  image.src = card.link; // устанавливаем атрибут src для картинки

  setListenersForCard(newHtmlElement); // назначаем листенеры внутри каждого элемента
  return newHtmlElement;
}

function setListenersForCard(card) {
  const buttonDelete = card.querySelector(".elements__trash");
  buttonDelete.addEventListener("click", handleDelete); // передаем ссылку на функцию

  const buttonLike = card.querySelector(".elements__like");
  buttonLike.addEventListener("click", handleLike);

  const imgClick = card.querySelector(".elements__img");
  imgClick.addEventListener("click", () => handleCardImgClick(imgClick));
}

function renderNewCard(data) {
  const newCard = creatNewCard(data);
  elementsList.prepend(newCard); // вставляем созданную карточку в список
}

function handleSaveCard(evt) {
  evt.preventDefault();

  renderNewCard({
    name: inputNameAddCard.value,
    link: inputUrlAddCard.value,
  });

  closePopupAddCard();
}

function handleDelete(event) {
  const currentElement = event.target.closest(".elements__list"); // получаем родителя кнопки
  currentElement.remove(); // удаляем карточку
}

function handleLike(event) {
  const buttonLike = event.target;
  buttonLike.classList.toggle("elements__like_active"); // переключаем состояние лайка
}

function handleCardImgClick(imgClick) {
  previewImg.src = imgClick.src;
  previewImg.alt = imgClick.alt;
  previewImgCaption.textContent = imgClick.alt;
  // записать необходимые данные
  openOverlay(overlayPreview);
  // открыть модалку
}
//создаем первоначальные 6 карточек
initialCards.forEach(renderNewCard);

function closeByClick(evt) {
  const overlay = evt.target;
  if (evt.target === evt.currentTarget) {
    closeOverlay(overlay);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const overlay = document.querySelector(".popup_opened");
    closeOverlay(overlay);
  }
}

//устанавливаем слушатели
// попап: редактирование профиля
buttonEditProfile.addEventListener("click", () => {
  clearInputError();
  popupEditForm.reset();
  openOverlay(overlayPopupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // открыть попап и записать в интпуты значения из профиля
});

popupEditForm.addEventListener("submit", submitEditFormPopupProfile);

buttonClosePopupProfile.addEventListener("click", closePopupProfile);
// попап: добавление карточки
buttonAddCard.addEventListener("click", () => {
  clearInputError();
  popupAddCardForm.reset();
  disableSubmitButton(buttonSubmitFormAddCard, settings);
  openOverlay(overlayPopupAddCard);
});

popupAddCardForm.addEventListener("submit", handleSaveCard);

popupAddCardCloseButton.addEventListener("click", closePopupAddCard);
// попап: превью
previewImgCloseButton.addEventListener("click", () => {
  closeOverlay(overlayPreview); // слушатель на кнопку закрытия превью
});

const overlayAll = Array.from(document.querySelectorAll(".popup"));

overlayAll.forEach((overlay) => {
  overlay.addEventListener("mousedown", closeByClick);
});

const overlayPopupProfile = document.querySelector(".popup_type_profile");
const buttonEditProfile = document.querySelector(".profile__button");
const popupEditForm = overlayPopupProfile.querySelector(".popup__form");
const buttonClosePopupProfile =
  overlayPopupProfile.querySelector(".popup__close");
const nameInput = overlayPopupProfile.querySelector(".popup__input_data_name");
const profileName = document.querySelector(".profile__name");
const jobInput = overlayPopupProfile.querySelector(".popup__input_data_job");
const profileJob = document.querySelector(".profile__job");

function openOverlay(overlay) {
  overlay.classList.add("popup_opened");
}

function closeOverlay(overlay) {
  overlay.classList.remove("popup_opened");
}

buttonEditProfile.addEventListener("click", () => {
  openOverlay(overlayPopupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // открыть попап и записать в интпуты значения из профиля
});

buttonClosePopupProfile.addEventListener("click", closePopupProfile);

function closePopupProfile() {
  closeOverlay(overlayPopupProfile);
  popupEditForm.reset();
  // закрыть попап и очистить инпуты
  clearInputError();
}

function submitEditFormPopupProfile(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  // записать в профиль значения из инпутов
  closePopupProfile();
}

popupEditForm.addEventListener("submit", submitEditFormPopupProfile);
// сохранить данные из формы в профиль по клику сохранить и закрыть попап

// Попап для добавления карточки
const overlayPopupAddCard = document.querySelector(".popup_type_add-card");
const buttonAddCard = document.querySelector(".profile__plus");
const popupAddCardForm = overlayPopupAddCard.querySelector(".popup__form");
const popupAddCardCloseButton =
  overlayPopupAddCard.querySelector(".popup__close");
const addCardInputName = overlayPopupAddCard.querySelector(
  ".popup__input_data_name"
);
const addCardInputUrl = overlayPopupAddCard.querySelector(
  ".popup__input_data_url"
);

buttonAddCard.addEventListener("click", () => {
  openOverlay(overlayPopupAddCard);
  popupAddCardForm.addEventListener("submit", handleSaveCard);
});

popupAddCardCloseButton.addEventListener("click", closePopupAddCard);

function closePopupAddCard() {
  closeOverlay(overlayPopupAddCard);
  popupAddCardForm.reset();
  // очистить форму
  clearInputError();
}

// Добавление новой карточки

const elementsList = document.querySelector(".elements");
const cardTemplate = document
  .querySelector(".elements-item-template")
  .content.querySelector(".elements__list");
const overlayPreview = document.querySelector(".popup_type_preview");
const previewImg = document.querySelector(".popup__img");
const previewImgCaption = overlayPreview.querySelector(".popup__caption");
const previewImgCloseButton = overlayPreview.querySelector(".popup__close");

function creatNewCard(value) {
  const newHtmlElement = cardTemplate.cloneNode(true); // клонируем ноду
  const header = newHtmlElement.querySelector(".elements__title");
  const image = newHtmlElement.querySelector(".elements__img");

  header.textContent = value.name; // устанавливаем заголовок элемента
  image.alt = value.name; // устанавливаем атрибут alt для картинки
  image.src = value.link; // устанавливаем атрибут src для картинки

  setListenersForCard(newHtmlElement); // назначаем листенеры внутри каждого элемента
  return newHtmlElement;
}

function setListenersForCard(card) {
  const deleteButton = card.querySelector(".elements__trash");
  deleteButton.addEventListener("click", handleDelete); // передаем ссылку на функцию

  const likeButton = card.querySelector(".elements__like");
  likeButton.addEventListener("click", handleLike);

  const imgClick = card.querySelector(".elements__img");
  imgClick.addEventListener("click", handleCardImgClick);
}

function renderNewCard(data) {
  const newCard = creatNewCard(data);
  elementsList.prepend(newCard); // вставляем созданную карточку в список
}

function handleSaveCard(evt) {
  evt.preventDefault();

  renderNewCard({
    name: addCardInputName.value,
    link: addCardInputUrl.value,
  });

  closePopupAddCard();
  popupAddCardForm.removeEventListener("submit", handleSaveCard);
}

function handleDelete(event) {
  const currentElement = event.target.closest(".elements__list"); // получаем родителя кнопки
  currentElement.remove(); // удаляем карточку
}

function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("elements__like_active"); // переключаем состояние лайка
}

function handleCardImgClick(event) {
  const imgClick = event.target.closest(".elements__img");
  previewImg.src = imgClick.src;
  previewImg.alt = imgClick.alt;
  previewImgCaption.textContent = imgClick.alt;
  // записать необходимые данные
  openOverlay(overlayPreview);
  // открыть модалку
}

previewImgCloseButton.addEventListener("click", () => {
  closeOverlay(overlayPreview);
});
// слушатель на кнопку закрытия превью

initialCards.forEach(renderNewCard);

const overlayAll = Array.from(document.querySelectorAll(".popup"));
overlayAll.forEach((overlay) => {
  document.addEventListener("keydown", closeByEsc);
  overlay.addEventListener("mousedown", closeByClick);
});

function closeByClick(evt) {
  const overlay = evt.target;
  if (evt.target === evt.currentTarget) {
    closeOverlay(overlay);
    clearInputError();
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const overlay = document.querySelector(".popup_opened");
    closeOverlay(overlay);
    clearInputError();
  }
}

function clearInputError() {
 const inputList = Array.from(
    document.querySelectorAll(".popup__input_type_error")
  );
  console.log(inputList)
  inputList.forEach((input) => {
    hideInputError(
      input,
      ".popup__error",
      "popup__input_type_error",
      "popup__error_visible"
    );
  });
}

const overlayEl = document.querySelector(".overlay");
const openPopupButton = document.querySelector(".profile__button");
const closePopupButton = overlayEl.querySelector(".popup__close");
const saveButton = overlayEl.querySelector(".popup__save");
const popupProfile = document.querySelector(".popup");

function overlayClose() {
    overlayEl.classList.remove("overlay_opened");
}

function overlayOpen() {
    overlayEl.classList.add("overlay_opened");
}

openPopupButton.addEventListener("click", () => {
    overlayOpen();
    popupProfile.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // открыть попап и записать в интпуты значения из профиля
});

closePopupButton.addEventListener("click", () => {
    overlayClose();
    popupProfile.classList.remove("popup_opened");
    nameInput.value = "";
    jobInput.value = "";
    // закрыть попап и очистить инпуты
});

let nameInput = document.querySelector(".popup__input_data_name");
let profileName = document.querySelector(".profile__name");
let jobInput = document.querySelector(".popup__input_data_job");
let profileJob = document.querySelector(".profile__job");

function popupValue(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // записать в профиль значения из инпутов
    overlayClose();
    popupProfile.classList.remove("popup_opened");
    // закрыть попап
}

saveButton.addEventListener("click", popupValue);
// сохранить данные из формы в профиль по клику сохранить и закрыть попап

// Попап для добавления карточки
const openAddCardButton = document.querySelector(".profile__plus");
const closeAddCardButton = overlayEl.querySelector(".popup-add-card__close");
const saveAddCardButton = overlayEl.querySelector(".popup-add-card__save");
const popupAddCard = overlayEl.querySelector(".popup-add-card");

openAddCardButton.addEventListener("click", () => {
    overlayOpen();
    popupAddCard.classList.add("popup-add-card_opened");
});

closeAddCardButton.addEventListener("click", () => {
    overlayClose();
    popupAddCard.classList.remove("popup-add-card_opened");
    addCardInputName.value = "";
    addCardInputUrl.value = "";
    // закрыть попап и очистить инпуты
});

let addCardInputName = popupAddCard.querySelector(".popup-add-card__input_data_name");
let addCardInputUrl = popupAddCard.querySelector(".popup-add-card__input_data_url");
let InputCardName = popupAddCard.querySelector(".popup-add-card__input_data_name");
let InputCardUrl = popupAddCard.querySelector(".popup-add-card__input_data_url");

// Добавление новой карточки
const elements = document.querySelector(".elements");
const itemTemplate = document.querySelector(".elements-item-template");

function renderElement(InputCardName, InputCardUrl) {
    const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
    const header = newHtmlElement.querySelector(".elements__title");
    header.textContent = InputCardName; // устанавливаем заголовок элемента

    newHtmlElement.querySelector(".elements__img").setAttribute("alt", InputCardName); // устанавливаем атрибут alt для картинки
    newHtmlElement.querySelector(".elements__img").setAttribute("src", InputCardUrl); // устанавливаем атрибут src для картинки


    setListenersForItem(newHtmlElement); // назначаем листенеры внутри каждого элемента
    elements.append(newHtmlElement); // вставляем в DOM
}

function setListenersForElement(element) {
    const deleteButton = element.querySelector(".elements__trash");
    deleteButton.addEventListener("click", handleDelete); // TODO передаем ссылку на функцию

    const likeButton = element.querySelector(".elements__like");
    likeButton.addEventListener("click", handleLike);
}

function handleDelete(event) {
    const currentElement = event.target.closest(".elements__list"); // получаем родителя кнопки
    currentElement.remove();
}

function handleLike(event) {
    const likeButton = event.target.closest(".elements__like");
    likeButton.classList.toggle("elements__like_active");
}

const overlayEl = document.querySelector(".overlay");
const openPopupButton = document.querySelector(".profile__button");
const closePopupButton = overlayEl.querySelector(".popup__close");
const saveButton = overlayEl.querySelector(".popup__save");
const popupProfile = document.querySelector(".popup");

function overlayClose(overlay) {
    overlay.classList.remove("overlay_opened");
}

function overlayOpen (overlay) {
    overlay.classList.add('overlay_opened');
}

openPopupButton.addEventListener("click", () => {
    overlayOpen (overlayEl);
    openModalWindow(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // открыть попап и записать в интпуты значения из профиля
});

closePopupButton.addEventListener("click", () => {
    overlayClose(overlayEl);
    closeModalWindow(popupProfile);
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
    overlayClose(overlayEl);
    closeModalWindow(popupProfile);    
    // закрыть попап
}

saveButton.addEventListener("click", popupValue);
// сохранить данные из формы в профиль по клику сохранить и закрыть попап

// Попап для добавления карточки
const openAddCardButton = document.querySelector(".profile__plus");
const closeAddCardButton = overlayEl.querySelector(".popup-add-card__close");
const saveAddCardButton = overlayEl.querySelector(".popup-add-card__save");
const popupAddCard = overlayEl.querySelector(".popup-add-card");
const popupAddCardForm = overlayEl.querySelector(".popup-add-card__form");

openAddCardButton.addEventListener('click', () => {
    overlayOpen (overlayEl);
    openModalWindow(popupAddCard);
    popupAddCardForm.addEventListener('submit', handleSaveCard);
});

closeAddCardButton.addEventListener("click", closePopupAddCard);

function closePopupAddCard () {
    overlayClose(overlayEl);
    closeModalWindow(popupAddCard);
    addCardInputName.value = "";
    addCardInputUrl.value = "";
}

function openModalWindow (modalWindow) {
    modalWindow.classList.add('modal_opened');    
}

function closeModalWindow (modalWindow) {
    modalWindow.classList.remove("modal_opened");
}

const addCardInputName = popupAddCard.querySelector(".popup-add-card__input_data_name");
const addCardInputUrl = popupAddCard.querySelector(".popup-add-card__input_data_url");
// Добавление новой карточки

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const elements = document.querySelector(".elements");
const itemTemplate = document.querySelector(".elements-item-template").content.querySelector(".elements__list");
const overlayImg = document.querySelector(".overlay__img");
const popupImg = document.querySelector('.modal__img');
const popupImgCaption = overlayImg.querySelector('.modal__caption');
const popupImgCloseButton = overlayImg.querySelector('.popup__close');

function creatNewCard(value) {
    const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
    const header = newHtmlElement.querySelector(".elements__title");
    const image = newHtmlElement.querySelector(".elements__img");

    header.textContent = value.name; // устанавливаем заголовок элемента
    image.alt = value.name; // устанавливаем атрибут alt для картинки
    image.src = value.link; // устанавливаем атрибут src для картинки

    setListenersForElement(newHtmlElement); // назначаем листенеры внутри каждого элемента
    return newHtmlElement
}

function render(data) {
    const newCard = creatNewCard(data);
	elements.prepend(newCard);
}

function handleSaveCard(evt) {
    evt.preventDefault();

    render({
        name: addCardInputName.value,
        link: addCardInputUrl.value
    });

    closePopupAddCard ();
}

function setListenersForElement(element) {
    const deleteButton = element.querySelector(".elements__trash");
    deleteButton.addEventListener("click", handleDelete); // передаем ссылку на функцию

    const likeButton = element.querySelector(".elements__like");
    likeButton.addEventListener("click", handleLike);

    const imgClick = element.querySelector(".elements__img");
    imgClick.addEventListener('click', handleImg);
}

function handleDelete(event) {
    const currentElement = event.target.closest(".elements__list"); // получаем родителя кнопки
    currentElement.remove();
}

function handleLike(event) {
    const likeButton = event.target.closest(".elements__like");
    likeButton.classList.toggle("elements__like_active");
}

function handleImg(event) {
    const imgClick = event.target.closest(".elements__img");
    overlayImg.classList.add('overlay__img_opened');
    // overlayOpen (overlayImg); // пока что не работает, добавляет класс перед текущим, ищу решение
    openModalWindow(popupImg);
    popupImg.src = imgClick.src;
    popupImg.alt = imgClick.alt;
    popupImgCaption.textContent = imgClick.alt;
    popupImgCloseButton.addEventListener('click', () => {
        overlayImg.classList.remove('overlay__img_opened');
        closeModalWindow(popupImg);
    });
}



initialCards.forEach(render);
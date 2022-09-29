const overlayEl = document.querySelector(".overlay");
const openPopupButton = document.querySelector(".profile__button");
const closePopupButton = overlayEl.querySelector(".popup__close");
const saveButton = overlayEl.querySelector(".popup__save");
const popupProfile = document.querySelector(".popup");

function overlayClose() {
    overlayEl.classList.remove("overlay_opened");
}

function overlayOpen () {
    overlayEl.classList.add('overlay_opened');
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

openAddCardButton.addEventListener('click', () => {
    overlayOpen ();
    popupAddCard.classList.add('popup-add-card_opened');
    saveAddCardButton.addEventListener('click', handleSaveCard);
})

closeAddCardButton.addEventListener("click", () => {
    overlayClose();
    popupAddCard.classList.remove("popup-add-card_opened");
    addCardInputName.value = "";
    addCardInputUrl.value = "";
    // закрыть попап и очистить инпуты
});




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
const itemTemplate = document.querySelector(".elements-item-template").content;
const overlayImg = document.querySelector(".overlay-img");
const popupImg = document.querySelector('.popup-img');


function creatNewCard(value) {
    const newHtmlElement = itemTemplate.cloneNode(true); // клонируем ноду
    const header = newHtmlElement.querySelector(".elements__title");
    const image = newHtmlElement.querySelector(".elements__img");

    header.textContent = value.name; // устанавливаем заголовок элемента
    image.alt = value.name; // устанавливаем атрибут alt для картинки
    image.src = value.link; // устанавливаем атрибут src для картинки


    setListenersForElement(newHtmlElement); // назначаем листенеры внутри каждого элемента
    // elements.appendChild(newHtmlElement); // вставляем в DOM
    return newHtmlElement
}

const startCards = initialCards.map(creatNewCard);

function render() {
	elements.append(...startCards);
}


function handleSaveCard() {
    const inputName = addCardInputName.value;
    const inputLink = addCardInputUrl.value;
    const newCard = [{
        name: inputName,
        link: inputLink
    }];
    newCard.forEach(creatNewCard);
    elements.append(newCard);
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
    overlayImg.classList.add('overlay-img_opened');
    popupImg.classList.add('popup-img_opened');
    popupImg.src = 
    imgClick
}

render();
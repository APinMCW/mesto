const overlayEl = document.querySelector('.overlay');
const openPopupButton = document.querySelector('.profile__button');
const closePopupButton = overlayEl.querySelector('.popup__close');
const saveButton = overlayEl.querySelector('.popup__save');

openPopupButton.addEventListener('click', () => {
    overlayEl.classList.add('overlay_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // открыть попап и записать в интпуты значения из профиля
})

closePopupButton.addEventListener('click', () => {
    overlayEl.classList.remove('overlay_opened');
    nameInput.value = '';
    jobInput.value = '';
    // закрыть попап и очистить инпуты
})

let nameInput = document.querySelector('.popup__input_data_name');
let profileName = document.querySelector('.profile__name');
let jobInput = document.querySelector('.popup__input_data_job');
let profileJob = document.querySelector('.profile__job');

function popupValue (event) {
    event.preventDefault ();
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // записать в профиль значения из инпутов
    overlayEl.classList.remove('overlay_opened');
    // закрыть попап
}

saveButton.addEventListener('click', popupValue);
// сохранить данные из формы в профиль по клику сохранить и закрыть попап
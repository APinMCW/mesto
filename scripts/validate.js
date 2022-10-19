// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    const submitButton = evt.currentTarget.querySelector('.popup__button');
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      setSubmitButton(submitButton, false);
    } else {
      hideInputError(formElement, inputElement);
      setSubmitButton(submitButton, true);
    }
  };
  
function setSubmitButton (button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_disabled');
  }
}

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
      });
    });
  };
  
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });      
        setEventListeners(formElement);    
    });

    const overlayAll = Array.from(document.querySelectorAll('.popup'));
    overlayAll.forEach((overlay) => {
      console.log(overlay);
      document.addEventListener('keydown', escapeHandler);
      overlay.addEventListener('mousedown', escapeHandler);
    });
    
  };
  
    enableValidation();


    function escapeHandler(evt) {
      const overlayOpen = document.querySelector('.popup_opened');
      if (evt.key === 'Escape') {
        closeOverlay(overlayOpen);
      }
      if (evt.target === evt.currentTarget) {
        closeOverlay(overlayOpen);
      }
    }
    
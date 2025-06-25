// DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesContainer = document.querySelector('.places__list');

// Модальные окна
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Формы
const profileForm = document.querySelector('form[name="edit-profile"]');
const cardForm = document.querySelector('form[name="new-place"]');

// Поля форм
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

// Элементы модального окна с изображением
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Универсальные функции для работы с модальными окнами
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Находим элементы карточки
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  // Заполняем данными
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Обработчик лайка
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_is-active');
  });
  
  // Обработчик удаления
  deleteButton.addEventListener('click', function() {
    cardElement.closest('.card').remove();
  });
  
  // Обработчик открытия изображения
  cardImage.addEventListener('click', function() {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });
  
  return cardElement;
}

// Функция добавления карточки в контейнер
function addCard(cardData, container) {
  const cardElement = createCard(cardData);
  container.prepend(cardElement);
}

// Функция отображения начальных карточек
function renderInitialCards() {
  initialCards.forEach(function(cardData) {
    addCard(cardData, placesContainer);
  });
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  
  closeModal(profilePopup);
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  
  addCard(newCard, placesContainer);
  
  // Очищаем форму
  cardForm.reset();
  
  closeModal(cardPopup);
}

// Обработчик открытия формы редактирования профиля
function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

// Обработчик открытия формы добавления карточки
function openCardPopup() {
  cardForm.reset();
  openModal(cardPopup);
}

// Обработчики закрытия модальных окон по клику на крестик
function addCloseListeners() {
  const closeButtons = document.querySelectorAll('.popup__close');
  
  closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const popup = button.closest('.popup');
      closeModal(popup);
    });
  });
}

// Функция для добавления анимации ко всем попапам
function addPopupAnimations() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');
  });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем анимации ко всем попапам
  addPopupAnimations();
  
  // Отображаем начальные карточки
  renderInitialCards();
  
  // Устанавливаем обработчики событий
  profileEditButton.addEventListener('click', openProfilePopup);
  profileAddButton.addEventListener('click', openCardPopup);
  
  profileForm.addEventListener('submit', handleProfileFormSubmit);
  cardForm.addEventListener('submit', handleCardFormSubmit);
  
  // Добавляем обработчики закрытия
  addCloseListeners();
});

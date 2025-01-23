
let buttonClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let buttonBasket = document.querySelector('.basket');
let basketValueS = document.querySelector('.cart__num');
let basketValue = 0;
let buttonAddList = document.querySelectorAll('.button-add');
let popupContainer = document.querySelector('.popup-container');
let popupEmpty = document.querySelector('.popup-empty');
let popupSumPrice = document.querySelector('.popup-sum .popup-price');
let totalSum = 0;
const fioInput = document.getElementById('fio');
const phoneInput = document.getElementById('phone');
const orderButton = document.getElementById('btn-order');

function updatePopupState() {
  if (basketValue === 0) {
    popupEmpty.classList.remove('hidden');
    popupContainer.classList.add('hidden');
  } else {
    popupEmpty.classList.add('hidden');
    popupContainer.classList.remove('hidden');
  }
}


function saveToLocalStorage() {
  const items = Array.from(document.querySelectorAll('.popup-item')).map((item) => {
    return {
      title: item.querySelector('.popup-item-title').textContent,
      price: parseInt(item.querySelector('.popup-price').textContent),
      imgSrc: item.querySelector('.popup-item-img').src,
      quantity: parseInt(item.querySelector('.item-quantity').value),
    };
  });
  localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('totalSum', totalSum);
  localStorage.setItem('basketValue', basketValue);
}


function loadFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem('cartItems')) || [];
  totalSum = 0;
  basketValue = items.reduce((sum, item) => sum + item.quantity, 0);

  items.forEach((item) => {
    totalSum += item.price * item.quantity;
  });

  popupSumPrice.textContent = totalSum;
  basketValueS.textContent = basketValue;

  items.forEach((item) => {
    let popupItem = document.createElement('div');
    popupItem.classList.add('popup-item');
    popupItem.innerHTML = `
      <img src="${item.imgSrc}" width="70" height="70" class="popup-item-img">
      <div class="popup-row1">
        <span class="popup-item-title">${item.title}</span>
        <span class="popup-price">${item.price}</span>
        <span class="popup-rub">руб.</span>
      </div>
      <div class="popup-row2">
        <input type="number" step="1" min="1" max="99" value="${item.quantity}" class="item-quantity">
        <span class="remove-icon"><img class="button-delete" src="img/delete.svg"></span>
      </div>
    `;
    popupContainer.appendChild(popupItem);
  });

  updatePopupState();
}


buttonAddList.forEach((button) => {
  button.addEventListener('click', function () {
    button.classList.add('added');
    button.textContent = 'В корзине';
    let parentItem = button.closest('.cakes-list-item');
    let itemTitle = parentItem.querySelector('h4').textContent;
    let itemPriceText = parentItem.querySelector('.price').textContent;
    let itemPrice = parseInt(itemPriceText.replace(/\D/g, ''));
    let itemImgSrc = parentItem.querySelector('img').src;

    let items = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItem = items.find((item) => item.title === itemTitle);

    if (existingItem) {
      existingItem.quantity++;
      let popupItem = Array.from(popupContainer.children).find((popupItem) =>
        popupItem.querySelector('.popup-item-title').textContent === itemTitle
      );
      popupItem.querySelector('.item-quantity').value = existingItem.quantity;
    } else {
      items.push({ title: itemTitle, price: itemPrice, imgSrc: itemImgSrc, quantity: 1 });
      let popupItem = document.createElement('div');
      popupItem.classList.add('popup-item');
      popupItem.innerHTML = `
        <img src="${itemImgSrc}" width="60" height="60" class="popup-item-img">
        <div class="popup-row1">
          <span class="popup-item-title">${itemTitle}</span>
          <span class="popup-price">${itemPrice}</span>
          <span class="popup-rub">руб.</span>
        </div>
        <div class="popup-row2">
          <input type="number" step="1" min="1" max="99" value="1" class="item-quantity">
          <span class="remove-icon"><img class="button-delete" src="img/delete.svg"></span>
        </div>
      `;
      popupContainer.appendChild(popupItem);
    }

    basketValue++;
    basketValueS.textContent = basketValue;
    totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    popupSumPrice.textContent = totalSum;

    saveToLocalStorage();
    updatePopupState();
  });
});

popupContainer.addEventListener('click', function (e) {
  if (e.target.closest('.remove-icon')) {
    let popupItem = e.target.closest('.popup-item');
    let itemTitle = popupItem.querySelector('.popup-item-title').textContent;
    let itemPrice = parseInt(popupItem.querySelector('.popup-price').textContent);
    let quantity = parseInt(popupItem.querySelector('.item-quantity').value);

    basketValue -= quantity;
    basketValueS.textContent = basketValue;
    totalSum -= itemPrice * quantity;
    popupSumPrice.textContent = totalSum;

    let items = JSON.parse(localStorage.getItem('cartItems')) || [];
    items = items.filter((item) => item.title !== itemTitle);
    localStorage.setItem('cartItems', JSON.stringify(items));

    popupItem.remove();
    saveToLocalStorage();
    updatePopupState();
  }
});

window.onload = function () {
  loadFromLocalStorage();
};

buttonClose.onclick = function () {
  popup.classList.remove('open');
  popup.classList.add('hidden');
};

buttonBasket.onclick = function () {
  popup.classList.remove('hidden');
  popup.classList.add('open');
};
function validateForm() {
  const fioValue = fioInput.value.trim();
  const phoneValue = phoneInput.value.trim();

  if (fioValue && phoneValue) {
    orderButton.disabled = false;
  } else {
    orderButton.disabled = true;
  }
}


fioInput.addEventListener('input', validateForm);
phoneInput.addEventListener('input', validateForm);

const orderForm = document.getElementById('order-form');

[fioInput, phoneInput].forEach((input) => {
  input.addEventListener('input', () => {
    const isFormValid = fioInput.value.trim() !== '' && phoneInput.value.trim() !== '';
    orderButton.disabled = !isFormValid;
  });
});

orderForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const orderModal = document.getElementById('order-modal');
  orderModal.classList.add('active');

  fioInput.value = '';
  phoneInput.value = '';
  orderButton.disabled = true;

  localStorage.clear();
  popupContainer.innerHTML = '';
  basketValue = 0;
  basketValueS.textContent = basketValue;
  popupSumPrice.textContent = '0';
  updatePopupState();
});


const modalCloseButton = document.getElementById('modal-close');
modalCloseButton.addEventListener('click', () => {
  const orderModal = document.getElementById('order-modal');
  orderModal.classList.remove('active');
});
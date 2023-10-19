let showButtonList = document.querySelectorAll('.content__show-button');

let allCheckbox = document.querySelector('.content__checkbox-all');
let checkboxPay = document.querySelector('.content__checkbox-pay');
let orderButton = document.querySelector('.cost-form__button');

let penButtonAddress = document.querySelector('.cost-form__pen-icon_address');
let buttonChangeAddress = document.querySelector('.content__delivery-button_address');
let buttonChangePay = document.querySelector('.content__delivery-button_pay');
let buttonShowCard = document.querySelector('.cost-form__pen-icon_pay');
let penButtonPay = document.querySelector('.cost-form__pen-icon_pay');
let buttonCloseList = document.querySelectorAll('.popup__close');
const addressPopup = document.querySelector('.popup_type_address');
const cardPopup = document.querySelector('.popup_type_card');
let addressList = document.querySelector('.popup__list');
let addressCurierList = document.querySelector('.popup__list_curier');
let buttonChangePointList = document.querySelectorAll('.popup__button');
let addressResultPointText = document.querySelector('.cost-form__address');
let deliveryMethod = document.querySelector('.cost-form__delivery-method');
let deliveryMethodBelow = document.querySelector('.content__delivery-text-position_address');
let addressText = document.querySelector('.content__address-text_point');
let ratingText = document.querySelector('.content__rating_below');
let hoursText = document.querySelector('.content__opening-hours_below');
let cardsList = document.querySelector('.popup__cards-list');
let productsList = document.querySelector('.content__template-items');
let absentProductsList = document.querySelector('.content__template-items_absent');

let totalCost = document.querySelector('.cost-form__total-cost');
let totalOldCost = document.querySelector('.cost-form__old-price');
let totalDiscount = document.querySelector('.cost-form__total-disount');

totalCost.textContent = 0;

const buttonSubmit = document.querySelector('.popup__submit');
const buttonSubmitCard = document.querySelector('.popup__submit_card');

const templateAddress = document.querySelector('.popup__address-list').content;
const templateCurierAddress = document.querySelector('.popup__curier-list').content;
const templateCards = document.querySelector('.popup__card-list').content;
const templateProducts = document.querySelector('.content__item').content.querySelector('.content__template-block');
const templateAbsentProducts = document.querySelector('.content__item_absent').content.querySelector('.content__template-block_absent');
const buttonMinusList = templateProducts.cloneNode(true).querySelectorAll('.content__counter-button_minus');
const buttonPlusList = templateProducts.cloneNode(true).querySelector('.content__counter-button_plus');


// открытие/скрытие блоков с товарами
const hiddenItems = function(items) {
    items.classList.toggle('content__template_close');
}

const handleClickByShowButton = (e) => {
hiddenItems(e.target.parentNode.nextElementSibling);
e.target.classList.toggle('content__show-button_hidden');

}

Array.from(showButtonList).forEach(
    (element) => {
        element.addEventListener('click', handleClickByShowButton)
    }
);

document.querySelector('.content__show-button_main').addEventListener('click', () => {
  document.querySelector('.content__label-check_all').classList.toggle('content__label-check_none');

  document.querySelector('.content__absent-header_main').classList.toggle('content__absent-header_none');
})




// попапы

function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);

}

const closePopup = function(popup)  {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }

  const handleClickByCloseButton = (evt) => {
    closePopup(evt.target.closest('.popup'));
  };

  Array.from(buttonCloseList).forEach(
    (element) => {
      element.addEventListener('click', handleClickByCloseButton);
    }
  );


  //функция закрытия попапа по оверлей 
document.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') ) {
      evt.preventDefault();
      closePopup(evt.target.closest('.popup'))
    }
  });

  //функция закрытия попапа по кнопке Esc
const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }


  // слушатели событий
penButtonAddress.addEventListener("click", () => showPopup(addressPopup));
buttonChangeAddress.addEventListener('click', () => showPopup(addressPopup));
buttonShowCard.addEventListener('click', () => showPopup(cardPopup));
buttonChangePay.addEventListener('click', () => showPopup(cardPopup));

buttonSubmit.addEventListener('click', function(e) {
e.preventDefault();
closePopup(addressPopup); 
document.querySelector('.content__options').classList.remove('content__options_none');
if (document.querySelector('.popup__button_point').classList.contains('popup__button_focus')) {
  for (let radio of document.querySelectorAll('input[type=radio][name=address_point]'))
  if (radio.checked) {
    addressResultPointText.textContent =  radio.nextElementSibling.nextElementSibling.children[0].textContent;
    addressText.textContent = radio.nextElementSibling.nextElementSibling.children[0].textContent;
    deliveryMethod.textContent = "Доставка в пункт выдачи";
    deliveryMethodBelow.textContent = "Пункт выдачи";
    ratingText.textContent = radio.nextElementSibling.nextElementSibling.children[1].children[0].children[0].textContent;
    hoursText.textContent = radio.nextElementSibling.nextElementSibling.children[1].children[1].textContent;
  } 
}
else if (document.querySelector('.popup__button_courier').classList.contains('popup__button_focus')) {
  for (let radio of document.querySelectorAll('input[type=radio][name=address_curier]'))
  if (radio.checked) {
    addressResultPointText.textContent = radio.nextElementSibling.nextElementSibling.children[0].textContent;
    addressText.textContent = radio.nextElementSibling.nextElementSibling.children[0].textContent;
    deliveryMethod.textContent = "Доставка курьером";
    deliveryMethodBelow.textContent = "Курьер";
  }
}
});

buttonSubmitCard.addEventListener('click', function(e) {
  e.preventDefault();
  closePopup(cardPopup);
  for (let radio of document.querySelectorAll('input[type=radio][name=cards]'))
  if (radio.checked) {
  Array.from(document.querySelectorAll('.cost-form__card-img')).map((card) => {
card.src = radio.nextElementSibling.nextElementSibling.children[0].src;
  });
  Array.from(document.querySelectorAll('.cost-form__card-number')).map((card) => {
    card.textContent = radio.nextElementSibling.nextElementSibling.children[1].textContent;
      });
      document.querySelector('.cost-form__card').textContent = radio.nextElementSibling.nextElementSibling.children[2].textContent;
           
  }
})

// создание адреса пункта выдачи
function createPickpoint(address) {
    const position = templateAddress.cloneNode(true);
    let namePosition = position.querySelector('.popup__name-position');
    let rating = position.querySelector('.content__rating');
    let hours = position.querySelector('.content__opening-hours_popup');
namePosition.textContent = address.name;
rating.textContent = address.rating;
hours.textContent = address.hours;
position.querySelector('.popup__trash').addEventListener('click', () => {
  position.remove();
})
return position;

}


// создание адреса курьером
function createCurierAddress(address) {
  const position = templateCurierAddress.cloneNode(true);
  let namePosition = position.querySelector('.popup__name-position');
  namePosition.textContent = address.name;

  return position;
}

// рендер списка адресов курьером
function renderCurierAddress() {
  const positions = curierAddress.map((position) => {
    return createCurierAddress(position)
  })
  addressCurierList.append(...positions);
  addressCurierList.style.display = "none";
}


// рендер списка адресов пунктов выдачи
function renderAddress() {
const positions = pickpointAddress.map((position) => {
    return createPickpoint(position);
})
addressList.append(...positions);
addressList.style.display = "none";
}


// отображение списка адресов пунктов выдачи
function showAddress() {
  addressCurierList.style.display = "none";
  addressList.style.display = "flex";

}

// отображение списка адресов курьером
function showCurierAddress() {
  addressList.style.display = "none";
addressCurierList.style.display = "flex";
}

document.querySelector('.popup__button_point').addEventListener('click', () => {
  showAddress();
})
document.querySelector('.popup__button_courier').onclick = showCurierAddress;
renderCurierAddress();
renderAddress();

// создание карты оплаты
function createCard(cards) {
  const card = templateCards.cloneNode(true);
  let cardImg = card.querySelector('.popup__card-img');
  let cardNumber = card.querySelector('.popup__card-number');
  let cardDate = card.querySelector('.cost-form__card-date');
  cardImg.src = cards.src;
  cardNumber.textContent = cards.number;
  cardDate.textContent = cards.date;
  return card;
}

// рендер карты оплаты
function renderCards() {
  const cardList = cards.map((card) => {
    return createCard(card)
  })
  cardsList.append(...cardList);

}

renderCards();

// создание карточки отсутствующего товара
function createAbsentProduct(products) {
  const product = templateAbsentProducts.cloneNode(true);
  let productImg = product.querySelector('.content__item-img');
  let productName = product.querySelector('.content__item-header');
  let productColor = product.querySelector('.content__text-description');
  let productSize = product.querySelector('.content__text-description_size');
  productImg.src = products.img;
  productName.textContent = products.name;
  productColor.textContent = products.color;
  productSize.textContent = products.size;
  product
  .querySelector('.content__heart-button')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('content__heart-button_active');
  });
  product
  .querySelector('.content__trash-button')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    product.remove();
    document.querySelector('.content__absent-header').textContent = "Отсутствуют · " + Array.from(absentProductsList.querySelectorAll('.content__template-block_absent')).length + " товаров";
  });
   

return product;
}


//  создание карточки товара
function createProduct(products) {
  const product = templateProducts.cloneNode(true);
  let productImg = product.querySelector('.content__item-img');
  let productName = product.querySelector('.content__item-header');
  let productColor = product.querySelector('.content__text-description');
  let productSize = product.querySelector('.content__text-description_size');
  let productSizeMobile = product.querySelector('.content__img-size');
  let productPrice = product.querySelector('.content__price');
  let productOldPrice = product.querySelector('.content__old-price');
  let productStock = product.querySelector('.content__text-description_stock');
  let productShop = product.querySelector('.content__text-description_store');
  let productCount = product.querySelector('.content__counter-message');
  let productResultCount = product.querySelector('.content__counter-result');
  let productShopDateHeader = product.querySelector('.cost-form__text_weight');
  let productShopDateNumber = product.querySelector('.cost-form__text_number');
  let productShopDateAddress = product.querySelector('.cost-form__text_address');
  const checkbox = product.querySelector('.content__checkbox');
  checkbox.addEventListener('change', totalSum);
  productImg.src = products.img;
  productName.textContent = products.name;
  productColor.textContent = products.color;
  productSize.textContent = "Размер: " + products.size;
  if (!products.size) {
    product.querySelector('.content__img-size').style.display = "none";
    product.querySelector('.content__text-description_size').style.display = "none";  }
  productSizeMobile.textContent = products.size;
  productPrice.textContent = products.price;
  productOldPrice.textContent = products.oldPrice;
  productStock.textContent = products.stock;
  productShop.textContent = products.shop;
  productCount.textContent = products.count;
  productShopDateHeader.textContent = products.shopDate.name;
  productShopDateNumber.textContent = products.shopDate.ogrn;
  productShopDateAddress.textContent = products.shopDate.address;
  product.querySelector('.content__about-icon').addEventListener('mouseover', () => {
    product.querySelector('.cost-form__tooltip').style.display = "block";
  });
  product.querySelector('.content__about-icon').addEventListener('mouseout', () => {
    product.querySelector('.cost-form__tooltip').style.display = "none";
  })
  const buttonPlus = product.querySelector('.content__counter-button_plus');
  buttonPlus.addEventListener('click', () => {
    if (productResultCount.value < 1) {
      buttonMinus.disabled = true;
    } else if (productResultCount.value === products.available) {
buttonPlus.disabled = true;
    }
    
    else {
      buttonMinus.disabled = false;
      productResultCount.value = parseInt(productResultCount.value) + 1;
      productPrice.textContent = parseInt(products.price) * productResultCount.value ;
      productOldPrice.textContent = parseInt(products.oldPrice) * productResultCount.value ;

    }
    imagePosition();
    totalSum();
    totalOldSum();
    totalQuantity();
    
totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum());
  });
  const buttonMinus = product.querySelector('.content__counter-button_minus');
  buttonMinus.addEventListener('click', () => {
    if (productResultCount.value < 2) {
      buttonMinus.disabled = true;
    } else {
      buttonMinus.disabled = false;
      productResultCount.value = parseInt(productResultCount.value) -1;
      productPrice.textContent = parseInt(products.price) * productResultCount.value ;
      productOldPrice.textContent = parseInt(products.oldPrice) * productResultCount.value ;
    }
    imagePosition();
    totalSum();
    totalOldSum();
    totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum());
    totalQuantity();
  }
  );


  product
    .querySelector('.content__heart-button')
    .addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.target.classList.toggle('content__heart-button_active');
    });
    product
    .querySelector('.content__trash-button')
    .addEventListener('click', (evt) => {
      evt.preventDefault();
      product.remove();
      totalSum();
      totalOldSum();
      totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum());
      totalQuantity();
      updateCounterTrash();
     
    });
  return product;
};

// рендер карточек товара
function renderProducts() {
  const productList = products.map((product) => {
    return createProduct(product)
  })
  productsList.append(...productList);
 
}

// рендер отсутсвующих карточек товара
function renderAbsentProducts() {
  const productList = products.map((product) => {
    return createAbsentProduct(product)
  })
  
  absentProductsList.append(...productList);
}

renderAbsentProducts();
renderProducts();


// слушатели событий отображения списка адресов
document.querySelector('.popup__button_point').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.popup__button_point').classList.add('popup__button_focus');
  document.querySelector('.popup__button_courier').classList.remove('popup__button_focus');
});

document.querySelector('.popup__button_courier').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.popup__button_courier').classList.add('popup__button_focus');
  document.querySelector('.popup__button_point').classList.remove('popup__button_focus');
});

// вызов функция счетчика, изменения сумм, отсутствующих товаров
totalSum();
totalOldSum();
totalQuantity();
updateCounterTrash();
totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum());
document.querySelector('.content__absent-header').textContent = "Отсутствуют · " + Array.from(absentProductsList.querySelectorAll('.content__template-block_absent')).length + " товаров";
imagePosition();

// функция подсчета общей суммы с учетом отмеченных чекбоксов
function totalSum() {
  let total = 0;
  const prices = productsList.querySelectorAll('.content__price');
  const checkboxes = Array.from(productsList.querySelectorAll('.content__checkbox'));
  checkboxes.forEach(box => {
box.addEventListener('change', () => {
  totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum());
  totalQuantity();
  imagePosition();
})});
  prices.forEach((price, index) => {
    if (checkboxes[index].checked) {
      total += parseInt(price.textContent);
    }
    
  });

  allCheckbox.checked = checkboxes.every(checkbox => checkbox.checked);
  updateSum();
 return totalCost.textContent = total;
}

// функция подсчета общей старой суммы (без учета скидки) с учетом отмеченных чекбоксов
function totalOldSum() {
  totalOldCost.textContent = 0;
  let total = 0;
  const prices = productsList.querySelectorAll('.content__old-price_num');
  const checkboxes = Array.from(productsList.querySelectorAll('.content__checkbox'));
  checkboxes.forEach(box => {
    box.addEventListener('change', () => {
      totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum())
    })})
  prices.forEach((price, index) => {
    if (checkboxes[index].checked) {
      total += parseInt(price.textContent);
    }
  });
  return totalOldCost.textContent = total;
};

// функция подсчета кол-ва выбранных товаров
function totalQuantity() {
  const counters = productsList.querySelectorAll('.content__counter-result');
  const checkboxes = productsList.querySelectorAll('.content__checkbox');
  let totalQuantity = 0;

  counters.forEach((quantity, index) => {
    if (checkboxes[index].checked) {
      totalQuantity += parseInt(quantity.value);
   
    }
  })
  document.querySelector('.cost-form__text-position_order').textContent = totalQuantity + " товаров";
  document.querySelector('.content__absent-header_main').textContent = document.querySelector('.cost-form__text-position_order').textContent + " · " + totalCost.textContent + " сом";
}



// логика отметки чекбоксов
allCheckbox.addEventListener('change', function(e) {
  const allCheck = productsList.querySelectorAll('.content__checkbox');
  allCheck.forEach(el => {
    el.checked = e.target.checked;
    el.checked = allCheckbox.checked;
  } );
  imagePosition();
  totalSum();
  totalOldSum();
 totalQuantity();
  totalDiscount.textContent = parseInt(totalSum())  - parseInt(totalOldSum());
  updateSum();
});

function imagePosition() {
  const checkboxes = Array.from(productsList.querySelectorAll('.content__checkbox'));
  const counters = Array.from(productsList.querySelectorAll('.content__counter-result'));
  const cardImages = Array.from(productsList.querySelectorAll('.content__item-img'));
  const deliveryItemsContainer = document.querySelector('.content__delivery-items');
  const deliveryItemsContainerLater = document.querySelector('.content__delivery-items_later');
  
  // Очищаем содержимое контейнера перед добавлением новых элементов
  deliveryItemsContainer.innerHTML = '';
  deliveryItemsContainerLater.innerHTML = '';
  const selectedPositions = [];
  
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const positionInfo = {
        imgSrc: cardImages[index].src,
        quantity: counters[index].value
      };
      selectedPositions.push(positionInfo);


 // Создаем новый элемент для каждой позиции и добавляем его в контейнер
 const positionElement = document.createElement('li');
 positionElement.classList.add('content__delivery-item');
 const image = document.createElement('img');
 image.classList.add('content__delivery-img');
 const count = document.createElement('div');
 count.classList.add('content__img-icon');
 image.src = positionInfo.imgSrc;
 count.textContent = positionInfo.quantity;
 positionElement.appendChild(image);
 positionElement.appendChild(count);
 document.querySelector('.content__delivery-dates').classList.remove('none');
 deliveryItemsContainer.appendChild(positionElement);
   
         
  
      if (index === 1 && counters[index].value < 184) {
// Создаем новый элемент для каждой позиции и добавляем его в контейнер
const positionElement = document.createElement('li');
positionElement.classList.add('content__delivery-item');
const image = document.createElement('img');
image.classList.add('content__delivery-img');
const count = document.createElement('div');
count.classList.add('content__img-icon');
image.src = positionInfo.imgSrc;
count.textContent = positionInfo.quantity;
positionElement.appendChild(image);
positionElement.appendChild(count);
document.querySelector('.content__delivery-dates').classList.remove('none');
deliveryItemsContainer.appendChild(positionElement);
      }
      

      if (index === 1 && counters[index].value > 184) {
        const positionElement = document.createElement('li');
        positionElement.classList.add('content__delivery-item');
        const image = document.createElement('img');
        image.classList.add('content__delivery-img');
        const count = document.createElement('div');
      count.classList.add('content__img-icon');
      image.src = positionInfo.imgSrc;
      count.textContent = positionInfo.quantity - 184;
        positionElement.appendChild(image);
        positionElement.appendChild(count);
        document.querySelector('.content__delivery-text-position_later').classList.remove('none');
deliveryItemsContainerLater.appendChild(positionElement);
      }
    }
  });
}





// функция отображения кол-ва товара на иконке корзины
function updateCounterTrash() {
  const countOrder = Array.from(productsList.querySelectorAll('.content__template-block'));
  document.querySelector('.header__button-counter').textContent = countOrder.length;
  document.querySelector('.menu__button-counter').textContent = countOrder.length;
if (countOrder.length === 0) {
  document.querySelector('.header__button-counter').classList.add('header__button-counter_none'); 
  document.querySelector('.menu__button-counter').classList.add('header__button-counter_none'); 
}
}

// функция переключения кнопки формы в зависимости от чекбокса
function updateSum() {
  if (checkboxPay.checked) {
    orderButton.textContent = "Оплатить " + totalCost.textContent + " сом";
      checkboxPay.parentElement.nextElementSibling.classList.add('cost-form__checkbox-text_none');
  }
else {
  checkboxPay.parentElement.nextElementSibling.classList.remove('cost-form__checkbox-text_none');
  orderButton.textContent = "Заказать";
}}

checkboxPay.addEventListener('click', updateSum);

// функция отображения тултипов у блока с товарами
Array.from(productsList.querySelectorAll('.content__template-block')).forEach(product => {
  product.style.position = "relative";
  product.querySelector('.cost-form__tooltip_template').style.position = "absolute";
  product.querySelector('.cost-form__tooltip_template').style.zIndex = "20";
  product.querySelector('.cost-form__tooltip_template').style.top = "105%";
  product.querySelector('.cost-form__tooltip_template').style.left = "16.5%";
})


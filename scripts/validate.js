
    const submitButton = document.querySelector('.cost-form__button');

    function scrollToErrorField(inputId) {
      const errorField = document.getElementById(inputId);
      errorField.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Функция валидации для имени
    function validateName() {
      const nameInput = document.querySelector('.content__input_name');
      const nameError = document.querySelector('.content__recipient-error_name');
      const namePattern = /^[A-Za-z\s]+$/;
      
      if (nameInput.value.trim() === '' || !namePattern.test(nameInput.value)) {
        nameError.textContent = 'Укажите имя';
        nameInput.classList.add('content__input_error');
        scrollToErrorField('name');
        return false;
      } else {
        nameError.textContent = '';
        return true;
      }
    }
  
    // Функция валидации для фамилии
    function validateSurname() {
      const surnameInput = document.querySelector('.content__input_surname');
      const surnameError = document.querySelector('.content__recipient-error_surname');
      const surnamePattern = /^[A-Za-z\s]+$/;
      if (surnameInput.value.trim() === '' || !surnamePattern.test(surnameInput.value)) {
        surnameError.textContent = 'Введите фамилию';
        surnameInput.classList.add('content__input_error');
        scrollToErrorField('surname');
        return false;
      } else {
        surnameError.textContent = '';
        return true;
      }
    }
  
    // Функция валидации для электронной почты
    function validateEmail() {
      const emailInput = document.querySelector('.content__input_email');
      const emailError = document.querySelector('.content__recipient-error_email');
      
      // проверка на корректность email-адреса
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Укажите электронную почту';
        scrollToErrorField('email');
        return false;
      } else if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Проверьте адрес электронной почты';
        emailInput.classList.add('content__input_error');
        scrollToErrorField(emailInput);
        return false;
      } else {
        emailError.textContent = '';
        return true;
      }
    }
  
    // Функция валидации для телефона
    function validatePhone() {
      const phoneInput = document.querySelector('.content__input_phone');
      const phoneError = document.querySelector('.content__recipient-error_phone');
      
      // проверка на формат номера телефона
      const phonePattern = /^\+\d{1,3} \d{1,3} \d{1,3} \d{1,2} \d{1,2}$/;
      
      if (phoneInput.value.trim() === '') {
        phoneError.textContent = 'Укажите номер телефона';
        scrollToErrorField('phone');
        return false;
      } else if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = 'Формат: +9 999 999 99 99';
        phoneInput.classList.add('content__input_error');
        scrollToErrorField('phone');
        return false;
      } else {
        phoneError.textContent = '';
        return true;
      }
    }
  
    // Функция валидации для ИНН
    function validateInn() {
      const innInput = document.querySelector('.content__input_number');
      const innError = document.querySelector('.content__recipient-span');
      
      // проверка на количество цифр
      const innPattern = /^\d{14}$/;
      
      if (innInput.value.trim() === '') {
        innError.textContent = 'Укажите ИНН';
        innError.classList.add('content__input_error');
        scrollToErrorField('number');
        return false;
      } else if (!innPattern.test(innInput.value)) {
        innError.textContent = 'Проверьте ИНН';
        innError.classList.add('content__input_error');
        innInput.classList.add('content__input_error');
        scrollToErrorField('number');
        return false;
      } else {
        innError.textContent = '';
        return true;
      }
    }
  
    // Функция для обработки отправки формы
    function handleSubmit(event) {
      event.preventDefault();
      const errorFields = [];
      const isValidName = validateName();
      if (!isValidName) {
        errorFields.push('name');
      }
      const isValidSurname = validateSurname();
      if (!isValidName) {
        errorFields.push('surname');
      }
      const isValidEmail = validateEmail();
      if (!isValidName) {
        errorFields.push('email');
      }
      const isValidPhone = validatePhone();
      if (!isValidName) {
        errorFields.push('phone');
      }
      const isValidInn = validateInn();
      if (!isValidName) {
        errorFields.push('number');
      }
 
      // Если хотя бы одно поле не прошло валидацию, предотвращаем отправку формы
      if (!isValidName || !isValidSurname || !isValidEmail || !isValidPhone || !isValidInn) {
        if (errorFields.length > 0) {
          scrollToErrorField(errorFields[0]);
        }
        event.preventDefault();
      }
    }
  
    // Назначаем обработчик события отправки формы
    submitButton.addEventListener('click', handleSubmit);
  
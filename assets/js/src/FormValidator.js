export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._errorClass = config.errorClass
        this._formElement = formElement
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // Показать ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.name}`);
        inputElement.classList.add(this._inputErrorClass)
        errorElement.classList.add(this._errorClass)
        errorElement.textContent = errorMessage
    }

    // Спрятать ошибку
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.name}`);
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

    // сделать ресет ошибок и кнопки submit
    resetValidation() {
        this._toggleButtonState()
        this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            }
        )
    };

    //Проверка Валилдности полей INPUT
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else
            this._hideInputError(inputElement)
    }

    //Проверка одного поля на валидность
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    //Блокировка кнопки SUBMIT
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton()
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.disabled = false
        }
    }

    _disableButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
    };

    // Слушатели событий
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}
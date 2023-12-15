import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackFormSubmit, buttonSelector, isCounterSet) {
        super(popupSelector, buttonSelector);
        this._callbackFormSubmit = callbackFormSubmit; //callback сабмита формы
        this._popupForm = this._popup.querySelector('.popup__form'); // форма модального окна
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input-text')); // инпуты модального окна
        this._submitButton = this._popupForm.querySelector('.popup__submit-btn') // кнопка сабмита формы
        this._isCounterSet = isCounterSet;
        this._setEventListeners();
    }
    // Добавить точки сохранения
    addSavingDots(text = 'Сохранение...') {
        this._submitButton.textContent = text
        this._submitButton.disabled = true
    }
    // убрать точки сохранения
    removeSavingDots(text = 'Сохранить') {
        this._submitButton.textContent = text;
        this._submitButton.disabled = false
    }

    // приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(inputItem => {
            inputValues[inputItem.name] = inputItem.value;
        });
        return inputValues;
    };
    _setCounterValues() {
        let counterArray = this._popupForm.querySelectorAll('.js-counter-res')
        counterArray.forEach(counterItem => {
            this._popupForm.querySelector(`input[name="${counterItem.dataset.forInput}"]`).value = counterItem.textContent;
        });
    };
    _resetCounters(){
        let counterArray = this._popupForm.querySelectorAll('.js-counter-res')
        counterArray.forEach(counterItem => {
            counterItem.textContent = '0';
        });
    }

    // Перезаписывает родительский метод close
    close() {
        this._popupForm.reset();
        if(this._isCounterSet){
            this._resetCounters()
        }
        super.close();
    };

    // Перезаписывает родительский метод setEventListeners
    _setEventListeners() {
        super._setEventListeners(); // setEventListeners наследует от Popup
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if(this._isCounterSet){
                this._setCounterValues()
            }
            this._callbackFormSubmit(this._getInputValues());
        });
    };
}
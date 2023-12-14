export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector); //Принимает в конструктор единственный параметр — селектор попапа.
    }

    // публичный метод открыть popup
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    };

    // публичный метод закрыть popup
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    // приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    // публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
                this.close();
            }
        });
    }
};
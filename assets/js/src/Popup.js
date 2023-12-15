export class Popup {
    constructor(popupSelector, buttonSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonTrigger = document.querySelectorAll(buttonSelector);
        this._body = document.querySelector('body');
        this._documentWidth = parseInt(document.documentElement.clientWidth);
        this._windowWidth = parseInt(window.innerWidth);
        this._scrollbarWidth = this._windowWidth - this._documentWidth;
    }

    // публичный метод открыть popup
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
        this._body.classList.add('overflow-hidden')
        this._appendOverlayModal()
    };

    _appendOverlayModal() {
        this._body.style.cssText = `margin-right: ${this._scrollbarWidth}px; overflow: hidden;}`;
    }

    _removeOverlayModal() {
        this._body.removeAttribute('style');
    }

    // публичный метод закрыть popup
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._body.classList.remove('overflow-hidden')
        this._removeOverlayModal()
    };

    // приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    // метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    _setEventListeners() {
        this._buttonTrigger.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.open()
            })
        })
        this._popup.addEventListener('mousedown', (evt) => {
            // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
                this.close();
            }
        });
    }
};
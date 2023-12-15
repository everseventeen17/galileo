export class Counter {
    constructor(counterSelector, counterResult) {
        this._counterWrapper = document.querySelectorAll(counterSelector);
        this._counterResultClass = counterResult;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._counterWrapper.forEach((counter) => {
            counter.addEventListener('click', (e) => {
                e.preventDefault();
                let counterResult = counter.querySelector(this._counterResultClass)
                if (e.target.classList.contains('js-plus')) {
                    counterResult.textContent++
                } else if (e.target.classList.contains('js-minus') && parseInt(counterResult.textContent) > 0) {
                    counterResult.textContent--
                }
            })
        })
    }
}
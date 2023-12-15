export class Calendar {
    constructor(conf) {
        this._calendar = document.querySelector(conf.calendarWrapper);
        this._language = conf.language;
        this._startByCurrentMonth = conf.startByCurrentMonth;
        this._onlyThisYear = conf.onlyThisYear;
        this._disabledDays = conf.notActiveDays
        this._callBackFunction = conf.callBackFunction;
        if (this._language === 'en') {
            this._calendarDataDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this._calendarDataMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        } else if (this._language === 'ru') {
            this._calendarDataDaysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            this._calendarDataMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        }
        this._monthArray = this._generateCalendarArray();
        this._currentMonthIndex = this._getCurrentMonthIndex()
        this._addCalendarInner()
        this._addButtons()
        this._generateCalendar(this._currentMonthIndex)
        this._setEventListeners();
    }

    _concatDate(date, month, year) {
        month < 10 ? month = "0" + month : month;
        date < 10 ? date = "0" + date : date;
        return date + "." + month + "." + year;
    }

    _isCurrentDay(date, month, year) {
        let curDate = this._getCurrentDate();
        return (date === curDate[0] && month === curDate[1] + 1 && year === curDate[2]);
    }

    _generateCalendarArray() {
        const calendars = [];
        let startYear = this._startByCurrentMonth ? this._getCurrentDate()[2] : this._getCurrentDate()[2] - 20;
        let maxYear = this._onlyThisYear ? this._getCurrentDate()[2] : this._getCurrentDate()[2] + 20
        for (let year = startYear; year <= maxYear; year++) {
            let startMonth = this._startByCurrentMonth && year === this._getCurrentDate()[2] ? this._getCurrentDate()[1] : 0;
            for (let month = startMonth; month < 12; month++) {
                const monthDays = [];
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                let previousMonthDays = new Date(year, month, 0).getDate();
                for (let i = firstDay - 1; i > 0; i--) {
                    monthDays.unshift({
                        "dayCalendarNumber": previousMonthDays,
                        "dayOfWeekNumber": i,
                        "dayOfWeek": this._calendarDataDaysOfWeek[i],
                        "year": year,
                        "monthNumber": month,
                        "monthName": this._calendarDataMonths[month - 1],
                        "dateConcat": this._concatDate(previousMonthDays, month, year),
                        "isCurrentDay": this._isCurrentDay(previousMonthDays, month, year),
                        "prevMonth": true,
                        "curMonth": false,
                        "disabled": this._disabledDays['prev'],
                    });
                    previousMonthDays--;
                }

                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    const dayOfWeek = date.getDay();
                    monthDays.push({
                        "dayCalendarNumber": day,
                        "dayOfWeekNumber": dayOfWeek,
                        "dayOfWeek": this._calendarDataDaysOfWeek[dayOfWeek],
                        "year": year,
                        "monthNumber": month + 1,
                        "monthName": this._calendarDataMonths[month],
                        "dateConcat": this._concatDate(day, month + 1, year),
                        "isCurrentDay": this._isCurrentDay(day, month + 1, year),
                        "prevMonth": false,
                        "nextMonth": false,
                        "curMonth": true,
                        "disabled": this._isAllUpToCurrentDaysDisabled(day,month + 1, year),
                    });
                }
                const daysInNextMonthRemaining = 42 - monthDays.length;
                for (let day = 1; day <= daysInNextMonthRemaining; day++) {
                    monthDays.push({
                        "dayCalendarNumber": day,
                        "dayOfWeekNumber": (firstDay + day - 1) % 7,
                        "dayOfWeek": this._calendarDataDaysOfWeek[(firstDay + day - 1) % 7],
                        "year": (month + 2) === 13 ? year + 1 : year,
                        "monthNumber": (month + 2) === 13 ? 1 : month + 2,
                        "monthName": (this._calendarDataMonths[month + 1]) === undefined ? this._calendarDataMonths[0] : this._calendarDataMonths[month + 1],
                        "dateConcat": this._concatDate(day, (month + 2) === 13 ? 1 : month + 2, (month + 2) === 13 ? year + 1 : year),
                        "isCurrentDay": this._isCurrentDay(day, (month + 2) === 13 ? 1 : month + 2, year),
                        "prevMonth": false,
                        "nextMonth": true,
                        "curMonth": false,
                        "disabled": this._disabledDays['next'],
                    });
                }
                const calendar = {
                    "year": year,
                    "monthNumber": month + 1,
                    "monthName": this._calendarDataMonths[month],
                    "days": monthDays
                };
                calendars.push(calendar);
            }
        }
        return calendars;
    }

    _pushCalendarWeekHtml(weeksCount, calendarMonth) {
        let ul = document.createElement("ul");
        ul.className = 'calendar__week';
        ul.dataset.weekCount = weeksCount
        calendarMonth.append(ul);
    }
    _isAllUpToCurrentDaysDisabled(day, month, year) {
        if (this._disabledDays['allUpToCurrent']) {
            if (month <= (this._getCurrentDate()[1] + 1) && year <= this._getCurrentDate()[2]) {
                if (month < (this._getCurrentDate()[1] + 1) || day < this._getCurrentDate()[0]) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    _pushCalendarDayHtml(daysCount, weeksCount, dayOfTheMonth, calendarMonth, item) {
        let calendarWeek = calendarMonth.querySelector("[data-week-count='" + weeksCount + "']")
        let li = document.createElement("li");
        li.className = item['isCurrentDay'] ? 'calendar__day calendar__current' : 'calendar__day';
        li.dataset.dayCount = daysCount
        li.dataset.dayOfWeek = item['dayOfWeek']
        li.dataset.dayYear = item['year']
        li.dataset.dayMonthNumber = item['monthNumber']
        li.dataset.dayDateConcat = item['dateConcat']
        li.dataset.dayIsPrevMonth = item['prevMonth']
        li.dataset.dayIsNextMonth = item['nextMonth']
        li.dataset.dayIsCurMonth = item['curMonth']
        li.dataset.disabled = item['disabled']
        li.textContent = dayOfTheMonth
        calendarWeek.append(li);
    }

    _pushCalendarMonthHtml(item, index) {
        let div = document.createElement("div");
        div.className = 'calendar__month-wrapper';
        div.dataset.monthNum = item.monthNumber
        div.dataset.year = item.year
        div.dataset.index = index
        document.querySelector('.calendar__inner').append(div);
        let p = document.createElement("p");
        p.className = 'calendar__title';
        p.textContent = item.monthName + " " + item.year;
        let calendarMonth = document.querySelector("[data-month-num='" + item.monthNumber + "'][data-year='" + item.year + "']")
        calendarMonth.append(p)
        let weeksWrapper = document.createElement("div");
        weeksWrapper.className = 'calendar__weeks-wrapper';
        weeksWrapper.dataset.monthNum = item.monthNumber
        weeksWrapper.dataset.year = item.year
        let weeks = document.createElement("div");
        weeks.className = 'calendar__weeks';
        weeks.append(weeksWrapper)
        this._addWeekDaysNames(weeks)
        calendarMonth.append(weeks)
    }

    _addWeekDaysNames(container) {
        const res = [];
        let ul = document.createElement("ul");
        ul.className = 'calendar__week-name-list';
        container.prepend(ul)
        this._calendarDataDaysOfWeek.forEach((day, index) => {
            if (index !== 0) {
                res.unshift(day.replace(/[aeiouаеёиоуыэюяAEIOUАЕЁИОУЫЭЮЯ]/g, '').substring(0, 2))
            }
            if (index === this._calendarDataDaysOfWeek.length - 1) {
                res.unshift(this._calendarDataDaysOfWeek[0].replace(/[aeiouаеёиоуыэюяAEIOUАЕЁИОУЫЭЮЯ]/g, '').substring(0, 2))
            }
        });
        res.forEach((item) => {
            let li = document.createElement("li");
            li.className = 'calendar__week-name-item';
            li.textContent = item;
            ul.prepend(li)
        })

    }


    _addButtons() {
        let buttonNext = document.createElement("button");
        buttonNext.className = 'calendar__control calendar__control_next';
        buttonNext.dataset.action = 'next'
        buttonNext.type = 'button'
        let buttonPrev = document.createElement("button");
        buttonPrev.className = 'calendar__control calendar__control_prev';
        buttonPrev.dataset.action = 'prev'
        buttonPrev.type = 'button'
        this._calendar.append(buttonNext)
        this._calendar.prepend(buttonPrev)
    }

    _addCalendarInner() {
        let calendarInner = document.createElement("div");
        calendarInner.className = 'calendar__inner';
        this._calendar.append(calendarInner)
    }

    _getCurrentMonthIndex() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const index = this._monthArray.findIndex(item => item.year === currentYear && item.monthNumber === currentMonth);
        return index !== -1 ? index : 0;
    }

    _addDaysEvenListener() {
        let daysArray = this._calendar.querySelectorAll('.calendar__day')
        daysArray.forEach((item)=> {
            item.addEventListener('click', (e)=>{
                e.preventDefault()
                this._callBackFunction(e.target.dataset)
            });
        })
    }

    _setEventListeners() {
        const nextButton = document.querySelector('.calendar__control_next');
        const prevButton = document.querySelector('.calendar__control_prev');
        nextButton.addEventListener('click', this._nextMonth.bind(this));
        prevButton.addEventListener('click', this._prevMonth.bind(this));
        this._callBackFunction !== undefined ? this._addDaysEvenListener() : '' ;
    }

    _nextMonth() {
        document.querySelector('.calendar__month-wrapper').remove()
        this._generateCalendar(this._currentMonthIndex + 1)
        this._currentMonthIndex++
        this._callBackFunction !== undefined ? this._addDaysEvenListener() : '' ;
    }

    _prevMonth() {
        document.querySelector('.calendar__month-wrapper').remove()
        this._generateCalendar(this._currentMonthIndex - 1)
        this._currentMonthIndex--
        this._callBackFunction !== undefined ? this._addDaysEvenListener() : '' ;
    }

    _disableButtons(index, length) {
        const prevControl = document.querySelector('.calendar__control_prev');
        const nextControl = document.querySelector('.calendar__control_next');
        prevControl.disabled = index === 0 ? true : false;
        nextControl.disabled = index === length - 1 ? true : false;
    }

    _getCurrentDate() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        return [day, month, year];
    }

    _generateCalendar(curIndex) {
        this._disableButtons(curIndex, this._monthArray.length)
        this._monthArray.forEach((item, index) => {
            if (index === curIndex) {
                this._pushCalendarMonthHtml(item, index)
                let calendarMonth = document.querySelector("[data-month-num='" + item.monthNumber + "'][data-year='" + item.year + "']")
                let weeksWrapper = document.querySelector(".calendar__weeks-wrapper[data-month-num='" + item.monthNumber + "'][data-year='" + item.year + "']")
                let weeksCount = 0;
                let daysCount = 1;
                item['days'].forEach((dayItem) => {
                    let dayOfTheMonth = dayItem['dayCalendarNumber'];
                    if (daysCount === 1) {
                        this._pushCalendarWeekHtml(weeksCount, weeksWrapper)
                    }
                    this._pushCalendarDayHtml(daysCount, weeksCount, dayOfTheMonth, calendarMonth, dayItem)
                    if (daysCount === 7) {
                        weeksCount++
                        daysCount = 0;
                    }
                    daysCount++;
                })
            }
        })
    }

}
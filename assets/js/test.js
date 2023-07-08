(() => {
    const firstInput = document.querySelector(`.horario`);
    const submit = document.querySelector(`.submit`);
    const outcome = document.querySelector(`.resultado`);
    
    class Schedule {
        constructor(milliseconds, hours, minutes, dateInput) {
            this.title0 = {
                value: createDate(dateInput)
            }
            this.title1 = {
                title: `Café:`,
                value: createTime(milliseconds, hours, minutes)
            };
            this.title2 = {
                title: `Lanche:`,
                value: createTime(9000000, hours, minutes)
            };
            this.title3 = {
                title: `Almoço:`,
                value: createTime(21600000, hours, minutes)
            };
            this.title4 = {
                title: `Lanche da Tarde:`,
                value: createTime(34200000, hours, minutes)
            };
            this.title5 = {
                title: `Jantar:`,
                value: createTime(46800000, hours, minutes)
            };
            this.title6 = {
                title: `Hora de deitar:`,
                value: createTime(54000000, hours, minutes)
            };
        }
    }
    
    function createDate(dateInput) {
        let today = new Date(dateInput);
        const monthArray = [`Janeiro`, `Fevereiro`, `Março`, `Abril`, `Maio`, `Junho`, `Julho`, `Agosto`, `Setembro`, `Outubro`, `Novembro`, `Dezembro`];
        const date = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        return `${date} de ${monthArray[month]} de ${year}`;
    }
    
    function createTime(milliseconds, hours, minutes) {
        let newDate = new Date();
        if (hours && minutes) {
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
        }
        if (milliseconds) {
            newDate.setMilliseconds(milliseconds);
        }
        return newDate.toLocaleTimeString(`pt-BR`, { timeStyle: `short` });
    }
    
    function createTable(schedule) {
        const table = document.createElement('table');
        outcome.appendChild(table);
        
        createTableHeader(schedule, table);
        createTableRows(schedule, table);
    }
    
    function createTableHeader(schedule, table) {
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.setAttribute('colspan', '2');
        headerCell.setAttribute('class', 'date');
        headerCell.style.textAlign = 'center';
        headerRow.appendChild(headerCell);
        
        const dateValue = Object.values(schedule)[0].value;
        headerCell.appendChild(document.createTextNode(dateValue));
        
        table.appendChild(headerRow);
    }
    
    function createTableRows(schedule, table) {
        for (let i = 1; i < Object.values(schedule).length; i++) {
            const scheduleItem = Object.values(schedule)[i];
            const row = document.createElement('tr');
            
            const titleCell = document.createElement('td');
            titleCell.appendChild(document.createTextNode(scheduleItem.title));
            row.appendChild(titleCell);
            
            const valueCell = document.createElement('td');
            valueCell.appendChild(document.createTextNode(scheduleItem.value));
            row.appendChild(valueCell);
            
            table.appendChild(row);
        }
    }
    
    function saveSchedule(schedule) {
        localStorage.setItem(`schedule`, JSON.stringify(schedule));
    }
    
    function setSchedule() {
        const scheduleSaved = localStorage.getItem(`schedule`);
        if (scheduleSaved) {
            const schedule = JSON.parse(scheduleSaved);
            createTable(schedule);
        }
    };
    setSchedule();
    
    submit.addEventListener(`click`, (e) => {
        e.preventDefault();
        if (outcome.firstChild) {
            outcome.removeChild(outcome.firstChild);
        }
        if (firstInput.value) {
            const hours = parseInt(firstInput.value.slice(0, 2));
            const minutes = parseInt(firstInput.value.slice(3, 5));
            let schedule = new Schedule(0, hours, minutes, Date.now());
            createTable(schedule);
            saveSchedule(schedule);
        } else {
            let schedule = new Schedule(0, null, null, Date.now());
            createTable(schedule);
            saveSchedule(schedule);
        }
    })
})();

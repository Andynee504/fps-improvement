const start = document.querySelector(`.start`);
const time = document.querySelector(`.time`);
const tutorial = document.querySelector(`.instrucao`);
const resultado = document.querySelector(`.resultado`);

let toggleStart = true; // define o início do teste
let startTime; // início da contagem 
let toggleActive = false; // indica o início de um novo teste para countdown
let reactionTime; // inicialização da variável para obter cada tempo de reação durante o teste
let resultNumber = 0; // elenca os resultados
let averageResponse = []; // inicialização do array com os resultados de cada teste que depois será reinicializado

// Alternador no botão "start" para iniciar ou para-lo
start.addEventListener(`click`, (e) => {
    if (toggleStart) {
        start.innerText = `Stop`;
        time.classList.add(`btn-time`);
        tutorial.innerText = `Aperte em "Time" para começar o tempo`;
        time.classList.remove(`start`);
        toggleStart = false;
        toggleActive = true;
    } else {
        start.innerText = `Start`;
        tutorial.innerText = `Aperte em "Start" para começar o teste`;
        time.classList.remove(`btn-time`);
        time.classList.add(`start`);
        toggleStart = true;
    }
})

// botão principal para realização do teste
time.addEventListener(`click`, (e) => {
    if (!toggleStart) {
        time.classList.remove(`btn-time`)
        countdown()
        reactionTime = new Date().getTime() - startTime;
        if (startTime) {
            averageResponse.push(reactionTime)
        }
        startTime = null;
    }
})

// contador regressivo para inicio do teste
function countdown() {
    let seconds = 3;
    if (toggleActive) {
        time.innerText = seconds;
        const starting = setInterval(() => {
            if (toggleStart) {
                time.innerText = `Time`;
                clearInterval(starting)
                return
            }
            seconds--;
            time.innerText = seconds;
            toggleActive = false;
            if (seconds === 0) {
                time.innerText = `Time`;
                clearInterval(starting);
                driveTest()
                return;
            } else if (seconds < 0) {
                clearInterval(starting);
                tutorial.innerText = `Ocorreu um erro. Favor recomeçar.`;
                return;
            }
        }, 1000);
    }
};

// variável aleatória durante aplicação do teste
const timeRand = function (min = 3, max = 5) {
    min *= 1000;
    max *= 1000;
    const random = Math.floor(Math.random() * (max - min) + min);
    return random;
}

// aplicação do teste, impressão do resultado e redefinição para outra aplicação
function driveTest() {
    const intervals = setInterval(() => {
        time.classList.add(`btn-time`)
        startTime = new Date().getTime();
        const newInterval = timeRand(); // Chama timeRand() novamente para obter um novo intervalo
        clearInterval(intervals); // Limpa o intervalo atual
        driveTest(); // Chama driveTest() recursivamente para iniciar o próximo intervalo com o novo valor
    }, timeRand());
    setTimeout(() => {
        clearInterval(intervals);
        console.log(averageResponse);
        start.innerText = `Start`;
        tutorial.innerText = `Aperte em "Start" para começar o teste`;
        time.classList.remove(`btn-time`);
        time.classList.add(`start`);
        toggleStart = true;
        if (startTime) {
            startTime = null;
        }
        resultNumber++;
        resultado.innerHTML += `<p>${resultNumber} :>> ${Math.floor(averageResponse.reduce((ac, val) => ac + val) / averageResponse.length)}ms</p>`;
        averageResponse = [];
    }, 30000);
}

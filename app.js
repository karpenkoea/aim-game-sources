const startBtn = document.querySelector('#start'),
      restartBtn = document.querySelector('#restart'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      colors = ['#BFDD7D', '#b81bab', '#6B82AF', '#C46FA2', '#E79C83', '1fdb19'];

let time = 0,
    score = 0;


startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up'); 
});

restartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload(); 
});

// startGame();

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up'); 
        startGame();
    }
});

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);   
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }  
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;  
}


function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
    setTimeout(showRestartLink, 2000);
}

function createRandomCircle() {
    const circle = document.createElement('div'),
          size = getRandomNumber(10, 60),
          {width, height} = board.getBoundingClientRect(),
          x = getRandomNumber(0, width - size),
          y = getRandomNumber(0, height - size),
          color = getRandomColor();


    circle.classList.add('circle'); 
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `linear-gradient(90deg, ${color} 0%, ${color} 47%, ${color} 100%)`;

    board.append(circle);
}


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min); 
}

function getRandomColor() {
    const index = Math.floor(Math.random()*colors.length);
    return colors[index];
}

function showRestartLink() {
    restartBtn.classList.remove('hide');
}

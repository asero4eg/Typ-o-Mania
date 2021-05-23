const keys = document.querySelectorAll('.key'),
    modeButton = document.querySelectorAll('.mode'),
    streakText = document.querySelector('.streak'),
    speedText = document.querySelector('.speed'),
    accuracyText = document.querySelector('.accuracy'),
    rightHand = document.querySelectorAll('.right-hand'),
    leftHand = document.querySelectorAll('.left-hand');
let curActive = document.querySelectorAll('.key')[16],
    curFingerpoint = document.querySelector('.ring-finger');

let totalPresses = 0,
    correctPresses = 0,
    streak = 0,
    speed = 0,
    accuracy = 0,
    seconds = 0;

let colors = ['#ffa0a0', '#ffe1a0', '#abffa0', '#f291ff', '#91a7ff'];
let hands = {
    leftHand: {
        indexFinger: {
            fingerColor: '#91a7ff',
            fingerKeys: ['4', '5', 'r', 't', 'f', 'g', 'v', 'b']
        },
        middleFinger: {
            fingerColor: '#abffa0',
            fingerKeys: ['3', 'e', 'd', 'c']
        },
        ringFinger: {
            fingerColor: '#ffe1a0',
            fingerKeys: ['2', 'w', 's', 'x']
        },
        pinkie: {
            fingerColor: '#ffa0a0',
            fingerKeys: ['tab', 'q', 'a', 'z', 'shift']
        }
    },
    rightHand: {
        indexFinger: {
            fingerColor: '#f291ff',
            fingerKeys: ['6', 'y', 'h', 'n', 'm', '7', 'u', 'j', 'm']
        },
        middleFinger: {
            fingerColor: '#abffa0',
            fingerKeys: ['8', 'i', 'k', ',']
        },
        ringFinger: {
            fingerColor: '#ffe1a0',
            fingerKeys: ['9', 'o', 'l', '.']
        },
        pinkie: {
            fingerColor: '#ffa0a0',
            fingerKeys: ['0', 'p', '/', 'shift', "'", ';', '[', ']', '\\']
        }
    }
}

function getRandomKey() {
    return Math.floor(Math.random() * keys.length)
}

function setRandomKey() {
    let newCurentActive = getRandomKey();
    if (curActive.classList.contains('active')) {
        curActive.classList.remove('active');
        keys[newCurentActive].classList.add('active');
        curActive = keys[newCurentActive];
    }
}

function showStreak() {
    streakText.innerText = streak;
}

function showAccuracy() {
    accuracyText.innerText = ((correctPresses / totalPresses) * 100).toFixed(1) + '%';
}

function checkKey(e) {
    e.preventDefault()
    switch (true) {
        case e.key == curActive.innerText.toLowerCase():
            setRandomKey();
            showFinger();
            streak++;
            totalPresses++;
            correctPresses++;
            showStreak();
            showAccuracy();
            break;
        case curActive.innerText.toLowerCase() == 'shift' && e.shiftKey:
            setRandomKey();
            showFinger();
            streak++;
            totalPresses++;
            correctPresses++;
            showStreak();
            showAccuracy()
            break;
        case curActive.innerText.toLowerCase() == 'tab' && e.keyCode == 9:
            setRandomKey();
            showFinger();
            streak++;
            totalPresses++;
            correctPresses++;
            showStreak();
            showAccuracy();
            break;
        default:
            showFinger();
            streak = 0;
            totalPresses++;
            showStreak();
            showAccuracy();
            break;
    }
}

//Changes the marker position and color on finger according to hand
function setFingerpiontColor(selector, color) {
    curFingerpoint.style.removeProperty('background-color');
    curFingerpoint = document.querySelector(`${selector}`)
    curFingerpoint.style.backgroundColor = `${color}`;
    console.log(color + ' selected')
}

//Сhecks which hand the key belongs to
function checkFinger(hand, handClass) {
    for (let i in hand) {
        if (hand[i].fingerKeys.includes(curActive.textContent.toLocaleLowerCase())) {
            switch (true) {
                case i == 'indexFinger': setFingerpiontColor(`${handClass} .index-finger`, hand.indexFinger.fingerColor); break;
                case i == 'middleFinger': setFingerpiontColor(`${handClass} .middle-finger`, hand.middleFinger.fingerColor); break;
                case i == 'ringFinger': setFingerpiontColor(`${handClass} .ring-finger`, hand.ringFinger.fingerColor); break;
                case i == 'pinkie': setFingerpiontColor(`${handClass} .pinkie`, hand.pinkie.fingerColor); break;
            }
        }
    }
}

//Displays the marker on finger
function showFinger() {
    checkFinger(hands.leftHand, '.left-hand')
    checkFinger(hands.rightHand, '.right-hand')
}

//Randomizes color of key in hard mode
function setRandomColor() {
    for (let i of keys) {
        i.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}`
    }
}
//Sets color to default in easy mode
function setDefaultColor() {
    for (let i of keys) {
        i.style.removeProperty('background-color');
    }
}

function modeChange(e) {
    modeButton[0].classList.toggle('easy-active');
    modeButton[1].classList.toggle('hard-active');
    if (modeButton[0].classList.contains('easy-active')) {
        clearInterval(hardMode);
        setDefaultColor()
    }
    else {
        hardMode = setInterval(setRandomColor, 75);
    }
}

for (let i of modeButton) {
    i.addEventListener('click', modeChange)
}
showFinger();
document.addEventListener('keydown', checkKey)
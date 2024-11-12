import carWrapper from "./carComponent/carWrapper.mjs";

//Game Logic
const gameWindow = document.getElementById('gameWindow');
gameWindow.appendChild(carWrapper);
gameWindow.height = 600;
gameWindow.width = 400;
gameWindow.style.height = gameWindow.height + 'px';
gameWindow.style.width = gameWindow.width + 'px';

// Input handling
const keyPressed = {};
document.addEventListener('keydown', () => {
    event.preventDefault();
    keyPressed[event.key] = true;
})
document.addEventListener('keyup', () => {
    event.preventDefault();
    keyPressed[event.key] = false;
})

//Updates
setInterval( () => {
    carWrapper.updatePosition();
    
}, 16)

setInterval( () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}, 80)
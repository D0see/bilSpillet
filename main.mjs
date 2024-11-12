import carWrapper from "./carComponent/carWrapper.mjs";

//Game Logic
document.body.appendChild(carWrapper);

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
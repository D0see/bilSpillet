import carWrapper from "./carComponent/carWrapper.mjs";
import debugPointFactory from "./carComponent/debugPointFactory.mjs";
//Game Logic
document.body.appendChild(carWrapper);

// Input handling
export const keyPressed = {};
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
    carWrapper.updateHitbox();
}, 16)

setInterval( () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}, 80)


//Debug

const testPoints = [[200, 200],[600,600],[400,300]];
for (const point of testPoints) {
    debugPointFactory(point[0], point[1], 'orange');
}
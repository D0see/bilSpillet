import carWrapper from "./carComponent/carWrapper.mjs";

import collisionChecker from "./utils/collisionChecker.mjs";
import testPoints from "./utils/debugWorld.mjs";
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
    for (const testPoint of  testPoints) {
        if (collisionChecker(carWrapper, testPoint)) {
            console.log("COLLISION with : ", testPoint);
        }
    }
}, 16)

setInterval( () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}, 80)


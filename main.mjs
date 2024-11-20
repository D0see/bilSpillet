import carWrapper from "./carComponent/carWrapper.mjs";
import rabbitWrapper from "./rabbitComponent/rabbitWrapper.mjs";


import collisionChecker from "./utils/collisionChecker.mjs";
// import testPoints from "./utils/debugWorld.mjs";
//Game Logic
document.body.appendChild(carWrapper);
document.body.appendChild(rabbitWrapper);


console.log(document.getElementsByTagName("lapin"));
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
    for (const point of rabbitWrapper.hitboxPoints) {
        if (collisionChecker(carWrapper, point)) {
            rabbitWrapper.vel = 0;
            rabbitWrapper.firstChild.style.backgroundColor = 'red';
            console.log("COLLISION with rabbit at : ", point);
        }
    }
    rabbitWrapper.keydownHandler(keyPressed);   
    rabbitWrapper.stopsOnDirectionRelease(keyPressed);
    rabbitWrapper.updatePosition();
    rabbitWrapper.updateHitbox();
}, 16)

setInterval( () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}, 80)


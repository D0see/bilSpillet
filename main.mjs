import carWrapper from "./carComponent/carWrapper.mjs";
import ratWrapper from "./ratComponent/ratWrapper.mjs";


import collisionChecker from "./utils/collisionChecker.mjs";
// import testPoints from "./utils/debugWorld.mjs";
//Game Logic
document.body.appendChild(carWrapper);
document.body.appendChild(ratWrapper);


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

const collisionsHandler = () => {
    for (const point of ratWrapper.hitboxPoints) {
        if (collisionChecker(carWrapper, point)) {
            ratWrapper.isAlive = false;
            ratWrapper.speed = 0;
            document.getElementById("rat").style.backgroundImage = ("url(./ratComponent/deadRat.png");
            for (const limb of ratWrapper.limbs) {
                limb.hidden = "true";
            }
        }
    }
}

//Updates
setInterval( () => {

    carWrapper.updatePosition();
    carWrapper.updateHitbox();

    ratWrapper.keydownHandler(keyPressed);   
    ratWrapper.stopsOnDirectionRelease(keyPressed);
    ratWrapper.updatePosition();
    ratWrapper.updateHitbox();
    ratWrapper.animationsHandler();

    collisionsHandler();
}, 16)

setInterval( () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}, 80)


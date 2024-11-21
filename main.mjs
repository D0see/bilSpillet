import carWrapperFactory from "./carComponent/carWrapperFactory.mjs";
import ratWrapperFactory from "./ratComponent/ratWrapper.mjs";
import timerFactory from "./timerComponent/timerFactory.mjs";
import { keyPressed } from "./utils/keyPressHandler.mjs";

import collisionChecker from "./utils/collisionChecker.mjs";
//Game Logic

const mainUpdatesLoop = () => {
    timer.updateTimer(clockSpeed);

    carWrapper.updatePosition();
    carWrapper.updateHitbox();

    ratWrapper.keydownHandler(keyPressed);   
    ratWrapper.stopsOnDirectionRelease(keyPressed);
    ratWrapper.updatePosition();
    ratWrapper.updateHitbox();
    ratWrapper.animationsHandler();

    collisionsHandler();
}
const clockSpeed = 16;

const carUpdateLoop = () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}
const carClock = 80;

const collisionsHandler = () => {
    for (const point of ratWrapper.hitboxPoints) {
        if (collisionChecker(carWrapper, point)) {
            ratWrapper.isAlive = false;
            ratWrapper.speed = 0;
            document.getElementById("rat").style.backgroundImage = ("url(./ratComponent/deadRat.png");
            for (const limb of ratWrapper.limbs) {
                limb.hidden = "true";
            }
            timer.stop();
        }
    }
}

function gameLogic() {
    const ratWrapper = ratWrapperFactory();
    const carWrapper = carWrapperFactory();
    const timer = timerFactory();
    document.body.appendChild(carWrapper);
    document.body.appendChild(ratWrapper);
    document.body.appendChild(timer);
    //Updates
    setInterval(mainUpdatesLoop, clockSpeed);
    setInterval(carUpdateLoop, carClock);
}
gameLogic();
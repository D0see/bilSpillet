import carWrapperFactory from "./carComponent/carWrapperFactory.mjs";
import ratWrapperFactory from "./ratComponent/ratWrapperFactory.mjs";
import timerFactory from "./timerComponent/timerFactory.mjs";

import { keyPressed } from "./utils/keyPressHandler.mjs";
import collisionChecker from "./utils/collisionChecker.mjs";

//Game Logic

const clockSpeed = 16;

const carUpdateLoop = () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}
const carClock = 80;



function gameLogic() {
    const mainElem = document.getElementById("gameWindow");
    const ratWrapper = ratWrapperFactory();
    const carWrapper = carWrapperFactory();
    const timer = timerFactory();
    mainElem.appendChild(carWrapper);
    mainElem.appendChild(ratWrapper);
    mainElem.appendChild(timer);
    //Updates
    const mainUpdatesLoop = () => {
        timer.updateTimer(clockSpeed);
    
        carWrapper.updatePosition();
        carWrapper.updateHitbox();
    
        ratWrapper.keydownHandler(keyPressed);   
        ratWrapper.stopsOnDirectionRelease(keyPressed);
        ratWrapper.updatePosition();
        ratWrapper.updateHitbox();
        ratWrapper.animationsHandler();

        const collisionsHandler = () => {
            for (const point of ratWrapper.hitboxPoints) {
                if (collisionChecker(carWrapper, point)) {
                    ratWrapper.isAlive = false;
                    ratWrapper.speed = 0;
                    ratWrapper.killTheRat();
                    for (const limb of ratWrapper.limbs) {
                        limb.hidden = "true";
                    }
                    timer.stop();
                    clearInterval(gameLoop);
                    clearInterval(carLoop);
                    resetGame();
                }
            }
        }
        collisionsHandler();
    }
    const gameLoop = setInterval(mainUpdatesLoop, clockSpeed);
    const carLoop = setInterval(carUpdateLoop, carClock);
}

const resetGame = () => {
    const mainElem = document.getElementById("gameWindow");
    const restartWindow = document.createElement("div");
    restartWindow.innerText = 'RESTART THE GAME ???'
    document.body.appendChild(restartWindow);
    console.log(mainElem.children);
    restartWindow.addEventListener("click", () => {
        for (const elem of [...mainElem.children]) {
            elem.remove();
        }
        gameLogic();
    })
}

gameLogic();
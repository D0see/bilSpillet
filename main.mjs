import carWrapperFactory from "./carComponent/carWrapperFactory.mjs";
import ratWrapperFactory from "./ratComponent/ratWrapperFactory.mjs";
import timerFactory from "./timerComponent/timerFactory.mjs";

import { keyPressed } from "./utils/keyPressHandler.mjs";
import collisionChecker from "./utils/collisionChecker.mjs";

//Game Logic

function gameLogic() {
    const window = document.getElementById("restartWindow");
    if (window) {window.remove();}

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
        ratWrapper.animationsHandler();
        ratWrapper.updateHitbox();

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
    const clockSpeed = 16;
    const gameLoop = setInterval(mainUpdatesLoop, clockSpeed);

    const carUpdateLoop = () => {
        carWrapper.keydownHandler(keyPressed);
        carWrapper.animationsHandler();
    }
    const carClock = 80;
    const carLoop = setInterval(carUpdateLoop, carClock);
}

const resetGame = () => {
    if (document.getElementById("restartWindow")) {return;}
    const mainElem = document.getElementById("gameWindow");
    const restartWindow = document.createElement("div");
    restartWindow.id = 'restartWindow';
    restartWindow.innerText = 'Press forward to restart';
    document.body.appendChild(restartWindow);
    console.log(mainElem.children);
    restartWindow.tabIndex = 0;
    restartWindow.focus();
    restartWindow.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            for (const elem of [...mainElem.children]) {
                elem.remove();
            }
            gameLogic();
        }
    })
}

gameLogic();
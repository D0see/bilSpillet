import puff from "./puff.mjs"
import car from "./car.mjs"
import headlightFactory from "./headlightFactory.mjs";

//_______________________________ Intialization
const carWrapper = document.createElement('div');
carWrapper.id = 'carWrapper';
document.body.appendChild(carWrapper);
carWrapper.appendChild(car);
carWrapper.appendChild(puff);
const leftHeadlight = headlightFactory("leftHeadlight", 213, -37);
const rightHeadlight = headlightFactory("rightHeadlight", 218, 6);
const headLights = [leftHeadlight, rightHeadlight];
carWrapper.appendChild(leftHeadlight);
carWrapper.appendChild(rightHeadlight);

//_______________________________ CONSTANTES 
const MAXSPEED = 10; // px / 32ms

//_______________________________ Style 
carWrapper.style.position = "relative";
carWrapper.style.zIndex = "10";
carWrapper.height = 94; //voiture.png height
carWrapper.width = 200; //voiture.png width
carWrapper.style.height = carWrapper.height + 'px';
carWrapper.style.width = carWrapper.width + 'px';

//_______________________________ Position
carWrapper.posY = 0;
carWrapper.posX = 0;
carWrapper.vel = 0;
carWrapper.setNewCoord = function() {
    this.posY += carWrapper.orientation[1] * this.vel;
    this.posX += carWrapper.orientation[0] * this.vel;
}
carWrapper.updatePosition = function() {
    this.setNewCoord();
    this.style.left = this.posX + 'px';
    this.style.top = this.posY + 'px';
}

//_______________________________ Handles oriention

const NUMOFDIRECTIONS = 32;
carWrapper.orientationsIndex = 0;
// [[x, y],...] 16 directions starting at 0,1 (up) going clockwise
carWrapper.orientationsArray = [];
const angleIncrement = 3600 / NUMOFDIRECTIONS;
for (let i = 0; i < (3600 / angleIncrement); i++) {
    const angle = i * (angleIncrement/10) * (Math.PI/180);
    carWrapper.orientationsArray.push([Math.cos(angle), Math.sin(angle)]);
}
carWrapper.orientation = carWrapper.orientationsArray[carWrapper.orientationsIndex];
carWrapper.setOrientation = function() {
    this.orientation = this.orientationsArray[this.orientationsIndex];
}
// turns the carWrapper (val * angleIncrement/10 degrees)
carWrapper.changeOrientation = function(val) {
    const nextOrientationIndex = (this.orientationsIndex + val);
    if (nextOrientationIndex > (this.orientationsArray.length - 1)) {
        this.orientationsIndex = (nextOrientationIndex % this.orientationsArray.length);
    } else if (nextOrientationIndex < 0){
        this.orientationsIndex = this.orientationsArray.length + nextOrientationIndex;
    } else {this.orientationsIndex = nextOrientationIndex;}
    this.setOrientation();
    //integration tests
    this.setSpriteOrientation(nextOrientationIndex);
}

//_______________________________ handles animations

carWrapper.setSpriteOrientation = function(val) {
    carWrapper.style.transform = `rotate(${this.orientationsIndex*Math.round(360/NUMOFDIRECTIONS)}deg)`
}
    //handles puff of smoke
carWrapper.puffHandler = function() {
    if (this.vel > 3) {
        if (puff.hidden) {
            puff.style.opacity = "1";
            puff.style.animation = "0.5s linear squeeze infinite"
            puff.hidden = false;
        }
    } else {
        if (!puff.hidden) {
            puff.style.opacity = "0";
            puff.hidden = true;
        }
    }
}
    //handles headlights
carWrapper.headlightHandler = function() {
    headLights.forEach(headlight => headlight.style.opacity === '1' ? 
                                    headlight.style.opacity = '0' : 
                                    headlight.style.opacity = '1');
}

carWrapper.animationsHandler = function() {
    carWrapper.puffHandler();
}

//_______________________________ input Handler 

carWrapper.keydownHandler = function(keyPressed) {
    for (const key of Object.keys(keyPressed)) {
        if (!keyPressed[key]) {continue;}
        switch (key) {
            case 'ArrowUp' :
                if(carWrapper.vel >= 0 && carWrapper.vel < MAXSPEED) {carWrapper.vel++;
                } else if (carWrapper.vel === -2) {carWrapper.vel = 0;}
                break;
            case 'ArrowDown' :
                //slowing down
                if (carWrapper.vel > 0) {carWrapper.vel--;
                //reverse
                } else {carWrapper.vel = -2;}
                break;
            case 'ArrowLeft' :
                if (carWrapper.vel !== 0) {carWrapper.changeOrientation(-1);}
                break;
            case 'ArrowRight' :
                if (carWrapper.vel !== 0) {carWrapper.changeOrientation(1)};
                break;
            case ' ' :
                carWrapper.vel = Math.max(Math.round(carWrapper.vel /1.05 - 0.6), 0);
                break;
            case 'h' :
                carWrapper.headlightHandler();
                break;

        }
    }
}
export default carWrapper;

import puff from "./puff.mjs";
import car from "./car.mjs";
import headlightFactory from "./headlightFactory.mjs";
import skidmarkFactory from "./skidmarksFactory.mjs";
import driftSparkFactory from "./driftSparkFactory.mjs";
//_______________________________ Intialization
const carWrapper = document.createElement('div');
carWrapper.id = 'carWrapper';
document.body.appendChild(carWrapper);
carWrapper.appendChild(car);
carWrapper.appendChild(puff);

const leftHeadlight = headlightFactory("leftHeadlight", 213, -37);
const rightHeadlight = headlightFactory("rightHeadlight", 218, 6);
carWrapper.appendChild(leftHeadlight);
carWrapper.appendChild(rightHeadlight);
const headLights = [leftHeadlight, rightHeadlight];

const leftSpark = driftSparkFactory(1, 2);
carWrapper.appendChild(leftSpark);


//_______________________________ CONSTANTES 
const MAXSPEED = 12; // px / 32ms
const MAXSKIDMARKS = 50;

//_______________________________ Style 
carWrapper.style.position = "absolute";
carWrapper.style.zIndex = "10";
carWrapper.height = 94; //voiture.png height
carWrapper.width = 200; //voiture.png width
carWrapper.style.height = carWrapper.height + 'px';
carWrapper.style.width = carWrapper.width + 'px';

//_______________________________ Position
carWrapper.posY = 450;
carWrapper.posX = 250;
carWrapper.vel = 0; // in px / 32ms
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
carWrapper.orientation = 0;
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
    this.setSpriteOrientation(nextOrientationIndex);
}

//_______________________________ handles animations
carWrapper.setSpriteOrientation = function(val) {
    carWrapper.style.transform = `rotate(${this.orientationsIndex*Math.round(360/NUMOFDIRECTIONS)}deg)`;
}
    //handles puff of smoke
carWrapper.puffHandler = function() {
    if (this.vel > 3) {
        if (puff.isHidden) {
            puff.style.backgroundImage = "url(carComponent/puff.png)";
            puff.style.animation = "0.5s linear squeeze infinite";
            puff.isHidden = false;
        }
    } else {
        if (!puff.isHidden) {
            puff.style.backgroundImage = "";
            puff.style.animation = "";
            puff.isHidden = true;
        }
    }
}

    //handles headlights
carWrapper.headlightHandler = function() {
    headLights.forEach(headlight => headlight.style.opacity === '1' ? 
                                    headlight.style.opacity = '0' : 
                                    headlight.style.opacity = '1');
}

    //handles skidmarks 
const skidMarks = [];
carWrapper.skidMarkHandler = function () {
    skidMarks.push(skidmarkFactory(this.posX, this.posY, this.style.transform, this.orientationsIndex));
    // FIFO implementation
    if (skidMarks.length > MAXSKIDMARKS) { 
        skidMarks.shift().remove();
    }
}

    //handles animations
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
                carWrapper.vel = Math.max(Math.round(carWrapper.vel /1.15 - 0.6), 0);
                carWrapper.skidMarkHandler();
                break;
            case 'h' :
                carWrapper.headlightHandler();
                break;

        }
    }
}
export default carWrapper;

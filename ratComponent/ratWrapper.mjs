import {keyPressed} from "../main.mjs";

import rat from "./rat.mjs";

import ratLimbFactory from "./ratLimbFactory.mjs";

const ratWrapper = document.createElement('div');
ratWrapper.id = 'ratWrapper';
document.body.appendChild(ratWrapper);
ratWrapper.appendChild(rat);
const ratLimbUpLeft = ratLimbFactory("./ratLimbUpLeft.png", "ratLimbUpLeft")
ratWrapper.appendChild(ratLimbUpLeft);
ratWrapper.appendChild(ratLimbFactory("./ratLimbUpRight.png", "ratLimbUpRight"));
ratWrapper.appendChild(ratLimbFactory("./ratLimbDownRight.png", "ratLimbDownRight"));
ratWrapper.appendChild(ratLimbFactory("./ratLimbDownLeft.png", "ratLimbDownLeft"));

//_______________________________ CONSTANTES 
ratWrapper.speed = 6; // px / 32ms

//_______________________________ Style 
ratWrapper.style.position = "absolute";
ratWrapper.style.zIndex = "3";
ratWrapper.height = 60; // placeholder
ratWrapper.width = 141; // placeholder
ratWrapper.style.height = ratWrapper.height + 'px';
ratWrapper.style.width = ratWrapper.width + 'px';

//_______________________________ Position
ratWrapper.area = ratWrapper.height * ratWrapper.width;
//position at topLeft of sprite
ratWrapper.posY = 500;
ratWrapper.posX = 500;
ratWrapper.vel = 0; // in px / 32ms
ratWrapper.setNewCoord = function() {
    this.posY += ratWrapper.orientation[1] * this.vel;
    this.posX += ratWrapper.orientation[0] * this.vel;
}
ratWrapper.updatePosition = function() {
    this.setNewCoord();
    this.style.left = this.posX + 'px';
    this.style.top = this.posY + 'px';
}

//_______________________________ Handles oriention
ratWrapper.numOfDirections = 8;
ratWrapper.orientation = 0;
ratWrapper.orientationsIndex = 0;
// [[x, y],...] 16 directions starting at 0,1 (up) going clockwise
ratWrapper.orientationsArray = [];
ratWrapper.angleIncrement = 3600 / ratWrapper.numOfDirections;
for (let i = 0; i < (3600 / ratWrapper.angleIncrement); i++) {
    const angle = i * (ratWrapper.angleIncrement/10) * (Math.PI/180);
    ratWrapper.orientationsArray.push([Math.cos(angle), Math.sin(angle)]);
}
ratWrapper.orientation = ratWrapper.orientationsArray[ratWrapper.orientationsIndex];
ratWrapper.setOrientation = function() {
    this.orientation = this.orientationsArray[this.orientationsIndex];
}
// turns the ratWrapper (val * angleIncrement/10 degrees)
ratWrapper.changeOrientation = function(newIndex) {
    this.orientationsIndex = newIndex;
    this.setOrientation();
    this.setSpriteOrientation(newIndex);
}


//_______________________________ Handles hitbox
ratWrapper.updateHitbox = function () {
    const middleX = this.posX + ratWrapper.width / 2; 
    const middleY = this.posY + ratWrapper.height / 2;

    let resultIndex;
    const nextOrientationIndex = (this.orientationsIndex + this.numOfDirections/4);
    if (nextOrientationIndex > (this.orientationsArray.length - 1)) {
        resultIndex = (nextOrientationIndex % this.orientationsArray.length);
    } else if (nextOrientationIndex < 0){
        resultIndex = this.orientationsArray.length + nextOrientationIndex;
    } else {resultIndex = nextOrientationIndex;}
    const perpDirection = this.orientationsArray[resultIndex];
    //[topLeft, topRight, bottomRight, bottomLeft]
    ratWrapper.hitboxPoints = 
                        [[middleX - this.orientation[0] *(this.width / 2) - perpDirection[0] *(this.height / 2),
                        middleY - this.orientation[1] *(this.width / 2) - perpDirection[1] *(this.height / 2)], 
                        [middleX + this.orientation[0] *(this.width / 2) - perpDirection[0] *(this.height / 2),
                        middleY + this.orientation[1] *(this.width / 2) - perpDirection[1] *(this.height / 2)],
                        [middleX + this.orientation[0] *(this.width / 2) + perpDirection[0] *(this.height / 2),
                        middleY + this.orientation[1] *(this.width / 2) + perpDirection[1] *(this.height / 2)],
                        [middleX - this.orientation[0] *(this.width / 2) + perpDirection[0] *(this.height / 2),
                        middleY - this.orientation[1] *(this.width / 2) + perpDirection[1] *(this.height / 2)]];

    this.hitboxSegments = [[this.hitboxPoints[0], this.hitboxPoints[this.hitboxPoints.length - 1]]];
    for (let i = 1; i < this.hitboxPoints.length; i++) {
        this.hitboxSegments.push([this.hitboxPoints[i - 1], this.hitboxPoints[i]]);
    }
}
ratWrapper.hitboxSegments = [];
ratWrapper.updateHitbox();

//___________________________________________ handlesAnimation 
ratWrapper.setSpriteOrientation = function(val) {
    this.style.transform = `rotate(${this.orientationsIndex*Math.round(360/this.numOfDirections)}deg)`;
}

//___________________________________________ inputHandling
ratWrapper.stopsOnDirectionRelease = function (keyPressed) {
    let directionPressed = false;
    for (const key of Object.keys(keyPressed)) {
        if (keyPressed[key] === true && parseInt(key) > -1) {
            directionPressed = true;
            break;
        }
    }
    if (!directionPressed) {this.vel = 0} 
}

//used to keep tracks of the last inputted key
ratWrapper.keyList = [];
ratWrapper.updateInputKeyList = function (keyPressed) {
    for (const key of Object.keys(keyPressed)) {
        parseInt(key) && !keyPressed[key] && this.keyList.includes(key)? this.keyList.splice(this.keyList.indexOf(key), 1) : '';
    }
    for (const key of Object.keys(keyPressed)) {
        parseInt(key) && keyPressed[key] && !this.keyList.includes(key)? this.keyList.unshift(key) : '';
    }
}

ratWrapper.keydownHandler = function() {
    ratWrapper.updateInputKeyList(keyPressed);
    switch (this.keyList[0]) {
        case '1' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(3);
            break;
        case '2' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(2);
            break;
        case '3' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(1);
            break;
        case '4' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(4);
            break;
        case '5' :
            break;
        case '6' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(0);
            break;
        case '7' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(5);
            break;
        case '8' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(6);
            break;
        case '9' :
            this.vel = ratWrapper.speed;
            ratWrapper.changeOrientation(7);
            break;
        case 'd' : 
            //DEBUG !!!
            //ratWrapper.printHitbox();
            this.vel = 0;
            break;
    }
}

export default ratWrapper;
import {keyPressed} from "../main.mjs";

import rabbit from "./rabbit.mjs";


const rabbitWrapper = document.createElement('div');
rabbitWrapper.id = 'rabbitWrapper';
document.body.appendChild(rabbitWrapper);
rabbitWrapper.appendChild(rabbit);

//_______________________________ CONSTANTES 
rabbitWrapper.speed = 7; // px / 32ms

//_______________________________ Style 
rabbitWrapper.style.position = "absolute";
rabbitWrapper.style.zIndex = "3";
rabbitWrapper.height = 40; // placeholder
rabbitWrapper.width = 40; // placeholder
rabbitWrapper.style.height = rabbitWrapper.height + 'px';
rabbitWrapper.style.width = rabbitWrapper.width + 'px';

//_______________________________ Position
rabbitWrapper.area = rabbitWrapper.height * rabbitWrapper.width;
//position at topLeft of sprite
rabbitWrapper.posY = 500;
rabbitWrapper.posX = 500;
rabbitWrapper.vel = 0; // in px / 32ms
rabbitWrapper.setNewCoord = function() {
    this.posY += rabbitWrapper.orientation[1] * this.vel;
    this.posX += rabbitWrapper.orientation[0] * this.vel;
}
rabbitWrapper.updatePosition = function() {
    this.setNewCoord();
    this.style.left = this.posX + 'px';
    this.style.top = this.posY + 'px';
}

//_______________________________ Handles oriention
rabbitWrapper.numOfDirections = 8;
rabbitWrapper.orientation = 0;
rabbitWrapper.orientationsIndex = 0;
// [[x, y],...] 16 directions starting at 0,1 (up) going clockwise
rabbitWrapper.orientationsArray = [];
rabbitWrapper.angleIncrement = 3600 / rabbitWrapper.numOfDirections;
for (let i = 0; i < (3600 / rabbitWrapper.angleIncrement); i++) {
    const angle = i * (rabbitWrapper.angleIncrement/10) * (Math.PI/180);
    rabbitWrapper.orientationsArray.push([Math.cos(angle), Math.sin(angle)]);
}
rabbitWrapper.orientation = rabbitWrapper.orientationsArray[rabbitWrapper.orientationsIndex];
rabbitWrapper.setOrientation = function() {
    this.orientation = this.orientationsArray[this.orientationsIndex];
}
// turns the rabbitWrapper (val * angleIncrement/10 degrees)
rabbitWrapper.changeOrientation = function(newIndex) {
    this.orientationsIndex = newIndex;
    this.setOrientation();
    //this.setSpriteOrientation(nextOrientationIndex);
}

console.log(rabbitWrapper.orientationsArray);

//_______________________________ Handles hitbox
rabbitWrapper.updateHitbox = function () {
    const middleX = this.posX + rabbitWrapper.width / 2; 
    const middleY = this.posY + rabbitWrapper.height / 2;

    let resultIndex;
    const nextOrientationIndex = (this.orientationsIndex + this.numOfDirections/4);
    if (nextOrientationIndex > (this.orientationsArray.length - 1)) {
        resultIndex = (nextOrientationIndex % this.orientationsArray.length);
    } else if (nextOrientationIndex < 0){
        resultIndex = this.orientationsArray.length + nextOrientationIndex;
    } else {resultIndex = nextOrientationIndex;}
    const perpDirection = this.orientationsArray[resultIndex];
    //[topLeft, topRight, bottomRight, bottomLeft]
    rabbitWrapper.hitboxPoints = 
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
rabbitWrapper.hitboxSegments = [];
rabbitWrapper.updateHitbox();

//___________________________________________ inputHandling
rabbitWrapper.stopsOnDirectionRelease = function (keyPressed) {
    let directionPressed = false;
    for (const key of Object.keys(keyPressed)) {
        if (keyPressed[key] === true && parseInt(key) > -1) {
            directionPressed = true;
            break;
        }
    }
    if (!directionPressed) {this.vel = 0;} 
}

rabbitWrapper.keydownHandler = function(keyPressed) {
    for (const key of Object.keys(keyPressed)) {
        if (!keyPressed[key]) {continue;}
        switch (key) {
            case '1' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(3);
                break;
            case '2' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(2);
                break;
            case '3' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(1);
                break;
            case '4' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(4);
                break;
            case '5' :
                break;
            case '6' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(0);
                break;
            case '7' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(5);
                console.log(rabbitWrapper.orientationsArray[this.orientationsIndex]);
                break;
            case '8' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(6);
                console.log(rabbitWrapper.orientationsArray[this.orientationsIndex]);
                break;
            case '9' :
                this.vel = rabbitWrapper.speed;
                rabbitWrapper.changeOrientation(7);
                console.log(rabbitWrapper.orientationsArray[this.orientationsIndex]);
                break;
            case 'd' : 
                //DEBUG !!!
                //rabbitWrapper.printHitbox();
                this.vel = 0;
                break;
        }
    }
}

export default rabbitWrapper;
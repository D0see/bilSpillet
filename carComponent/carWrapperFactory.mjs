import puff from "./puff.mjs";
import car from "./car.mjs";
import headlightFactory from "./headlightFactory.mjs";
import skidmarkFactory from "./skidmarksFactory.mjs";
import driftSparkFactory from "./driftSparkFactory.mjs";

import debugPointFactory from "../utils/debugPointFactory.mjs";

import {keyPressed} from "../utils/keyPressHandler.mjs";

const carWrapperFactory = () => {
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

    const leftSpark = driftSparkFactory(168 , false, 2);
    const rightSpark = driftSparkFactory(105, true, 0);
    carWrapper.appendChild(leftSpark);
    carWrapper.appendChild(rightSpark); 
    const driftSparks = [leftSpark, rightSpark];

    //_______________________________ CONSTANTES 
    const MAXSPEED = 9; // px / 32ms
    const MAXSKIDMARKS = 50;

    //_______________________________ Style 
    carWrapper.style.position = "absolute";
    carWrapper.style.zIndex = "10";
    carWrapper.height = 94; //voiture.png height
    carWrapper.width = 200; //voiture.png width
    carWrapper.style.height = carWrapper.height + 'px';
    carWrapper.style.width = carWrapper.width + 'px';

    //_______________________________ Position
    carWrapper.area = carWrapper.height * carWrapper.width;
        //position at topLeft of sprite
    carWrapper.posY = 0;
    carWrapper.posX = 0;
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
    carWrapper.numOfDirections = 32;
    carWrapper.orientation = 0;
    carWrapper.orientationsIndex = 0;
    // [[x, y],...] 16 directions starting at 0,1 (up) going clockwise
    carWrapper.orientationsArray = [];
    carWrapper.angleIncrement = 3600 / carWrapper.numOfDirections;
    for (let i = 0; i < (3600 / carWrapper.angleIncrement); i++) {
        const angle = i * (carWrapper.angleIncrement/10) * (Math.PI/180);
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

    //_______________________________ handles hitbox
    carWrapper.updateHitbox = function () {
        const middleX = this.posX + carWrapper.width / 2; 
        const middleY = this.posY + carWrapper.height / 2;

        let resultIndex;
        const nextOrientationIndex = (this.orientationsIndex + this.numOfDirections/4);
        if (nextOrientationIndex > (this.orientationsArray.length - 1)) {
            resultIndex = (nextOrientationIndex % this.orientationsArray.length);
        } else if (nextOrientationIndex < 0){
            resultIndex = this.orientationsArray.length + nextOrientationIndex;
        } else {resultIndex = nextOrientationIndex;}
        const perpDirection = this.orientationsArray[resultIndex];
        //[topLeft, topRight, bottomRight, bottomLeft]
        carWrapper.hitboxPoints = 
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
    carWrapper.hitboxSegments = [];
    carWrapper.updateHitbox();


    // DEBUG !!!
    carWrapper.printHitbox = function() {
        for (const point of this.hitboxPoints) {
            debugPointFactory(point[0], point[1], 'red');
        }
        debugPointFactory(this.posX, this.posY, 'green  ');
        
    }


    //_______________________________ handles animations
    carWrapper.setSpriteOrientation = function() {
        carWrapper.style.transform = `rotate(${this.orientationsIndex*Math.round(360/carWrapper.numOfDirections)}deg)`;
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

        //handles driftSparks
    carWrapper.driftSparksHandler = function() {
        driftSparks.forEach(spark => {
            if (keyPressed["f"] && this.vel > 3 && spark.style.opacity === "0") {
                spark.style.opacity = '1';
                spark.style.animation = "0.10s linear spark-appears";
            } else if (!keyPressed["f"] || this.vel <= 3) {
                spark.style.opacity = '0';
                spark.style.animation = "";
            } 
        });
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
        carWrapper.driftSparksHandler();
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
                case 'f' : // used to be space but up-left-space js bug
                    carWrapper.vel = Math.max(Math.round(carWrapper.vel /1.15 - 0.6), 0);
                    carWrapper.skidMarkHandler();
                    break;
                case 'h' :
                    carWrapper.headlightHandler();
                    break;
                case 'd' : 
                    //DEBUG !!!
                    carWrapper.printHitbox();
                    break;
            }
        }
    }
    return carWrapper;
}

export default carWrapperFactory;

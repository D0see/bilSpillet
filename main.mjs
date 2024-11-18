import carWrapper from "./carComponent/carWrapper.mjs";
import debugPointFactory from "./carComponent/debugPointFactory.mjs";
//Game Logic
document.body.appendChild(carWrapper);

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
}, 16)

setInterval( () => {
    carWrapper.keydownHandler(keyPressed);
    carWrapper.animationsHandler();
}, 80)


//Debug

const testPoints = [[50,50],[200, 200],[600,600],[400,300]];
for (const point of testPoints) {
    debugPointFactory(point[0], point[1], 'orange');
}


const calculateTriangleArea = (p1, p2, p3) => {
    return 1/2 * Math.abs((p1[0]*(p2[1] - p3[1]) + p2[0]*(p3[1] - p1[1]) + p3[0]*(p1[1] - p2[1])));
}


const pairs = [[carWrapper.hitboxPoints[0], carWrapper.hitboxPoints[carWrapper.hitboxPoints.length - 1]]];
for (let i = 1; i < carWrapper.hitboxPoints.length; i++) {
    pairs.push([carWrapper.hitboxPoints[i - 1], carWrapper.hitboxPoints[i]]);
}
console.log(pairs);

console.log("carArea = ", carWrapper.area);

for (const point of testPoints) {
    let totalArea = 0;
    pairs.forEach(pair => {
        totalArea += calculateTriangleArea(point, pair[0], pair[1]);
    })
    console.log("totalArea = ", totalArea)
}
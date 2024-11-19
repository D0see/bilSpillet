import debugPointFactory from "./debugPointFactory.mjs";

const testPoints = [[200, 200],[600,600],[400,300]];
for (const point of testPoints) {
    debugPointFactory(point[0], point[1], 'orange');
}

export default testPoints;
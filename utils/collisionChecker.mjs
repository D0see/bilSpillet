const collisionChecker = (obj, pointToCheck, tolerance = 0.005) => {
    const calculateTriangleArea = (p1, p2, p3) => {
        return 1/2 * Math.abs((p1[0]*(p2[1] - p3[1]) + p2[0]*(p3[1] - p1[1]) + p3[0]*(p1[1] - p2[1])));
    }
    
    let totalArea = 0;
    obj.hitboxSegments.forEach(segment => {
        totalArea += calculateTriangleArea(pointToCheck, segment[0], segment[1]);
    })
    return (Math.trunc(totalArea) >= Math.trunc(obj.area) - Math.trunc(obj.area)*tolerance &&
            Math.trunc(totalArea) <= Math.trunc(obj.area) + Math.trunc(obj.area)*tolerance);  
}

export default collisionChecker;


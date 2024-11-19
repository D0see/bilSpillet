const driftpointFactory = (left, top, color) => {
    const point = document.createElement('div');
    document.body.appendChild(point);
    //Style
    point.height = 5; // point.png height 
    point.width = 5; // point.png width 
    point.style.position = "absolute";
    point.style.height = point.height + 'px';
    point.style.width = point.width + 'px';
    point.style.left = left + "px";
    point.style.top = top + "px";

    //Sprite
    point.style.opacity = '1';
    point.style.backgroundColor = color;
    return point;
}

export default driftpointFactory;
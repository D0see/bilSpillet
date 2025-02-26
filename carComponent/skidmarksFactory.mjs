const getRotation = (string) => {
    let firstIndex = string.indexOf("(");
    let lastIndex = string.indexOf(")");
    return string.slice(firstIndex + 1, lastIndex - 3);
}

const skidmarkFactory = (posX, posY, rotation) => {
    const skidmark = document.createElement('div');
    document.getElementById("gameWindow").appendChild(skidmark);

    //Style
    skidmark.height = 79; //voiture.png height
    skidmark.width = 194; //voiture.png width 
    skidmark.style.position = "absolute";
    skidmark.style.height = skidmark.height + 'px';
    skidmark.style.width = skidmark.width + 'px';
    skidmark.style.left = `${posX}px`;
    skidmark.style.top = `${posY}px`;

    skidmark.style.zIndex = "0";

    skidmark.style.transform = `rotate(${parseInt(getRotation(rotation))}deg)`;
    //Graphics
    skidmark.style.backgroundImage = 'url(carComponent/skidMarks.png)';
    skidmark.style.opacity = '0.6';


    return skidmark;
}

export default skidmarkFactory;
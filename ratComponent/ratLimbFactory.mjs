const ratLimbFactory = (src, id) => {
    const ratLimb = document.createElement('div');
    ratLimb.id = id;
    //Style
    ratLimb.height = 60; //rat height
    ratLimb.width = 141; //rat length
    ratLimb.style.position = "absolute";
    ratLimb.style.height = ratLimb.height + 'px';
    ratLimb.style.width = ratLimb.width + 'px';
    ratLimb.style.bottom = "0px";
    ratLimb.style.right = "5px"

    ratLimb.style.zIndex = "1";

    //Sprite
    ratLimb.style.backgroundImage = `url(./ratComponent/${src})`;
    return ratLimb;
}

export default ratLimbFactory;
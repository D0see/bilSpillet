const headLightFactory = (id, left, top) => {
    const headLight = document.createElement('div');
    headLight.id = id;

    //Style
    headLight.height = 125; 
    headLight.width = 125; 
    headLight.style.position = "absolute";
    headLight.style.height = headLight.height + 'px';
    headLight.style.width = headLight.width + 'px';
    headLight.style.left = left + "px";
    headLight.style.top = top + "px";
    headLight.style.transform = "rotate(45deg)"

    headLight.style.zIndex = "2";
    headLight.style.opacity = "0";

    //Graphics
    headLight.style.background = "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(255,253,123,1) 0%, rgba(255,255,255,0) 40%,rgba(255,255,255,0) 100%)";
    headLight.style.borderTopLeftRadius = '50%';
    headLight.style.borderTopRightRadius = '65%';
    headLight.style.borderBottomRightRadius = '50%';
    
    return headLight;
}

export default headLightFactory;
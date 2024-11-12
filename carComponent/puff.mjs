const puff = document.createElement('div');
puff.id = "puff";

//Style
puff.height = 35; //puff.png height
puff.width = 50; //puff.png width
puff.style.height = puff.height + "px";
puff.style.width = puff.width + "px";
puff.style.position = "relative";
puff.style.right = "50px";
puff.style.bottom = "45px";

puff.isHidden = true;

puff.style.zIndex = "-1";
//Sprite
puff.style.backgroundImage = "";

//Transition 

export default puff;
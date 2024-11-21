const ratFactory = (src) => {
    const rat = document.createElement('div');
    rat.id = "rat";

    //Style
    rat.style.position = "relative";
    rat.height = 60; //placeholder
    rat.width = 141; //placeholder
    rat.style.height = rat.height + 'px';
    rat.style.width = rat.width + 'px';
    rat.style.zIndex = "2";

    //Sprite
    rat.style.backgroundImage = '';

    //placeholder
    rat.style.backgroundImage = src;
    return rat;
}



export default ratFactory;
const rabbit = document.createElement('div');
rabbit.id = "rabbit";

//Style
rabbit.style.position = "relative";
rabbit.height = 60; //placeholder
rabbit.width = 141; //placeholder
rabbit.style.height = rabbit.height + 'px';
rabbit.style.width = rabbit.width + 'px';
rabbit.style.zIndex = "2";

//Sprite
rabbit.style.backgroundImage = '';

//placeholder
rabbit.style.backgroundImage = 'url(rabbitComponent/ratbody.png)';

export default rabbit;
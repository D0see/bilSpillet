const rabbit = document.createElement('div');
rabbit.id = "rabbit";

//Style
rabbit.style.position = "relative";
rabbit.height = 50; //placeholder
rabbit.width = 60; //placeholder
rabbit.style.height = rabbit.height + 'px';
rabbit.style.width = rabbit.width + 'px';
rabbit.style.zIndex = "1";

//Sprite
rabbit.style.backgroundImage = '';

//placeholder
rabbit.style.backgroundImage = 'url(rabbitComponent/rabbit.png)';

export default rabbit;
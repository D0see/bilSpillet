const car = document.createElement('div');
car.id = "car";

//Style
car.style.position = "relative";
car.height = 79; //voiture.png height
car.width = 195; //voiture.png width
car.style.height = car.height + 'px';
car.style.width = car.width + 'px';
car.style.zIndex = "1";

//Sprite
car.style.backgroundImage = 'url(carComponent/voiture.png)';

export default car;
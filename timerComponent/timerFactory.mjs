const timerFactory = () => {
    const timer = document.createElement('div');
    timer.value = 0;
    timer.innerText = `${timer.value}`;
    timer.id = 'timer';
    //Style
    timer.style.textAlign = "center";

    timer.style.fontSize = '4vh'

    timer.height = 200;
    timer.width = 500;
    timer.style.left = `calc(50vw - ${timer.width / 2}px)`;
    timer.style.top = '2vh'
    timer.style.position = "absolute";
    timer.style.height = timer.height + 'px';
    timer.style.width = timer.width + 'px';
    timer.style.bottom = "0px";
    timer.style.right = "0px";
    timer.style.zIndex = "10";

    timer.setInnerText = function() {
        timer.innerText = `${timer.value}`;
    }
    timer.setInnerText();
    timer.updateTimer = function(val) {
        this.value += val;
        this.setInnerText();
    }

    timer.stop = function() {
        timer.updateTimer = function() {

        }
    }



    return timer;
}

export default timerFactory;
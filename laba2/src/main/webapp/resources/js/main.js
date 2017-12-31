(function() {
    function setPixel(x, y) {
        var point = document.createElement('div');
        point.className = "point";
        point.style.left = x+"px";
        point.style.top = y+"px";
        document.getElementById("plan").appendChild(point);
    }
    function handleCheckInput(event) {
        if (event.target.value === '-') {
            return;
        }
        var value = parseInt(event.target.value) || 0;
        if (!value) {
            console.log("value is not number");
            this.value = "";
        } else if (value > 5 && value < -5) {
                this.value = "";
        }
    }
    function handleClick(event) {
        var imagePointer = document.getElementById("area-image");
        var imageW = imagePointer.width;
        var imageH = imagePointer.height;

        var pageX = event.layerX;
        var pageY = event.layerY;
        setPixel(pageX, pageY);

        console.log("x = ", event.offsetX, " y = ", event.offsetY, " imageH", imageH, " imageW", imageW);
    }
    document.getElementById("y-cord-input").addEventListener('input', handleCheckInput, false);
    document.getElementById("area-image").addEventListener('click', handleClick, false);
})();
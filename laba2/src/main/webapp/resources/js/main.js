(function() {
    var isMinus = false;
    function handleCheckInput(event) {
        if (event.target.value == "-") {
            return;
        }
        var value = parseInt(this.value) || 0;
        if (!value) {
            console.log("value is not number");
            this.value = "";
        } else if (value > 3 || value < -5) {
                this.value = "";
        }
    }
    function handleClick(event) {
        var imagePointer = document.getElementById("area-image");
        var imageW = imagePointer.width;
        var imageH = imagePointer.height;
        var pageX = event.layerX;
        var pageY = event.layerY;

        _setPixel(pageX, pageY, false);
    }
    function _setPixel(x, y, isHitting) {
        var point = document.createElement('div');
        point.className = "point";
        point.style.left = x+"px";
        point.style.top = y+"px";
        point.style.backgroundColor = isHitting ? "green" : "red";
        document.getElementById("plan").appendChild(point);
    }
    document.getElementById("y-cord-input").addEventListener('input', handleCheckInput, false);
    document.getElementById("area-image").addEventListener('click', handleClick, false);
})();
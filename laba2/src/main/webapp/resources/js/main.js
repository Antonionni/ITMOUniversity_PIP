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
    function handleImageClick(event) {
        var imagePointer = document.getElementById("area-image");
        var imageW = imagePointer.width;
        var imageH = imagePointer.height;
        var pageX = event.layerX;
        var pageY = event.layerY;

        var rParams = _getRParams();

        _sendParams(event.offsetX, event.offsetY, rParams, function(xhr) {
            // TODO read server response
            _setPixel(pageX, pageY, xhr.status == 200);
        });
    }
    function handleButtonClick() {
        // get x value
        var xValue = 0;

        var i = 0;
        var radioButtonNodes = document.getElementsByClassName("radio-input");
        for (; i <= radioButtonNodes.length; i++) {
            var radioButtonRef =radioButtonNodes[i];
            if (radioButtonRef && radioButtonRef.checked) {
                xValue = parseInt(radioButtonRef.value);
                break;
            }
        }
        // get r value
        var rValues = _getRParams();
        // get y value
        var yValue = parseInt(document.getElementById("y-cord-input").value);

        _sendParams(xValue, yValue, rValues, function (xhr) {
            xhr.read();
        })
    }
    function _setPixel(x, y, isHitting) {
        var point = document.createElement('div');
        point.className = "point";
        point.style.left = x+"px";
        point.style.top = y+"px";
        point.style.backgroundColor = isHitting ? "green" : "red";
        document.getElementById("plan").appendChild(point);
    }
    function _sendParams(currentX, currentY, currentR, callBack) {
        var req = new XMLHttpRequest();
        req.open('POST', '/laba2_Web_exploded/ControllerServlet', true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            xValue: currentX,
            yValue: currentY,
            rValues: currentR
        }));

        req.onreadystatechange = callBack.bind(this, req);
    }
    function _getRParams() {
        var rCheckboxNodes = document.getElementsByClassName("box-input");
        var tmpRValuesArray = [];

        var i = 0;
        for (; i < rCheckboxNodes.length; i++) {
            var checkBoxRef = rCheckboxNodes[i];
            if (checkBoxRef && checkBoxRef.checked) {
                tmpRValuesArray.push(parseInt(checkBoxRef.value));
            }
        }
        return tmpRValuesArray;
    }

    function _calculatePixelPosition(currentX, currentY) {

    }
    document.getElementById("y-cord-input").addEventListener('input', handleCheckInput, false);
    document.getElementById("area-image").addEventListener('click', handleImageClick, false);
    document.getElementById("button").addEventListener('click', handleButtonClick, false);
})();
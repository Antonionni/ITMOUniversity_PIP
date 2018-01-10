(function() {
    var isMinus = false;
    const constants = {
        minInputValue: -5,
        maxInputValue: 3,
        imageSize: 210,
        pixelInRValue: 84,
        httpReadyState: 4,
        httpOkStatus: 200,
        httpRequestURL: '/laba2_war_exploded/ControllerServlet',
    };
    function handleCheckInput(event) {
        if (event.target.value == "-") {
            return;
        }
        var value = parseInt(this.value) || 0;
        if (!value) {
            console.log("value is not number");
            this.value = "";
        } else if (value > constants.maxInputValue || value < constants.minInputValue) {
                this.value = "";
        }
    }
    function handleImageClick(event) {
        var pageX = event.layerX;
        var pageY = event.layerY;

        var rParams = _getRParams();

        var resultPoint = _convertAbsoluteXYtoRelaitive(event.offsetX, event.offsetY);
        console.log("x = ", resultPoint.x, " y=", resultPoint.y);
        _sendParams(resultPoint.x, resultPoint.y, rParams, function(xhr) {
            if (xhr.readyState === constants.httpReadyState) {
                console.log(JSON.parse(xhr.responseText));
                _setPixel(pageX, pageY, xhr.status == constants.httpOkStatus);
            }
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
            console.log(JSON.parse(xhr.responseText));
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
        req.open('POST', constants.httpRequestURL, true);
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

    function _convertAbsoluteXYtoRelaitive(currentX, currentY) {
        function convertCoordinate(cord) {
            if (cord <= constants.imageSize) {
                return -(constants.imageSize / 2 - cord);
            }
            return cord - constants.imageSize / 2;
        }
        var pixelPoint = {
            x: Math.ceil(convertCoordinate(currentX) / 84),
            y: Math.ceil(convertCoordinate(currentY) / 84)
        };
        debugger;
        return pixelPoint;
    }
    document.getElementById("y-cord-input").addEventListener('input', handleCheckInput, false);
    document.getElementById("area-image").addEventListener('click', handleImageClick, false);
    document.getElementById("button").addEventListener('click', handleButtonClick, false);
})();
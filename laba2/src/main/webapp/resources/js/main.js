(function() {
    var isMinus = false;
    const constants = {
        minInputValue: -5,
        maxInputValue: 3,
        imageSize: 210,
        pixelInRValue: 80,
        pointOffset: 3,
        httpReadyState: 4,
        httpOkStatus: 200,
        httpRequestURL: '/laba2_war_exploded/AreaCheckServlet',
        notifyTimeout: 3000
    };
    function handleCheckInput(event) {
        if (event.target.value == "-") {
            return;
        }
        var value = parseInt(this.value) || 0;
        if (value === undefined) {
            console.log("value is not number");
            this.value = "";
        } else if (value > constants.maxInputValue || value < constants.minInputValue) {
                this.value = "";
        }
    }
    function handleImageClick(event) {
        var pageX = event.layerX;
        var pageY = event.layerY;

        console.log("x = ", pageX, " pageY = ", pageY);
        var rValue = _getRValue();
        if (!rValue) {
            _sendError();
            return;
        }
        var relativePoint = _convertAbsoluteXYtoRelative(event.offsetX, event.offsetY, rValue);

        console.log("xValue = ", relativePoint.x, "yValue = ", relativePoint.y, " rValue = ", rValue);
        _sendParams(relativePoint.x, relativePoint.y, rValue, function(xhr) {
            if (xhr.readyState === constants.httpReadyState) {
                var data = JSON.parse(xhr.responseText);
                _setPixel(pageX, pageY, data.isHitting);
            }
        });
    }
    function handleButtonClick() {
        // get x value
        var xValue = 0;

        var i = 0;
        var radioButtonNodes = document.getElementsByClassName("radio-input");
        for (; i <= radioButtonNodes.length; i++) {
            var radioButtonRef = radioButtonNodes[i];
            if (radioButtonRef && radioButtonRef.checked) {
                xValue = parseInt(radioButtonRef.value);
                break;
            }
        }
        // get r value
        var rValue = _getRValue();
        if (!rValue) {
            _sendError();
            return;
        }

        // get y value
        var yValue = parseInt(document.getElementById("y-cord-input").value);

       var absolutePoint = _convertRelativeXYtoAbsolute(xValue, yValue, rValue);

        _sendParams(xValue, yValue, rValue, function (xhr) {
            if (xhr.readyState === constants.httpReadyState) {
                var data = JSON.parse(xhr.responseText);
                _setPixel(absolutePoint.x, absolutePoint.y, data.isHitting);
            }
        });
    }
    function _setPixel(x, y, isHitting) {
        var point = document.createElement('div');
        point.className = "point";
        point.style.left = (x - constants.pointOffset) + "px";
        point.style.top = (y - constants.pointOffset) + "px";
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
            rValue: currentR
        }));

        req.onreadystatechange = callBack.bind(this, req);
    }
    function _getRValue() {
        var rCheckboxNodes = document.getElementsByClassName("box-input");
        var i = 0;
        for (; i < rCheckboxNodes.length; i++) {
            var checkBoxRef = rCheckboxNodes[i];
            if (checkBoxRef && checkBoxRef.checked) {
                return parseInt(checkBoxRef.value);
            }
        }
    }

    function _convertAbsoluteXYtoRelative(currentX, currentY, currentR) {
        function convertCoordinate(cord) {
            if (cord <= constants.imageSize) {
                return -(constants.imageSize / 2 - cord);
            }
            return cord - constants.imageSize / 2;
        }
        var pixelPoint = {
            x: convertCoordinate(currentX) / 84 * currentR,
            y: - convertCoordinate(currentY) / 84 * currentR
        };
        return pixelPoint;
    }

    function _convertRelativeXYtoAbsolute(currentX, currentY, currentR) {
        var planNode = document.getElementById("plan");
        var baseX = planNode.offsetLeft;
        var baseY = planNode.offsetTop;

        // set point to plan zero
        baseX += constants.imageSize / 2;
        baseY += constants.imageSize / 2;

        var divisionValue = constants.pixelInRValue / currentR;
        return {
            x: baseX + divisionValue * currentX,
            y: baseY - divisionValue * currentY
        }
    }

    function _sendError() {
        // check is notify message exist
        if (document.getElementById("error-notify")) {
            return;
        }
        var mainWrapperNode = document.getElementById("main-wrapper");
        var errorNotifyNode = document.createElement("div");
        errorNotifyNode.id = "error-notify";
        errorNotifyNode.innerText = "Parameter R is undefined!";
        errorNotifyNode.addEventListener('click', handleClickErrorNotify, false);
        mainWrapperNode.appendChild(errorNotifyNode);

        setTimeout(function () {
            document.getElementById("error-notify").remove();
        }, constants.notifyTimeout);
    }
    function handleClickErrorNotify() {
        var errorNotifyNode = document.getElementById("error-notify");
        if (errorNotifyNode) {
            errorNotifyNode.remove();
        }
    }
    function handleBoxClick(index, checkboxNodes) {
        var i = 0;
        var lastBoxValue = 0;
        for (; i < checkboxNodes.length; i++) {
            if (checkboxNodes[i].checked) {
                checkboxNodes[i].checked = false;
                lastBoxValue = parseInt(checkboxNodes[i].value);
            }
        }
        checkboxNodes[index].checked = true;

        var pointNodes = document.getElementsByClassName("point");
        i = 0;
        for (; i < pointNodes.length; i++) {
            var currentValueX = pointNodes[i].offsetLeft;
            var currentValueY = pointNodes[i].offsetTop;
            var relativePoint = _convertAbsoluteXYtoRelative(currentValueX, currentValueY, lastBoxValue);

            pointNodes[i].remove();
            
            var absolutePoint = _convertRelativeXYtoAbsolute(relativePoint.x, relativePoint.y, index);
            _setPixel(absolutePoint.x, absolutePoint.y);
        }

    }
    document.getElementById("y-cord-input").addEventListener('input', handleCheckInput, false);
    document.getElementById("area-image").addEventListener('click', handleImageClick, false);
    document.getElementById("button").addEventListener('click', handleButtonClick, false);

    (function() {
        var checkboxNodes = document.getElementsByClassName("box-input");
        var i = 0;
        for (;i < checkboxNodes.length; i++) {
            checkboxNodes[i].addEventListener('click', handleBoxClick.bind(this, i, checkboxNodes), false);
        }
    })();
})();
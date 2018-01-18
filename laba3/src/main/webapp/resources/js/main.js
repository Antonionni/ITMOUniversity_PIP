(function() {
    const constants = {
        minInputValue: -5,
        maxInputValue: 3,
        imageSize: 215,
        pixelInRValue: 80,
        pointOffset: 3,
        httpReadyState: 4,
        httpOkStatus: 200,
        notifyTimeout: 3000
    };
    function handleImageClick(event) {
        var rValue = document.getElementById("r-value").value;
        var relativePoint = _convertAbsoluteXYtoRelative(event.offsetX, event.offsetY, rValue);

        document.getElementById("y-value").value = relativePoint.y;
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
        debugger;
        var i = 0;
        for (; i < rCheckboxNodes.length; i++) {
            var checkBoxRef = rCheckboxNodes[i];
            if (checkBoxRef && checkBoxRef.checked) {
                return parseInt(checkBoxRef.value);
            }
        }
    }

    function setXValue(value) {

    }

    function _convertAbsoluteXYtoRelative(currentX, currentY, currentR) {
        function convertCoordinate(cord) {
            if (cord <= constants.imageSize) {
                return -(constants.imageSize / 2 - cord);
            }
            return cord - constants.imageSize / 2;
        }
        var pixelPoint = {
            x: convertCoordinate(currentX) / constants.pixelInRValue * currentR,
            y: - convertCoordinate(currentY) / constants.pixelInRValue * currentR
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
            x: Math.round(baseX + divisionValue * currentX),
            y: Math.round(baseY - divisionValue * currentY)
        }
    }

    function handleBoxClick(index, checkboxNodes, event) {
        var i = 0;
        for (; i < checkboxNodes.length; i++) {
            if (checkboxNodes[i].checked) {
                checkboxNodes[i].checked = false;
            }
        }
        checkboxNodes[index].checked = true;
    }

    document.getElementById("area-image").addEventListener('click', handleImageClick, false);

    (function() {
        var checkboxNodes = document.getElementsByClassName("box-input");
        var i = 0;
        for (;i < checkboxNodes.length; i++) {
            checkboxNodes[i].addEventListener('change', handleBoxClick.bind(this, i, checkboxNodes), false);
        }
    })();
})();
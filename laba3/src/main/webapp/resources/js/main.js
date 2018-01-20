(function() {
    const constants = {
        minInputValue: -5,
        maxInputValue: 3,
        imageSize: 215,
        pixelInRValue: 80,
        pointOffset: 3,
        httpReadyState: 4,
        httpOkStatus: 200
    };
    function handleImageClick(event) {
        var rValueStr = document.getElementById("settings-form:r-value").value;
        var rValue = parseFloat(rValueStr);
        var relativePoint = _convertAbsoluteXYtoRelative(event.offsetX, event.offsetY, rValue);

        _setXValue(relativePoint.x);
        document.getElementById("settings-form:y-value").value = relativePoint.y.toFixed(2);
        document.getElementById("settings-form:y-value").click();
        // document.getElementById("settings-form:command-button").click();
        // _setPixel(event.layerX, event.layerY, true);
    }

    function _setPixel(x, y, isHitting) {
        debugger;
        var point = document.createElement('div');
        point.className = "point";
        point.style.left = (x - constants.pointOffset) + "px";
        point.style.top = (y - constants.pointOffset) + "px";
        point.style.backgroundColor = isHitting ? "green" : "red";
        document.getElementById("plan").appendChild(point);
    }

    function _setXValue(value) {
        var realValue = parseFloat(Math.round(value).toFixed(1));
        var rCheckboxNodes = document.getElementsByName("settings-form:box-input");
        var i = 0;

        for (; i < rCheckboxNodes.length; i++) {
            var checkBoxRef = rCheckboxNodes[i];
            if (parseFloat(checkBoxRef.value) == realValue) {
                checkBoxRef.checked = true;
                checkBoxRef.click();
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
        var checkboxNodes = document.getElementsByName("settings-form:box-input");
        var i = 0;
        for (;i < checkboxNodes.length; i++) {
            checkboxNodes[i].checked = false;
            checkboxNodes[i].addEventListener('change', handleBoxClick.bind(this, i, checkboxNodes), false);
        }
    })();
})();
(function() {
    const constants = {
        imageSize: 215,
        pixelInRValue: 80,
        pointOffset: 3,
    };
    function handleImageClick(event) {
        var rValueStr = document.getElementById("settings-form:r-value").value;
        var rValue = parseFloat(rValueStr);
        var relativePoint = _convertAbsoluteXYtoRelative(event.offsetX, event.offsetY, rValue);

        _setXValue(relativePoint.x);
        document.getElementById("settings-form:y-value").value = relativePoint.y.toFixed(2);
        document.getElementById("settings-form:y-value").click();

        document.getElementById("settings-form:command-button").click();
    }

    function _setPixel(x, y, isHitting) {
        var planNode = document.getElementById("plan");
        var baseX = planNode.offsetLeft;
        var baseY = planNode.offsetTop;

        var pointXPosition = x - constants.pointOffset;
        var pointYPosition = y - constants.pointOffset;

        if (pointXPosition > baseX + constants.imageSize) {
            pointXPosition =  baseX + constants.imageSize;
        } else if (pointXPosition < 0) {
            pointXPosition = 0;
        }
        if (pointYPosition > baseY + constants.imageSize) {
            pointYPosition = baseX + constants.imageSize;
        } else if (pointYPosition < 0) {
            pointYPosition = 0;
        }

        var point = document.createElement('div');
        point.className = "point";
        point.style.left = pointXPosition + "px";
        point.style.top = pointYPosition + "px";
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

    function handleRValueChanged(event) {
        if (resultArray.length !== 0) {
            var i = 0;
            var changedResultArray = []
            for (; i < resultArray.length; i++) {
                changedResultArray.push({
                    xValue: resultArray[i].xValue,
                    yValue: resultArray[i].yValue,
                    rValue: parseFloat(event.target.value)
                });
            }
            var hiddenInputNode = document.getElementById("hiddenInput");
            if (hiddenInputNode) {
                hiddenInputNode.value = JSON.stringify(changedResultArray);
                document.getElementById("sendManyParamsForm:changeRValueButton").click();
            }
        }
    }
    document.getElementById("area-image").addEventListener('click', handleImageClick, false);
    document.getElementById("settings-form:r-value").addEventListener('change', handleRValueChanged, this);
    (function () {
        var i = 0;
        for (; i < resultArray.length; ++i) {
            var absolutePoint = _convertRelativeXYtoAbsolute(resultArray[i].xValue, resultArray[i].yValue, resultArray[i].rValue);
            _setPixel(absolutePoint.x, absolutePoint.y, resultArray[i].isHitting);
        }
    })();
    (function() {
        var checkboxNodes = document.getElementsByName("settings-form:box-input");
        var i = 0;
        for (;i < checkboxNodes.length; i++) {
            checkboxNodes[i].addEventListener('click', handleBoxClick.bind(this, i, checkboxNodes), false);
        }
    })();
})();
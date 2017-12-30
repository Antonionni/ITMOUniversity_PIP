(function() {
    function check(event) {
        var value = parseInt(event.target.value) || 0;
        if (!value) {
            console.log("value is not number");
            this.value = "";
        } else if (value > 5 || value < -5)
            if (value > 5 || value < -5) {
                this.value = "";
            }
    }

    document.getElementById('x-cord-input').addEventListener('input', check, false);
    document.getElementById("y-cord-input").addEventListener('input', check, false);
})();
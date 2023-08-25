(function () {
    [SHOOT_DELAY, BULLET_SPEED, GRAVITY, TANK_FORWARD_SPEED] = [0.01, 160, 15, 80];
    tanks[0].health = Infinity;
    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        console.error("hacks are working");
        if (event.ctrlKey && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
            console.error("switch mode");
            if (tanks[0].hasBeenPlane) {
                tanks[0].isPlane = !tanks[0].isPlane;
            } else {
                makePlane(tanks[0]);
            }
            return;
        };
        if (event.shiftKey && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
            console.error("velocity hacks");
            tanks[0].accl = [0, 0, 0];
            tanks[0].vel = [0, 0, 0];
            return;
        };
    });
})()
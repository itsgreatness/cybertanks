(function () {
    [SHOOT_DELAY, BULLET_SPEED, GRAVITY, TANK_FORWARD_SPEED, BULLET_LIFE, tanks[0].health] = [-1, 160, 15, 80, 999, 1 / 0];
    const [DT_DELAY, TARGETS] = [300, 1];
    const { sin, cos, PI, sqrt, atan2 } = Math;
    function dist(x1, y1, x2, y2) {
        return sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    }
    function directionToPoint(x1, y1, x2, y2) {
        return atan2(y2 - y1, x2 - x1) + (y2 < y1 ? PI : 0);
    }
    function pointToATank() {
        const targets = tanks.filter(function (t, idx) {
            return t.pos && t.health < 1 / 0 && !t.isPlane && t.pos[1] === 0 && (t.vel[0] + t.vel[2]) < 1 && idx > 0
        }).sort(function (t1, t2) {
            return dist(tanks[0].pos[0], t1.pos[0], tanks[0].pos[2] - t1.pos[2]) - dist(tanks[0].pos[0], t2.pos[0], tanks[0].pos[2] - t2.pos[2])
        });
        for (let i = 0; i < TARGETS; i++) {
            const target = targets.at(i);
            if (!target) continue;
            tanks[0].pos = [target.pos[0] + .08 * BULLET_SPEED * sin(target.rot + PI), target.pos[1], target.pos[2] + .08 * BULLET_SPEED * cos(target.rot + PI)];
            tanks[0].rot = directionToPoint(tanks[0].pos[0], tanks[0].pos[2], target.pos[0], target.pos[2]);
            entities.push(createBullet(tanks[0], -1));
            entities.push(createBullet(tanks[0], 1));
            const t = Date.now();
            while (Date.now() - t < 1000 && target.pos) {
                tanks[0].rot = directionToPoint(tanks[0].pos[0], tanks[0].pos[2], target.pos[0], target.pos[2]);
            }
        }
    }
    tanks[0].left = function () {
        tanks[0].rotv = .1;
    }
    let t = 0;
    let shadowFurry = 0;
    addEventListener("keydown", function (e) {
        if (e.key.includes("Arrow")) this.clearInterval(shadowFurry);
        console.error("hacks are working");
        if (e.ctrlKey && !e.repeat) {
            console.error("switch mode");
            if (tanks[0].hasBeenPlane) {
                tanks[0].isPlane = !tanks[0].isPlane
            } else {
                makePlane(tanks[0])
            }
            return;
        }
        if (e.shiftKey && !e.repeat) {
            if (Date.now() - t < DT_DELAY) {
                console.error("shadow furry");
                this.clearInterval(shadowFurry);
                shadowFurry = this.setTimeout(pointToATank);
            }
            t = Date.now();
            console.error("velocity hacks");
            tanks[0].vel[0, 0, 0];
            return;
        }
    }, true);
})()
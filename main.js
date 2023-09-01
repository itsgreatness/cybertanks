(function () {
    const { sin, cos, PI, sqrt, atan2 } = Math;
    const dist = (x1, y1, x2, y2) => sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    const aim = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1) + (y2 < y1 ? PI : 0);
    [SHOOT_DELAY, BULLET_SPEED, GRAVITY, TANK_FORWARD_SPEED, BULLET_LIFE] = [0, 160, 15, 80, 999];
    tanks[0].health = Infinity;
    const DT_DELAY = 300;
    const TARGETS = 1;
    let t = 0;
    tanks[0].left = function () {
        tanks[0].rotv = 0.1;
    }
    let newProcessStarting = false;
    window.addEventListener('keydown', async function (event) {
        event.preventDefault();
        console.error("hacks are working");
        if (event.ctrlKey && !event.repeat) {
            console.error("switch mode");
            if (tanks[0].hasBeenPlane) {
                tanks[0].isPlane = !tanks[0].isPlane;
            } else {
                makePlane(tanks[0]);
            }
            return;
        }
        if (event.shiftKey && !event.repeat) {
            if (Date.now() - t < DT_DELAY) {
                newProcessStarting = true;
                console.error("shadow furry");
                const MY_X = tanks[0].pos[0];
                const MY_Z = tanks[0].pos[1];
                const targets = tanks.filter(
                    // filter out invincible, flying, just spawned, self, too far
                    (tank, idx) => tank.pos && tank.health < Infinity && !tank.isPlane && tank.vel[1] > -1 && idx > 0/* && dist(MY_X, tank.pos[0], MY_Z, tank.pos[2]) <= 12*/
                ).sort(
                    // sort by distance
                    (tank1, tank2) => dist(MY_X, tank1.pos[0], MY_Z, tank1.pos[2]) - dist(MY_X, tank2.pos[0], MY_Z, tank2.pos[2])
                );
                newProcessStarting = false;
                for (let i = 0; i < TARGETS; i++) {
                    const target = targets.at(i);
                    let DIST_FROM_TARGET = 0.08 * BULLET_SPEED;
                    tanks[0].pos = [target.pos[0] + DIST_FROM_TARGET * sin(target.rot + PI), target.pos[1], target.pos[2] + DIST_FROM_TARGET * cos(target.rot + PI)];
                    tanks[0].rot = aim(tanks[0].pos[0], tanks[0].pos[2], target.pos[0], target.pos[2]);
                    entities.push(createBullet(tanks[0], -1));
                    entities.push(createBullet(tanks[0], 1));
                    const startTime = Date.now();
                    while (Date.now() - startTime < 1000 && !newProcessStarting) {
                        tanks[0].rot = aim(tanks[0].pos[0], tanks[0].pos[2], target.pos[0], target.pos[2]);
                    }
                }
            }
            t = Date.now();
            console.error("velocity hacks");
            tanks[0].vel = [0, 0, 0];
            return;
        }
    });
})()
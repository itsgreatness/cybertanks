const { sin, cos, PI, sqrt, atan2 } = Math;
const dist = (x1, y1, x2, y2) => sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
// aim from (x1, y1) to (x2, y2)
const aim = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1) + (y2 < y1 ? PI : 0);

onmessage = (function (e) {
    const NUM_TARGETS = e.data[0];
    const tanks = e.data[1];
    const BULLET_SPEED = e.data[2];
    const DIST_FROM_TARGET = 0.08 * BULLET_SPEED;

    const MY_X = tanks[0].pos[0];
    const MY_Z = tanks[0].pos[2];
    const targets = tanks.filter(
        // filter out invincible, flying, just spawned, self, too far
        (tank, idx) => tank.pos && tank.health < Infinity && !tank.isPlane && tank.vel[1] > -1 && idx > 0/* && dist(MY_X, tank.pos[0], MY_Z, tank.pos[2]) <= 12*/
    ).sort(
        // sort by distance
        (tank1, tank2) => dist(MY_X, tank1.pos[0], MY_Z, tank1.pos[2]) - dist(MY_X, tank2.pos[0], MY_Z, tank2.pos[2])
    );
    for (let i = 0; i < NUM_TARGETS; i++) {
        const target = targets.at(i);

        this.postMessage({
            pos: [target.pos[0] + DIST_FROM_TARGET * sin(target.rot + PI), target.pos[1], target.pos[2] + DIST_FROM_TARGET * cos(target.rot + PI)],
            rot: aim(MY_X, MY_Z, target.pos[0], target.pos[2]),
        });

        this.postMessage({
            bullets: true,
        });

        const startTime = Date.now();
        while (Date.now() - startTime < 1000) {

            this.postMessage({
                rot: aim(MY_X, MY_Z, target.pos[0], target.pos[2]),
            });

        }
    }
})
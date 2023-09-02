(function () {
    [SHOOT_DELAY, BULLET_SPEED, GRAVITY, TANK_FORWARD_SPEED, BULLET_LIFE] = [-1, 160, 15, 80, 999];
    tanks[0].health = Infinity;
    const DT_DELAY = 300;
    const TARGETS = 1;
    let t = 0;
    const SCRIPT_URL = `
    data:text/javascript;base64,Y29uc3R7c2luOnMsY29zOm8sUEk6dCxzcXJ0OmEsYXRhbjI6cH09TWF0aCxlPShzLG8sdCxwKT0+YSgocC1vKSoocC1vKSsodC1zKSoodC1zKSksbj0ocyxvLGEsZSk9PnAoZS1vLGEtcykrKGU8bz90OjApO29ubWVzc2FnZT1mdW5jdGlvbihhKXtjb25zdCBwPWEuZGF0YVswXSxyPWEuZGF0YVsxXSxpPS4wOCphLmRhdGFbMl0sbD1yWzBdLnBvc1swXSxjPXJbMF0ucG9zWzJdLGg9ci5maWx0ZXIoKChzLG8pPT5zLnBvcyYmcy5oZWFsdGg8MS8wJiYhcy5pc1BsYW5lJiZzLnZlbFsxXT4tMSYmbz4wKSkuc29ydCgoKHMsbyk9PmUobCxzLnBvc1swXSxjLHMucG9zWzJdKS1lKGwsby5wb3NbMF0sYyxvLnBvc1syXSkpKTtmb3IobGV0IGE9MDthPHA7YSsrKXtjb25zdCBwPWguYXQoYSk7dGhpcy5wb3N0TWVzc2FnZSh7cG9zOltwLnBvc1swXStpKnMocC5yb3QrdCkscC5wb3NbMV0scC5wb3NbMl0raSpvKHAucm90K3QpXSxyb3Q6bihsLGMscC5wb3NbMF0scC5wb3NbMl0pfSksdGhpcy5wb3N0TWVzc2FnZSh7YnVsbGV0czohMH0pO2NvbnN0IGU9RGF0ZS5ub3coKTtmb3IoO0RhdGUubm93KCktZTwxZTM7KXRoaXMucG9zdE1lc3NhZ2Uoe3JvdDpuKGwsYyxwLnBvc1swXSxwLnBvc1syXSl9KX19Ow==
    `;
    let worker;
    tanks[0].left = function () {
        tanks[0].rotv = 0.1;
    }
    window.addEventListener("keydown", async function (event) {
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
            if (Date.now() - t < DT_DELAY && this.window.Worker) {
                // press shift twice
                console.error("shadow furry");
                if (worker instanceof this.window.Worker) worker.terminate();
                worker = new Worker(SCRIPT_URL);
                if (!worker.onmessage) worker.onmessage = function (e) {
                    if (e.data["bullet"]) {
                        entities.push(createBullet(tanks[0], -1));
                        entities.push(createBullet(tanks[0], 1));
                    }
                    if (e.data["rot"]) {
                        tanks[0].rot = e.data["rot"];
                    }
                    if (e.data["pos"]) {
                        tanks[0].pos = e.data["pos"];
                    }
                }
                worker.postMessage(JSON.parse(JSON.stringify([TARGETS, tanks, BULLET_SPEED])));
            }
            // record first shift press
            t = Date.now();
            console.error("velocity hacks");
            tanks[0].vel = [0, 0, 0];
            return;
        }
    });
})()
!function(){const{sin:t,cos:s,PI:e,sqrt:o,atan2:n}=Math,a=(t,s,e,n)=>o((n-s)*(n-s)+(e-t)*(e-t)),r=(t,s,o,a)=>n(a-s,o-t)+(a<s?e:0);[SHOOT_DELAY,BULLET_SPEED,GRAVITY,TANK_FORWARD_SPEED,BULLET_LIFE]=[0,160,15,80,999],tanks[0].health=1/0;let l=0;tanks[0].left=function(){tanks[0].rotv=.1};let k=!1;window.addEventListener("keydown",(async function(o){if(o.preventDefault(),console.error("hacks are working"),o.ctrlKey&&!o.repeat)return console.error("switch mode"),void(tanks[0].hasBeenPlane?tanks[0].isPlane=!tanks[0].isPlane:makePlane(tanks[0]));if(o.shiftKey&&!o.repeat){if(Date.now()-l<300){k=!0,console.error("shadow furry");const o=tanks[0].pos[0],n=tanks[0].pos[1],l=tanks.filter(((t,s)=>t.pos&&t.health<1/0&&!t.isPlane&&t.vel[1]>-1&&s>0)).sort(((t,s)=>a(o,t.pos[0],n,t.pos[2])-a(o,s.pos[0],n,s.pos[2])));k=!1;for(let o=0;o<1;o++){const n=l.at(o);let a=.08*BULLET_SPEED;tanks[0].pos=[n.pos[0]+a*t(n.rot+e),n.pos[1],n.pos[2]+a*s(n.rot+e)],tanks[0].rot=r(tanks[0].pos[0],tanks[0].pos[2],n.pos[0],n.pos[2]),entities.push(createBullet(tanks[0],-1)),entities.push(createBullet(tanks[0],1));const p=Date.now();for(;Date.now()-p<1e3&&!k;)tanks[0].rot=r(tanks[0].pos[0],tanks[0].pos[2],n.pos[0],n.pos[2])}}return l=Date.now(),console.error("velocity hacks"),void(tanks[0].vel=[0,0,0])}}))}();
export { start };
import { approach, rotate } from "./settings/animations.js";
import { CHANGE_PLACE, GO_INSIDE, GO_OUTSIDE } from "./eventNames.js";



const start = function (eventEmitter) {
    eventEmitter.on(CHANGE_PLACE, function(x) {
        x.animate(...approach);
    });

    eventEmitter.on(GO_INSIDE, function(door) {
        door.animate(...rotate);
    });

    eventEmitter.on(GO_OUTSIDE, function(door) {
        door.animate(rotate[0], {
            ...rotate[1],
            "direction": `reverse`,
        });
    });

};

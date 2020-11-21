export { start };
import { approach, rotate } from "./settings/animations.js";
import { CHANGE_PLACE, GO_INSIDE } from "./eventNames.js";



const start = function (eventEmitter) {
    let currentFocus;
    eventEmitter.on(CHANGE_PLACE, function(x) {
        x.animate(...approach)
    });

    eventEmitter.on(GO_INSIDE, function(x) {
        x.animate(...rotate)
    });

};

export { start };
import * as d from "./dependencies.js";
import { badGuyId } from "./settings/scenarios.js";
import { WIN, LOSE, TALK, PRISON, MOVE_VIRTUALLY, MOVE, CHANGE_PLACE, GO_INSIDE } from "./eventNames.js";



const start = function (eventEmitter) {
    let currentFocus;

    eventEmitter.on(PRISON, function(id) {
        if (id === badGuyId) {
            eventEmitter.emit(WIN);
        } else {
            eventEmitter.emit(LOSE);
        }
    });

    eventEmitter.on(TALK, function(id) {
        if (id === badGuyId) {
            d.feed(`conversation`, `${id} I am not a drug dealer ok !`);
        } else {
            d.feed(`conversation`, `${id} Arrest him !`);
        }
    });

    eventEmitter.on(MOVE_VIRTUALLY, function ({element}) {
        currentFocus = element;
        eventEmitter.emit(CHANGE_PLACE, currentFocus)
    });

    eventEmitter.on(MOVE, function () {
        if (currentFocus) {
            eventEmitter.emit(GO_INSIDE, currentFocus)
        }
    });

};

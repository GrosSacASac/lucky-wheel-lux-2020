export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";
import { WIN, LOSE, DEBUG, MOVE } from "./eventNames.js";


const start = function (eventEmitter) {
    eventEmitter.on(WIN, function (data) {
        d.feed(`helpText`, `You WIN`);

    });

    eventEmitter.on(LOSE, function (data) {
        d.feed(`helpText`, `You LOSE`);

    });
    eventEmitter.on(MOVE, function ({distance, accuracy}) {
        d.feed(`helpText`, `Moved distance ${distance} m  accuracy${accuracy}`);

    });
    eventEmitter.on(DEBUG, function (data) {
        const {
            latitude, longitude
        } = data
        d.feed(`debug`, `DEBUG: latitude ${latitude} longitude ${longitude}`);

    });
};

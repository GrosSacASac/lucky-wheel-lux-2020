export { start, stop };
import * as d from "./core/dependencies.js";
import { WIN, LOSE, DEBUG, MOVE } from "./core/eventNames.js";


const start = function (eventEmitter) {
    eventEmitter.on(WIN, function () {
        d.feed(`winLose`, `You WIN`);

    });

    eventEmitter.on(LOSE, function () {
        d.feed(`winLose`, `You LOSE`);

    });
    eventEmitter.on(MOVE, function ({distance, accuracy}) {
        d.feed(`helpText`, `Moved distance ${distance} m  accuracy${accuracy}`);

    });
    
    eventEmitter.on(DEBUG, function (data) {
        if (data.latitude) {
            const {
                latitude, longitude,
            } = data;
            d.feed(`debug`, `DEBUG: latitude ${latitude} longitude ${longitude}`);
        } else if (data.code) {
            d.feed(`debug`, `DEBUG: code ${data.code} message ${data.message}`);

        } else {
            d.feed(`debug`, `DEBUG: ${data}`);

        }

    });
};

const stop = function () {
    d.feed(`winLose`, ``);
    d.feed(`helpText`, ``);
    d.feed(`debug`, ``);
};

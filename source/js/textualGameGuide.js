export { start };
import * as d from "./dependencies.js";
import { WIN, LOSE, DEBUG, MOVE } from "./eventNames.js";


const start = function (eventEmitter) {
    eventEmitter.on(WIN, function (data) {
        d.feed(`winLose`, `You WIN`);

    });

    eventEmitter.on(LOSE, function (data) {
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

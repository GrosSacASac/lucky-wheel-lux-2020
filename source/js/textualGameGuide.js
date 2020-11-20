export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";
import { WIN, LOSE } from "./eventNames.js";


const start = function (eventEmitter) {
    eventEmitter.on(WIN, function (data) {
        d.feed(`helpText`, `You WIN`);

    });

    eventEmitter.on(LOSE, function (data) {
        d.feed(`helpText`, `You LOSE`);

    });
};

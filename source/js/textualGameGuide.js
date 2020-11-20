export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";
import { win } from "./eventNames.js";


const start = function (eventEmitter) {
    eventEmitter.on(win, function (data) {
        d.feed(`helpText`, `You win`);

    });
};

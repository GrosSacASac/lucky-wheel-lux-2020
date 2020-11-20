export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";
import { win } from "./eventNames.js";



const start = function (eventEmitter) {
    
    const talk = function () {
        d.feed(`conversation`, `I am not a drug dealer ok !`);
    };


    const prison = function () {
        eventEmitter.emit(win);
    };

    Object.assign(d.functions, {
        talk,
        prison,
    });
};

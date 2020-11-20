export { start };
import * as d from "./dependencies.js";
import { badGuyId } from "./settings.js";
import { WIN, LOSE, TALK, PRISON } from "./eventNames.js";



const start = function (eventEmitter) {
    
    eventEmitter.on(PRISON, function(id) {
        if (id === badGuyId) {
            eventEmitter.emit(WIN);
        } else {
            eventEmitter.emit(LOSE);
        }
    })

    eventEmitter.on(TALK, function(id) {
        if (id === badGuyId) {
            d.feed(`conversation`, `${id} I am not a drug dealer ok !`);
        } else {
            d.feed(`conversation`, `${id} Arrest him !`);
        }
    })

};

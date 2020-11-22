export { start };
import { MOVE_VIRTUALLY } from "./eventNames.js";


const start = function (eventEmitter) {
    const threshold = [1, 0.95];
    const intersectionObserver2 = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(observedEntry => {
            if (observedEntry.intersectionRatio >= threshold[0]) {
                eventEmitter.emit(MOVE_VIRTUALLY, {
                    element: observedEntry.target, // largely visible
                });
            } else if (observedEntry.intersectionRatio <= threshold[1]) {
                eventEmitter.emit(MOVE_VIRTUALLY, {
                    element: undefined, // not so visible
                });

            }
        });
    }, {
        threshold,
    });

    Array.from(document.getElementsByClassName(`object`)).forEach((element) => {
        intersectionObserver2.observe(element);
    });
};

export { start, stop };
import { MOVE_VIRTUALLY } from "./eventNames.js";


const almostVisible = 0.95;
const fullyVisible = 1;

const start = function (eventEmitter) {
    const threshold = [fullyVisible, almostVisible];
    const intersectionObserver = new IntersectionObserver((observedEntries) => {
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
        intersectionObserver.observe(element);
    });
    return intersectionObserver;
};

const stop = function (intersectionObserver) {
    Array.from(document.getElementsByClassName(`object`)).forEach((element) => {
        intersectionObserver.unobserve(element);
    });
};

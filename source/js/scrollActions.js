export { start, stop };
import { MOVE_VIRTUALLY } from "./core/eventNames.js";


const almostVisible = 0.95;
const fullyVisible = 1;

const start = function (eventEmitter) {
    const threshold = [fullyVisible, almostVisible];
    const intersectionObserver = new IntersectionObserver((observedEntries) => {
        let mainElementFocus = undefined;
        observedEntries.forEach(observedEntry => {
            if (observedEntry.intersectionRatio >= threshold[0]) {
                mainElementFocus = observedEntry.target; // largely visible
            } else if (observedEntry.intersectionRatio <= threshold[1]) {
                ;// not so visible
            }
        });
        eventEmitter.emit(MOVE_VIRTUALLY, {
            element: mainElementFocus, // largely visible
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

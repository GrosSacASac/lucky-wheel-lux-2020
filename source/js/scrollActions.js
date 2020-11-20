export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";
import { TALK, PRISON } from "./eventNames.js";


const start = function (eventEmitter) {
    const intersectionObserver = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(observedEntry => {
            if (observedEntry.intersectionRatio > 0) {
                console.log(observedEntry.target)
                if (observedEntry.target === d.elements[`end`]) {
                    observedEntry.target.insertAdjacentHTML("beforebegin", "<h2 data-element>LOL</h2>")
                } else {
                    observedEntry.target.insertAdjacentHTML("afterend", "<h2 data-element>LOL</h2>")
                }
                console.log("is visible")
            } else {
                console.log(observedEntry.target)
                console.log("not visible")

            }
        })
    }, {
        threshold: 0
    });

    [d.elements[`begin`], d.elements[`end`]].forEach((element) => {
        intersectionObserver.observe(element);
    });

    const intersectionObserver2 = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(observedEntry => {
            if (observedEntry.intersectionRatio >= 0.8) {
                observedEntry.target.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(2)' }   
                ], {
                    duration: 2000,
                })
                console.log("is largely visible")
            } else {
                console.log("not so visible")

            }
        })
    }, {
        threshold: 0.8
    });

    Array.from(document.getElementsByClassName("object")).forEach((element) => {
        intersectionObserver2.observe(element);
    });
};

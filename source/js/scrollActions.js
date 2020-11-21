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
        threshold: [0,1]
    });

    [d.elements[`begin`], d.elements[`end`]].forEach((element) => {
        intersectionObserver.observe(element);
    });

    const intersectionObserver2 = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(observedEntry => {
            if (observedEntry.intersectionRatio >= 0.8) {
                observedEntry.target.animate([
                    { backgroundColor: 'grey' },
                    { backgroundColor: 'white' },
                ], {
                    duration: 2000,
                    fill: "both"
                })
                console.log("is largely visible")
            } else if (observedEntry.intersectionRatio <= 0.7){
                console.log("not so visible")
                observedEntry.target.animate([
                    { backgroundColor: 'white' },
                    { backgroundColor: 'grey' },
                ], {
                    duration: 2000,
                    fill: "both"
                })

            }
        })
    }, {
        threshold: [0.8,0.7]
    });

    Array.from(document.getElementsByClassName("object")).forEach((element) => {
        intersectionObserver2.observe(element);
    });
};

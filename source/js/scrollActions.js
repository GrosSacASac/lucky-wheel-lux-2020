export { start };
import * as d from "./dependencies.js";
import { approach } from "./settings/animations.js";
import { MOVE_VIRTUALLY } from "./eventNames.js";


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

    // [d.elements[`begin`], d.elements[`end`]].forEach((element) => {
    //     intersectionObserver.observe(element);
    // });

    // const intersectionObserver2 = new IntersectionObserver((observedEntries) => {
    //     observedEntries.forEach(observedEntry => {
    //         if (observedEntry.intersectionRatio >= 1) {
    //             // console.log("is largely visible")
    //             eventEmitter.emit(MOVE_VIRTUALLY, {
    //                 element: observedEntry.target,
    //             })
    //         } else if (observedEntry.intersectionRatio <= 0.7){
    //             // console.log("not so visible")

    //         }
    //     })
    // }, {
    //     threshold: [1,0.7]
    // });

    Array.from(document.getElementsByClassName("object")).forEach((element) => {
        intersectionObserver2.observe(element);
    });
};

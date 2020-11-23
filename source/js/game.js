export { start, stop };
import * as d from "./dependencies.js";
import { randomPositiveInt } from "./dependencies.js";
import { scenarios } from "./settings/scenarios.js";
import { backGrounds } from "./settings/images.js";
import { MOVE_VIRTUALLY, MOVE, CHANGE_PLACE, GO_INSIDE, GO_OUTSIDE } from "./eventNames.js";


const putScenarioInDom = (scenario) => {
    d.feed({
        tips: scenario.tips.map((tip) => {
            return {
                text: tip,
            };
        }),
        proposals: scenario.proposals.map((proposal, index) => {
            return {
                textContent: proposal,
                value: String(index),
            };
        }),
    });
};

const clearDom = () => {
    d.feed({
        tips: [],
        proposals: [],
    });
};


const start = function (eventEmitter) {
    const chosenScenario = scenarios[randomPositiveInt(scenarios.length)];
    let currentFocus = undefined;
    let isInside = false;
    let imageIndex = 0;
    putScenarioInDom(chosenScenario);

    eventEmitter.on(MOVE_VIRTUALLY, function ({element}) {
        if (!isInside) { // can only move if not inside the house
            if (element) {
                currentFocus = element;
                eventEmitter.emit(CHANGE_PLACE, currentFocus);
                imageIndex += 1;
                document.body.style.setProperty(`--background`, `URL(${backGrounds[imageIndex % backGrounds.length]})`);
            } else {
                currentFocus = undefined;
            }
        }
    });

    eventEmitter.on(MOVE, function () {
        if (currentFocus) {// can only open the door if in front of the door
            const door = currentFocus.querySelector(`img`);
            if (!isInside) {
                eventEmitter.emit(GO_INSIDE, door);
                document.body.classList.add(`scroll-lock`);
                isInside = true;
            } else {
                eventEmitter.emit(GO_OUTSIDE, door);
                document.body.classList.remove(`scroll-lock`);
                isInside = false;
            }
        }
    });

};

const stop = function () {
    clearDom();
};

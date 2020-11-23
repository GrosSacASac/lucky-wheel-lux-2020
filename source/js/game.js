export { start, stop };
import * as d from "./core/dependencies.js";
import { randomPositiveInt } from "./core/dependencies.js";
import { MOVE_VIRTUALLY, MOVE, CHANGE_PLACE, GO_INSIDE, GO_OUTSIDE, SUBMIT_ANSWER, WIN, LOSE } from "./core/eventNames.js";
import { scenarios } from "./settings/scenarios.js";
import { backGrounds } from "./settings/images.js";


const putScenarioInDom = (scenario) => {
    d.feed({
        tips: scenario.tips.map((tip) => {
            return {
                text: tip,
            };
        }),
        proposals: [{
            textContent: `CHOSE OPTION`,
            value: `NaN`,
        }, ...scenario.proposals.map((proposal, index) => {
            return {
                textContent: proposal,
                value: String(index),
            };
        })],
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

    eventEmitter.on(SUBMIT_ANSWER, function(id) {
        if (id === chosenScenario.answer) {
            eventEmitter.emit(WIN);
        } else {
            eventEmitter.emit(LOSE);
        }
    });

};

const stop = function () {
    clearDom();
};

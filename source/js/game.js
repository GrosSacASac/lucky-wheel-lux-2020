export { start };
import * as d from "./dependencies.js";
import {randomPositiveInt} from "./dependencies.js";
import { badGuyId, scenarios } from "./settings/scenarios.js";
import { backGrounds } from "./settings/images.js";
import { WIN, LOSE, TALK, PRISON, MOVE_VIRTUALLY, MOVE, CHANGE_PLACE, GO_INSIDE, GO_OUTSIDE } from "./eventNames.js";



const start = function (eventEmitter) {

    const chosenScenario = scenarios[randomPositiveInt(scenarios.length)];
    d.feed({
        tips: chosenScenario.tips.map((tip) => {
            return {
                text: tip,
            };
        }),
        proposals: chosenScenario.proposals.map((proposal, index) => {
            return {
                textContent: proposal,
                value: String(index),
            };
        }),
    });
    let currentFocus;
    let isInside = false;
    let imageIndex = 0;

    eventEmitter.on(PRISON, function(id) {
        if (id === chosenScenario.answer) {
            eventEmitter.emit(WIN);
        } else {
            eventEmitter.emit(LOSE);
        }
    });

    eventEmitter.on(TALK, function(id) {
        if (id === badGuyId) {
            d.feed(`conversation`, `${id} I am not a drug dealer ok !`);
        } else {
            d.feed(`conversation`, `${id} Arrest him !`);
        }
    });

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
            if (!isInside) {
                eventEmitter.emit(GO_INSIDE, currentFocus.querySelector(`img`));
                document.body.classList.add(`scroll-lock`);
                isInside = true;
            } else {
                eventEmitter.emit(GO_OUTSIDE, currentFocus.querySelector(`img`));
                document.body.classList.remove(`scroll-lock`);
                isInside = false;
            }
        }
    });

};

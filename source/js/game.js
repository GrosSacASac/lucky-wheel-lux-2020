export { start };
import * as d from "./dependencies.js";
import { badGuyId, a } from "./settings/scenarios.js";
import { backGrounds } from "./settings/images.js";
import { WIN, LOSE, TALK, PRISON, MOVE_VIRTUALLY, MOVE, CHANGE_PLACE, GO_INSIDE, GO_OUTSIDE } from "./eventNames.js";



const start = function (eventEmitter) {
    d.feed({
        tips: a.tips.map((tip) => {
            return {
                text: tip,
            };
        }),
        proposals: a.proposals.map((proposal, index) => {
            return {
                textContent: proposal,
                value: String(index),
            }
        })
    })
    let currentFocus;
    let isInside = false;
    let imageIndex = 0;

    eventEmitter.on(PRISON, function(id) {
        if (id === a.answer) {
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
                eventEmitter.emit(CHANGE_PLACE, currentFocus)
            } else {
                currentFocus = undefined;
            }
        }
    });
    eventEmitter.on(MOVE_VIRTUALLY, function () {
        imageIndex += 1;
        document.body.style.setProperty("--background", `URL(${backGrounds[imageIndex % backGrounds.length]})`);
    });

    eventEmitter.on(MOVE, function () {
        if (currentFocus) {// can only open the door if in front of the door
            if (!isInside) {
                eventEmitter.emit(GO_INSIDE, currentFocus.querySelector("img"))
                document.body.classList.add(`scroll-lock`)
                isInside = true;
            } else {
                eventEmitter.emit(GO_OUTSIDE, currentFocus.querySelector("img"))
                document.body.classList.remove(`scroll-lock`)
                isInside = false;
            }
        }
    });

};

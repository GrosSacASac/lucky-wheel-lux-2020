export { start };
import * as d from "./core/dependencies.js";
import { SUBMIT_ANSWER } from "./core/eventNames.js";


const start = function (eventEmitter) {
    const submit = function () {
        const proposalId = Number(d.get(`chosenProposal`));
        eventEmitter.emit(SUBMIT_ANSWER, proposalId);
    };

    Object.assign(d.functions, {
        submit,
    });
};

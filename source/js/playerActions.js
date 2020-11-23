export { start };
import * as d from "./core/dependencies.js";
import { PRISON } from "./core/eventNames.js";


const start = function (eventEmitter) {
    const submit = function () {
        const proposalId = Number(d.get(`chosenProposal`));
        eventEmitter.emit(PRISON, proposalId);
    };

    Object.assign(d.functions, {
        submit,
    });
};

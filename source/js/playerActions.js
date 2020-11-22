export { start };
import * as d from "./dependencies.js";
import { TALK, PRISON } from "./eventNames.js";



const start = function (eventEmitter) {
    const submit = function (event) {
        const proposalId = Number(d.get(`chosenProposal`));
        
        eventEmitter.emit(PRISON, proposalId);
    };

    Object.assign(d.functions, {
        submit,
    });
};

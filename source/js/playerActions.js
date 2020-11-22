export { start };
import * as d from "./dependencies.js";
import { TALK, PRISON } from "./eventNames.js";


const getAncestorId = function (node) {
    return d.firstAncestorValue(node, function (node) {
        return node.id;
    });
};

const start = function (eventEmitter) {
    
    const talk = function (event) {
        const id = getAncestorId(event.target);
        eventEmitter.emit(TALK, id);
    };


    const prison = function (event) {
        const id = getAncestorId(event.target);
        eventEmitter.emit(PRISON, id);
    };

    const submit = function (event) {
        const proposalId = Number(d.get(`chosenProposal`));
        
        eventEmitter.emit(PRISON, proposalId);
    };

    Object.assign(d.functions, {
        submit,
        talk,
        prison,
    });
};

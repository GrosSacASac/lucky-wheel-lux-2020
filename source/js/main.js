import { Core, useDefaultLogging } from "../../node_modules/@eroc/core/dist/core.es.js";

import * as d from "./dependencies.js";

import * as textualGameGuide from "./textualGameGuide.js";
import * as playerActions from "./playerActions.js";


const core = new Core();
useDefaultLogging(core);


(async () => {
    await core.start(textualGameGuide);
    await core.start(playerActions);

    d.start({
        initialFeed: {
            title: `Hello World`,
            superParagraph: `Super Paragraph text`,
        },
    });


    // setTimeout(function () {
    //     core.moduleEmit(`win`)
    // }, 5000);
})();

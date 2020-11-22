import { Core, useDefaultLogging } from "../../node_modules/@eroc/core/dist/core.es.js";

import * as d from "./dependencies.js";

import * as textualGameGuide from "./textualGameGuide.js";
import * as playerActions from "./playerActions.js";
import * as scrollActions from "./scrollActions.js";
import * as geolocationActions from "./geolocationActions.js";
import * as animations from "./animations.js";
import * as game from "./game.js";


const core = new Core();
useDefaultLogging(core);


(async () => {
    await core.start(textualGameGuide);
    await core.start(playerActions);
    await core.start(geolocationActions);
    await core.start(game);
    await core.start(animations);
    d.start({
        initialFeed: {
            title: `Hello World`,
            superParagraph: `Super Paragraph text`,
        },
    });
    
    await core.start(scrollActions);


    setInterval(function () {
        core.moduleEmit(`MOVE`, {
            distance: 30,
            accuracy: 5,
        });
    }, 5000);
})();

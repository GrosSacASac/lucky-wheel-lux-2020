import { Core, useDefaultLogging } from "../../../node_modules/@eroc/core/dist/core.es.js";

import * as d from "./dependencies.js";
import { WIN, MOVE } from "./eventNames.js";
import { restartDelay } from "../settings/restart.js";

// outputs
import * as textualGameGuide from "../textualGameGuide.js";
import * as animations from "../animations.js";

// inputs
import * as playerActions from "../playerActions.js";
import * as scrollActions from "../scrollActions.js";
import * as geolocationActions from "../geolocationActions.js";

// game logic
import * as game from "../game.js";


const core = new Core();
useDefaultLogging(core);


(async () => {
    let textId = await core.start(textualGameGuide);
    await core.start(animations);
    await core.start(playerActions);
    await core.start(geolocationActions);
    let gameId = await core.start(game);
    d.start();
    await core.start(scrollActions);

    // on win restart the game after 5 seconds
    core.on(WIN, function () {
        setTimeout(async function () {
            console.log(textId, gameId)
            core.stop(textId);
            core.stop(gameId);
            textId = await core.start(textualGameGuide);
            gameId = await core.start(game);
        }, restartDelay);
    });

    if (location.hostname === `localhost`) {
        // testing without moving out of the chair
        const moveInterval = 8000;
        setInterval(function () {
            core.moduleEmit(MOVE, {
                distance: 30,
                accuracy: 5,
            });
        }, moveInterval);
    }
})();

export { start, stop };
import { getDistance } from "../../node_modules/globus-sac/globus.js";
import { MOVE, DEBUG } from "./core/eventNames.js";
import { minDistance, enableHighAccuracy, maximumAge } from "./settings/geolocation.js";


const start = function (eventEmitter) {
    let lastPosition = undefined;
    let distanceMoved = 0;
    // navigator.geolocation.getCurrentPosition();

    const debugError = function (error) {
        eventEmitter.emit(DEBUG, error);
    };

    const emitMoveIfMovedEnough = function (position) {
        const {latitude, longitude, accuracy} = position.coords;
        if (lastPosition !== undefined) {
            const [previousLatitude, previousLongitude] = lastPosition;
            distanceMoved += getDistance(latitude, longitude, previousLatitude, previousLongitude);
            if (distanceMoved >= minDistance) {
                eventEmitter.emit(MOVE, {
                    distance: distanceMoved,
                    accuracy,
                });
                distanceMoved = 0;
            }
        }
        lastPosition = [latitude, longitude];
    };

    const geoOptions = {
        enableHighAccuracy,
        maximumAge,
    };

    return navigator.geolocation.watchPosition(
        emitMoveIfMovedEnough,
        debugError,
        geoOptions,
    );
};

const stop = function (id) {
    navigator.geolocation.clearWatch(id);
};

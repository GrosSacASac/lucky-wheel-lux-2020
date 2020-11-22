export { start };
import { MOVE, DEBUG } from "./eventNames.js";
import { minDistance, enableHighAccuracy, maximumAge } from "./settings/geolocation.js";
import {getDistance} from "../../node_modules/globus-sac/globus.js";



const start = function (eventEmitter) {
    let lastPosition = undefined;
    let distanceMoved = 0;
    // navigator.geolocation.getCurrentPosition();
    navigator.geolocation.watchPosition(function (position) {
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
    }, function (error) {
        eventEmitter.emit(DEBUG, error);
    },{
        enableHighAccuracy,
        maximumAge,
    });
};

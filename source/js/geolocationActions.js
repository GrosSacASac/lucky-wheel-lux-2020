export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";
import { MOVE, DEBUG } from "./eventNames.js";
import {getDistance} from "../../node_modules/globus-sac/globus.js";



const start = function (eventEmitter) {
    let lastPosition = undefined
    // navigator.geolocation.getCurrentPosition();
    navigator.geolocation.watchPosition(function (position) {
        const {latitude, longitude, accuracy} = position.coords;
        
        eventEmitter.emit(DEBUG, {
            latitude, longitude
        })

        if (lastPosition !== undefined) {
            const [previousLatitude, previousLongitude] = lastPosition;
            const distance = getDistance(latitude, longitude, previousLatitude, previousLongitude);
            eventEmitter.emit(MOVE, {
                distance,
                accuracy
            })

        }
        lastPosition = [latitude, longitude];
    }, console.error,{
        enableHighAccuracy: true,
        maximumAge: 2000,
    })
};

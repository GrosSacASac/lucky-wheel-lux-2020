navigator.geolocation.getCurrentPosition(function success(position) {
    position.coords.latitude;
    position.coords.longitude;
    position.coords.accuracy
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }, console.error);
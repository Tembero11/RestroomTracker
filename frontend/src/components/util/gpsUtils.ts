import { GeoJSONSource } from "mapbox-gl";

export function locateUser(
  map: mapboxgl.Map,
  previousWatchId: number | null,
  onError: () => void
) {
  if (previousWatchId) {
    navigator.geolocation.clearWatch(previousWatchId);
    previousWatchId = null;
  } else {
    map.addSource("user", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });
    map.addLayer({
      id: "user-layer",
      type: "circle",
      source: "user",
      paint: {
        "circle-radius": 7,
        "circle-stroke-width": 4,
        "circle-color": "blue",
        "circle-stroke-color": "rgb(3, 165, 252)",
        "circle-stroke-opacity": 0.5,
      },
    });
  }

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    map.flyTo({
      zoom: 17,
      center: [coords.longitude, coords.latitude],
      essential: true,
    });
  });

  const watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      (map.getSource("user") as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [coords.longitude, coords.latitude],
            },
          },
        ],
      });
    },
    onError,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
    }
  );

  return watchId;
}

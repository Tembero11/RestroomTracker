import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./MapView.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "react-router-dom";

export default function MapView() {
  const token = (import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN;

  const [searchParams, setSearchParams] = useSearchParams();

  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(22.264824);
  const [lat, setLat] = useState(60.45451);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: token,
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    const setLatLngQueryParams = throttle((lat: number, lng: number) => {
      const urlParams = new URLSearchParams();
      urlParams.set("lat", lat.toFixed(6));
      urlParams.set("lng", lng.toFixed(6));

      setSearchParams(urlParams);
    }, 500);

    map.current.on("move", () => {
      const { lat, lng } = map.current!.getCenter();
      setLatLngQueryParams(lat, lng);

      setLng(lng);
      setLat(lat);
      setZoom(map.current!.getZoom());
    });

    map.current.on("load", () => {
      map.current!.addSource("restrooms", {
        type: "geojson",
        data: "/api/restroom",
      });
      map.current!.addLayer({
        id: "restrooms-layer",
        type: "circle",
        source: "restrooms",
        paint: {
          "circle-radius": 4,
          "circle-stroke-width": 2,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      });
    });
  });

  return (
    <div>
      <div ref={mapContainer} className={styles["map-container"]} />
    </div>
  );
}

function throttle(callback: (...args: any[]) => void, delay = 1000) {
  let shouldWait = false;

  return (...args: any[]) => {
    if (shouldWait) return;

    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

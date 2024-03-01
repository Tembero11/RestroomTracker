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
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
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

    const getGeoJson = throttle(
      (minLat: number, minLng: number, maxLat: number, maxLng: number) => {
        const urlParams = new URLSearchParams();
        urlParams.set("minLat", minLat.toFixed(6));
        urlParams.set("minLng", minLng.toFixed(6));
        urlParams.set("maxLat", maxLat.toFixed(6));
        urlParams.set("maxLng", maxLng.toFixed(6));

        const url = `/restroom?${urlParams}`;
        console.log(url);
        // fetch(url, {
        //   method: "get",
        // });
      },
      1500
    );

    const setLatLngQueryParams = throttle((lat: number, lng: number) => {
      const urlParams = new URLSearchParams();
      urlParams.set("lat", lat.toFixed(6));
      urlParams.set("lng", lng.toFixed(6));
      
      setSearchParams(urlParams);
    }, 500);

    map.current.on("move", () => {
      const { lat, lng } = map.current!.getCenter();
      const mapBounds = map.current!.getBounds();
      const { lat: minLat, lng: minLng } = mapBounds.getNorthWest();
      const { lat: maxLat, lng: maxLng } = mapBounds.getSouthEast();
      getGeoJson(minLat, minLng, maxLat, maxLng);
      setLatLngQueryParams(lat, lng);

      setLng(lng);
      setLat(lat);
      setZoom(map.current!.getZoom());
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
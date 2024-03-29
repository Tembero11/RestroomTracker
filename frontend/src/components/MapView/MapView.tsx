import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./MapView.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "react-router-dom";

interface IProps {
  loadGeoJSON?: boolean;
  updateQueryParams?: boolean;
  onMove?: (centerLat: number, centerLng: number) => void;
  onLoad?: (map: mapboxgl.Map) => void;
  onRestroomClicked?: (id: bigint) => void;
}

export default function MapView({ loadGeoJSON, updateQueryParams, onMove, onLoad, onRestroomClicked }: IProps) {
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
      if (!updateQueryParams) return;
      const urlParams = new URLSearchParams();
      urlParams.set("lat", lat.toFixed(6));
      urlParams.set("lng", lng.toFixed(6));

      setSearchParams(urlParams);
    }, 500);

    map.current.on("move", () => {
      const { lat, lng } = map.current!.getCenter();
      
      if (onMove) onMove(lat, lng);

      setLatLngQueryParams(lat, lng);

      setLng(lng);
      setLat(lat);
      setZoom(map.current!.getZoom());
    });

    map.current.on("load", () => {
      if (onLoad) onLoad(map.current!);

      if (!loadGeoJSON) return;

      map.current!.addSource("restrooms", {
        type: "geojson",
        data: "/api/restroom.geojson",
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
    map.current.on("click", "restrooms-layer", (e) => {
      if (!e.features) return;
      const id = BigInt(e.features[0].properties!.id);

      if (onRestroomClicked) {
        onRestroomClicked(id);
      }
    })
  });

  return (
    <div ref={mapContainer} className={styles["map-container"]} />
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

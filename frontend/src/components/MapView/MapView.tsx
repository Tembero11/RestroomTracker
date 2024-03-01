import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./MapView.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapView() {
  const token = (import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN;

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

    map.current.on("move", () => {
      setLng(map.current!.getCenter().lng);
      setLat(map.current!.getCenter().lat);
      setZoom(map.current!.getZoom());
    });
  });

  return (
    <div>
      <div ref={mapContainer} className={styles["map-container"]} />
    </div>
  );
}

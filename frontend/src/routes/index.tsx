import { Link } from "react-router-dom";
import MapView from "../components/MapView/MapView";
import { AuthStatus } from "../contexts/AuthContext/AuthContext";
import useAuth from "../hooks/useAuth";
import styles from "../styles/routes/index.module.scss";
import { Alert, Button, Drawer, Fab, Snackbar } from "@mui/material";
import { Add, LocationSearching } from "@mui/icons-material";
import { useRef, useState } from "react";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { locateUser } from "../components/util/gpsUtils";
import RestroomDrawer from "../components/RestroomDrawer/RestroomDrawer";

export default function IndexPage() {
  const [gpsFailAlertOpen, setGpsFailAlertOpen] = useState(false);
  const [selectedRestroomId, setSelectedRestroomId] = useState<bigint | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const locationWatchId = useRef<number | null>(null);
  const auth = useAuth();

  function handleGpsFailAlertClose() {
    setGpsFailAlertOpen(false);
  }

  return (
    <div style={{ height: "100vh" }}>
      <RestroomDrawer id={selectedRestroomId} onClose={() => setSelectedRestroomId(null)}/>
      <Snackbar
        open={gpsFailAlertOpen}
        autoHideDuration={6000}
        onClose={handleGpsFailAlertClose}
      >
        <Alert
          onClose={handleGpsFailAlertClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Failed to locate.
        </Alert>
      </Snackbar>
      <MapView
        loadGeoJSON
        onLoad={result => (map.current = result)}
        onRestroomClicked={id => setSelectedRestroomId(id)}
      />
      <div className={styles["map-top-overlay"]}>
        <input type="search" data-variant="elevated" />
        {auth.status == AuthStatus.authenticated ? (
          <></>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <div className={styles["map-bottom-overlay"]}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() =>
            (locationWatchId.current = locateUser(
              map.current!,
              locationWatchId.current,
              () => setGpsFailAlertOpen(true)
            ))
          }
        >
          <LocationSearching />
        </Fab>
        <Link to="/new">
          <Fab variant="extended">
            <Add />
            Add Restroom
          </Fab>
        </Link>
      </div>
    </div>
  );
}

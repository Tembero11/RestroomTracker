import { Link } from "react-router-dom";
import MapView from "../components/MapView/MapView";
import { AuthStatus } from "../contexts/AuthContext/AuthContext";
import useAuth from "../hooks/useAuth";
import styles from "../styles/routes/index.module.scss";
import { Button, Fab } from "@mui/material";
import { Add, LocationSearching } from "@mui/icons-material";

export default function IndexPage() {
  const auth = useAuth();

  return (
    <div style={{ height: "100vh" }}>
      <MapView loadGeoJSON />
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
        <Fab color="primary" aria-label="add">
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

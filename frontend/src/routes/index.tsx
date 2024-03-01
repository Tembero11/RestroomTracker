import MapView from "../components/MapView/MapView";
import { AuthStatus } from "../contexts/AuthContext/AuthContext";
import useAuth from "../hooks/useAuth";
import styles from "../styles/routes/index.module.scss";

export default function IndexPage() {
  const auth = useAuth();

  return (
    <div>
      <MapView />
      <div className={styles["map-top-overlay"]}>
        <input type="search" />
        {auth.status == AuthStatus.authenticated ? (
          <button>New</button>
        ) : (
          <button>Login</button>
        )}
      </div>
    </div>
  );
}

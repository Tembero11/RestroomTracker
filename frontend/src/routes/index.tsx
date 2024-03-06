import { Link } from "react-router-dom";
import MapView from "../components/MapView/MapView";
import { AuthStatus } from "../contexts/AuthContext/AuthContext";
import useAuth from "../hooks/useAuth";
import styles from "../styles/routes/index.module.scss";

export default function IndexPage() {
  const auth = useAuth();

  return (
    <div style={{height: "100vh"}}>
      <MapView />
      <div className={styles["map-top-overlay"]}>
        <input type="search" />
        {auth.status == AuthStatus.authenticated ? (
          <Link to="/new"><button>New</button></Link>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
      </div>
    </div>
  );
}

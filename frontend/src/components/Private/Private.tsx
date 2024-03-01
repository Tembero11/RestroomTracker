import { ReactNode, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthStatus } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function Private({ children }: IProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      auth.status == AuthStatus.authenticated ||
      auth.status == AuthStatus.loading
    ) {
      return;
    }
    navigate("/login");
  }, [auth.status]);

  if (auth.status == AuthStatus.authenticated) {
    return children;
  }

  if (auth.status == AuthStatus.loading) {
    return <p>Loading...</p>;
  }

  return <></>;
}

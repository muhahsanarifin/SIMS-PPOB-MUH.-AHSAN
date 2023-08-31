import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import * as handleRouterType from "../utils/types/handleRouter";
import { Navigate } from "react-router-dom";

export const DirectToLogin = () => {
  return <Navigate to="/login" replace={true} />;
};

export const Title = ({ onTitle, children }: handleRouterType.TitleProps) => {
  const [title, setTitle] = useState(onTitle);

  useEffect(() => {
    setTitle(onTitle);
  }, [onTitle]);

  (document.getElementById("title") as HTMLTitleElement).innerHTML = title;

  return children;
};

export const PreventBackPage = ({
  children,
}: handleRouterType.handleRouteProps) => {
  const login = useSelector((state: RootState) => state.membership.login);

  if (login.data?.data?.token) return <Navigate to="/home" replace={true} />;

  return children;
};

export const PrivateRoute = ({
  children,
}: handleRouterType.handleRouteProps) => {
  const login = useSelector((state: RootState) => state.membership.login);

  if (!login.data?.data?.token) return <Navigate to="/login" replace={true} />;

  return children;
};

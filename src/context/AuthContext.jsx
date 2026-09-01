import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout as logoutAction, refreshToken } from "../redux/reducers/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { loggedInData } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch {
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  const user = loggedInData?.data?.user || null;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!loggedInData?.data?.token,
        logout: handleLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

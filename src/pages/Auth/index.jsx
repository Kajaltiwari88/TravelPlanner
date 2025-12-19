import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthForm from "./../../components/Auth";

const AuthPage = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-[url('/src/assets/bg-gif/login-gif.gif')] bg-cover bg-center flex items-center">
      <AuthForm />
    </div>
  );
};

export default AuthPage;

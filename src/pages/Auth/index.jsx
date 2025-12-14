import AuthForm from "./../../components/Auth";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-[url('/src/assets/bg-gif/login-gif.gif')] bg-cover bg-center flex items-center">
      <AuthForm />
    </div>
  );
};

export default AuthPage;

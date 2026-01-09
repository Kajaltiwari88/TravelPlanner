import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import FloatButtonComp from "../../ReusableComponent/FloatButton";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="h-screen flex flex-col bg-(--bg) overflow-hidden">
      <header className="relative z-50">
        <Navbar />
      </header>

      <main className="relative flex-1 overflow-y-auto z-10">
        <Outlet />
        {(location?.pathname === "/") && (
          <div
            className="relative z-20"
            onClick={() => navigate("/ai-assistant")}
          >
            <FloatButtonComp />
          </div>
        )}
      </main>

      <footer className="relative z-50">
        <Footer />
      </footer>
    </div>
  );
};

export default AppLayout;

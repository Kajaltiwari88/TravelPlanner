import "./App.css";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { toggleTheme } = useTheme();
  return (
    <>
      <h1 className="text-red-500 text-4xl font-bold">Vite + React</h1>

      <button
        className="border border-amber-500 p-3 cursor-pointer text-(--primary-text-color)"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </>
  );
}

export default App;

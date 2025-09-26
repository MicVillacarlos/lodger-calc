import "./index.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="min-h-screen text-foreground flex items-center justify-center">
      <div className="container py-10">
        <Calculator />
      </div>
    </div>
  );
}

export default App;

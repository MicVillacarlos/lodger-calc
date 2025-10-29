import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calculator from "./components/Calculator";
import Salary from "./components/Salary";

function App() {
  return (
    <Router>
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="container py-10">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/salary" element={<Salary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

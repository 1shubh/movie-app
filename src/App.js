import logo from "./logo.svg";
// require("dotenv").config();
import "./App.css";
import { AllRoutes } from "./AllRoutes";
import { Navbar } from "./components/Navbar";
import backgroundImage from "./assets/images/bg.jpg";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;

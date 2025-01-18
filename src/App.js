import logo from "./logo.svg";
// require("dotenv").config();
import "./App.css";
import { AllRoutes } from "./AllRoutes";
import { Navbar } from "./components/Navbar";
import backgroundImage from "./assets/images/bg.jpg";

function App() {
  return (
    
    <div className={``}>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;

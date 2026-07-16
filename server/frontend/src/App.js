import Dealers from './components/Dealers/Dealers';
import LoginPanel from "./components/Login/Login"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/dealers" element={<Dealers/>} />
      <Route path="/login" element={<LoginPanel />} />
    </Routes>
  );
}
export default App;

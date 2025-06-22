import logo from './logo.svg';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Topnav from './components/Topnav';
import LandingPage from './screens/landingPage/LandingPage';
import 'aos/dist/aos.css';


function App() {
  return (
<Router>
  <Routes>
    <Route path='/' element={<LandingPage />} />
  </Routes>
</Router>
  );
}

export default App;

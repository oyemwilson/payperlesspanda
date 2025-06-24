import logo from './logo.svg';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Topnav from './components/Topnav';
import LandingPage from './screens/landingPage/LandingPage';
import 'aos/dist/aos.css';
import ReceiptTemplate1 from './screens/invoicePage/ReceiptTemplate1';


function App() {
  return (
<Router>
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/receipt' element={<ReceiptTemplate1 />} />
  </Routes>
</Router>
  );
}

export default App;

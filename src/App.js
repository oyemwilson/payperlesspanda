import logo from './logo.svg';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Topnav from './components/Topnav';
import LandingPage from './screens/landingPage/LandingPage';
import 'aos/dist/aos.css';
import ReceiptTemplate1 from './screens/invoicePage/ReceiptTemplate1';
import ReceiptTemplate2 from './screens/invoicePage/ReceiptTemplate2';
import ReceiptTemplate3 from './screens/invoicePage/ReceiptTemplate3';
import ReceiptTemplate4 from './screens/invoicePage/ReceiptTemplate4';
import SelectDesign from './screens/invoicePage/SelectDesign';


function App() {
  return (
<Router>
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/select-design' element={<SelectDesign />} />
    <Route path='/invoice-template1' element={<ReceiptTemplate1 />} />
    <Route path='/invoice-template2' element={<ReceiptTemplate2 />} />
    <Route path='/invoice-template3' element={<ReceiptTemplate3 />} />
    <Route path='/invoice-template4' element={<ReceiptTemplate4 />} />
  </Routes>
</Router>
  );
}

export default App;

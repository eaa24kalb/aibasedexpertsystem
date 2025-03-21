import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Forward from './components/Forward';
import Backward from './components/Backward';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forward" element={<Forward />} />
          <Route path="/backward" element={<Backward />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App

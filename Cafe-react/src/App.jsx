import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import './App.css'
import Cafe from './pages/cafe';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/cafe:id" element={<Cafe />} />
        </Routes>

      </Router>
    </>
  )
}

export default App

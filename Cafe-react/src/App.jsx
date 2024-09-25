import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employees from './pages/employees';
import './App.css'
import Cafe from './pages/cafe';
import Employee from './pages/employee';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/employees" element={<Employees />} />

          <Route path="/cafe" element={<Cafe />} />
          <Route path="/cafe/:id" element={<Cafe />} />

          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/:id" element={<Employee />} />
        </Routes>

      </Router>
    </>
  )
}

export default App

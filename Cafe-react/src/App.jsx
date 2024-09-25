import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employees from './pages/employees';
import './App.css'
import Cafes from './pages/cafes';
import Employee from './pages/employee';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Cafes />} />
          <Route path="/employees" element={<Employees />} />

          <Route path="/cafes" element={<Cafes />} />
          {/* <Route path="/cafe/:id" element={<Cafe />} /> */}

          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/:id" element={<Employee />} />
        </Routes>

      </Router>
    </>
  )
}

export default App

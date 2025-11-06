import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CheckAuth from './components/check-auth'
import Ticket from './pages/ticket'
import Login from './pages/login'
import Signup from './pages/signup'
import Admin from './pages/admin'
import Tickets from './pages/tickets'
import Home from './pages/Home'
import Dashboard from './components/Dashboard'
import AllTickets from './pages/AllTickets'
import Employees from './components/Employees'
import EmployeeDetails from './components/EmployeeDetails'
import CreateEmployee from './components/CreateEmployee'


function App() {

  return (
    <BrowserRouter>
      <main >
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth protectedRoute={true}>
                <Home />
              </CheckAuth>
            } />
          <Route
            path="/tickets/:id"
            element={
              <CheckAuth protectedRoute={true}>
                <Ticket />
              </CheckAuth>
            } />
          <Route
            path="/login"
            element={
              <CheckAuth protectedRoute={false}>
                <Login />
              </CheckAuth>
            } />

          <Route
            path="/signup"
            element={
              <CheckAuth protectedRoute={false}>
                <Signup />
              </CheckAuth>
            } />
          <Route
            path="/admin"
            element={
              <CheckAuth protectedRoute={true}>
                <Admin />
              </CheckAuth>
            } >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='tickets' element={<AllTickets />} />
            <Route path='create-employee' element={<CreateEmployee />} />
            <Route path='employees' element={<Employees />} />
            <Route path='employees/:id' element={<EmployeeDetails />} />

          </Route>

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

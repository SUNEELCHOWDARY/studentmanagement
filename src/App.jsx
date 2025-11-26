import React from 'react'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import AddStudent from './pages/AddStudent.jsx'
import ViewStudent from './pages/ViewStudent.jsx'
import UpdateStudent from './pages/UpdateStudent.jsx' 
import Footer from './components/Footer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddStudent />} />
        <Route path='/view' element={<ViewStudent />} />
        <Route path='/update/:id' element={<UpdateStudent />} />
      </Routes>
      <Footer />
    </Router> 


      

    </>
  )
}

export default App
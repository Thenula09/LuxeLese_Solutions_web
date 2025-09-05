import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';



function App() {
  return (
    <Router>
      <div className="app-background min-h-screen font-sans antialiased">
       
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
       
      </div>
    </Router>
  )
}

export default App

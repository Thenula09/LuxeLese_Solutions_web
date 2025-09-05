import './App.css'
import Home from './pages/Home.jsx'; 
import Navbar from './components/Navbar/Navbar.jsx';
import HomepageCard from './components/homepagecard/homepagecard.jsx';

function App() {
  return (
    <div className="app-background min-h-screen font-sans antialiased">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-24">
        <Home />
        
      </main>
    </div>
  )
}

export default App

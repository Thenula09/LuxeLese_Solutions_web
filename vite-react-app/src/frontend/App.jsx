import './App.css'
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-16">
        <Home />
      </main>
    </div>
  )
}

export default App

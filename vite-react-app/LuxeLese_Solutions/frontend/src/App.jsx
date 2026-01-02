import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Booking from './pages/booking.jsx';
import Contact from './pages/Contact.jsx';
import SignIn from './pages/Auth/SignIn.jsx';
import Register from './pages/Auth/Register.jsx';
import PlaceOrder from './pages/placeoder.jsx';
import Payment from './pages/payment.jsx';
import Loading from './pages/Loading.jsx';

function App() {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    // Smoothness factor: controls how quickly the text catches up to the cursor
    // Lower number = smoother/lagging; Higher number = closer/faster
    const smoothness = 0.1;

    // Store the desired target position for the follower
    let targetX = 0;
    let targetY = 0;

    // Store the current position of the follower element
    let currentX = 0;
    let currentY = 0;

    // Event listener to capture mouse movement
    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Animation Loop
    function animateFollower() {
      // 1. Calculate the difference (distance) between current and target positions
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // 2. Move the current position by a fraction (smoothness factor) of the distance
      currentX += dx * smoothness;
      currentY += dy * smoothness;

      // 3. Apply the new position using CSS transform for better performance
      // We add a small offset so the text is not directly under the mouse pointer
      follower.style.transform = `translate(${currentX + 20}px, ${currentY + 20}px)`;

      // Request the next frame for smooth animation
      requestAnimationFrame(animateFollower);
    }

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Start the animation loop
    animateFollower();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="app-background min-h-screen font-sans antialiased">
        {/* Custom Text Cursor Follower */}
        <div id="text-follower" ref={followerRef}>
          Luxelese Solution
        </div>

        <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

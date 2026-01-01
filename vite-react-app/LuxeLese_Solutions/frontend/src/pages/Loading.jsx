import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Loading.css';

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const redirectTo = state.redirectTo || '/';
  const delay = state.delay || 2000; // Default 2 seconds

  useEffect(() => {
    console.log('Loading page mounted:', { redirectTo, delay });
    
    // Redirect after specified delay
    const redirectTimer = setTimeout(() => {
      console.log('Redirecting to:', redirectTo);
      navigate(redirectTo);
    }, delay);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate, redirectTo, delay]);

  return (
    <div className="loading-page">
      {/* Wave Animation - Full Duration */}
      <div className="loading-container wave-phase">
        <div className="wave-container">
          <h1 className="wave-text">
            <span>L</span>
            <span>u</span>
            <span>x</span>
            <span>e</span>
            <span>l</span>
            <span>e</span>
            <span>s</span>
            <span>e</span>
            <span>S</span>
            <span>o</span>
            <span>l</span>
            <span>u</span>
            <span>t</span>
            <span>i</span>
            <span>o</span>
            <span>n</span>
          </h1>
          <p className="wave-tagline">Premium Car Rental Services</p>
          
          {/* Loader Animation Below */}
          <div className="loader-below">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

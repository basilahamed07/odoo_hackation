import './landing.styles.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const LandingComponent = () => {
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };
  return (
   <div className="landing-container">
      <h1 className="brand-title">WornAgain</h1>
      <p className="brand-description">
        WornAgain is your destination for sustainable fashion. We believe in second chances—for clothes and for people. Swap, style, and save the planet with us.
      </p>

      <div className="nav-buttons">
    <div className="nav-dropdown">
            <button className="nav-button" onClick={toggleDropdown}>
              Start Swapping
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => navigate("/shop/men's")}>Men's Exchange</li>
                <li onClick={() => navigate("/shop/women's")}>Women's Exchange</li>
                <li onClick={() => navigate('/shop/jackets')}>Jackets Exchange</li>
                <li onClick={() => navigate('/shop/sneakers')}>Sneakers Exchange</li>
                <li onClick={() => navigate('/shop/hats')}>Hats Exchange</li>


              </ul>
            )}
          </div>
        <button className="nav-button" onClick={() => navigate('/shop')}>Browse All items</button>
        <button className="nav-button" onClick={() => navigate('/list-item')}>List an Item</button>
      </div>
    </div>
  );
}

export default LandingComponent;

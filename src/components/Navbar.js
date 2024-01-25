import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: '#525252',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

const centerHeadingStyle = {
  marginLeft: '625px',
  flex: '1',
};

function Navbar({ candidateCount }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={navbarStyle}>
      <div style={centerHeadingStyle}>
        <h1 className="header-title" data-testid='header-title'>Job Portal</h1>
      </div>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <button data-testid="register-button" style={linkStyle} onClick={() => handleNavigate('/candidate/registration')}>
          Register Candidate
        </button>
        <button data-testid="list-button" style={linkStyle} onClick={() => handleNavigate('/candidate/list')}>
          Candidate List ({candidateCount})
        </button>
      </div>
    </div>
  );
}

export default Navbar;

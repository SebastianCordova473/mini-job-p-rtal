import React from 'react';

const profileCardStyle = {
  // Define your profile card styles here
  // For example:
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '20px',
};

const skillsStyle = {
  // Define your skills styles here
  // For example:
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '5px',
  padding: '5px 10px',
  margin: '5px',
};

function ProfileCard({ candidate }) {
  return (
    <div className="profile-card" style={{ ...profileCardStyle, textAlign: 'left', marginRight: '10px' }}>
      <h2 style={{ marginBottom: '10px' }}>Role: {candidate.role}</h2>
      <p>Name: {candidate.name}</p>
      <p>Email: {candidate.email}</p>
      <div>
        <p style={{ fontWeight: 'bold' }}>Skills</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {candidate.skills.map((skill, index) => (
            <div key={index} style={skillsStyle}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

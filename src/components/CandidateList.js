import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';

const searchContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  textAlign: 'center',
};

const profileCardStyle = {
  backgroundColor: '#f0f0f0',
  padding: '10px',
  maxWidth: '600px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const searchBoxContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const searchBoxStyle = {
  flex: '1',
  padding: '10px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginRight: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

const searchButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#525252',
  color: 'white',
  border: 'none',
};

const listAllButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#525252',
  color: 'white',
  border: 'none'
};

function CandidateList() {
  const [searchText, setSearchText] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      const parsedCandidates = JSON.parse(storedCandidates);
      setCandidates(parsedCandidates);
      setFilteredCandidates(parsedCandidates); // Set filteredCandidates initially
    }
  }, []);

  const handleSearch = () => {
    // Convert search text to lowercase for case-insensitive search
    const lowerCaseSearchText = searchText.toLowerCase();

    // Filter candidates whose skills include the search text
    const filtered = candidates.filter(candidate =>
      candidate.skills.some(skill =>
        skill.toLowerCase().includes(lowerCaseSearchText)
      )
    );

    setFilteredCandidates(filtered);
  };

  const handleListAll = () => {
    // Reset to show all candidates
    setFilteredCandidates(candidates);
  };


  return (
    <div style={{ ...searchContainerStyle, alignItems: 'center' }}>
      <div style={searchBoxContainerStyle}>
        <input
          type="text"
          placeholder="search skills"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={searchBoxStyle}
        />
        <button style={searchButtonStyle} onClick={handleSearch}>
          Search Button
        </button>
        <button data-testid='candidate-card' style={listAllButtonStyle} onClick={handleListAll}>
          List All
        </button>
      </div>
      {filteredCandidates.length === 0 ? (
        <div style={{ color: 'red' }}>No candidates found.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {filteredCandidates.map((candidate) => (
            <ProfileCard key={candidate.id} candidate={candidate} style={profileCardStyle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateList;

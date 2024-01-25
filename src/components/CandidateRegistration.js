import React, { useState, useEffect } from 'react';

const alertMessageStyle = {
  marginTop: '5px',
  color: 'red',
};

const highlight = {
  border: '2px solid red',
  backgroundColor: 'red',
};

const centerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  textAlign: 'center',
};

const addSkillButtonStyle = {
  backgroundColor: '#525252',
  border: '1px solid #333',
  color: 'white',
  borderRadius: '5px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const formBoxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

const formGroupStyle = {
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
};

const sharpEdgeButtonStyle = {
  backgroundColor: '#525252',
  border: '1px solid #333',
  padding: '10px 20px',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const skillTagStyle = {
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '0',
  padding: '5px 10px',
  margin: '0 5px',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
};

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    skill: '',
    skills: [],
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const highlightInput = true;
  const [candidates, setCandidates] = useState([]);


  const handleAddSkill = () => {
    // Get the current skill value from the state
    const currentSkill = formData.skill.trim();

    // Check if the current skill is not an empty string and the skill limit is not reached
    if (currentSkill && formData.skills.length < 5) {
      // Update the skills array in the state with the new skill
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, currentSkill],
        skill: '', // Clear the skill input after adding
      }));
    }
  };



  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submission
    const isValid = validateForm();

    if (isValid) {
      // If the form is valid, proceed with form submission logic
      const newCandidate = {
        id: new Date().getTime(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        skills: formData.skills,
      };

      setCandidates([...candidates, newCandidate]);

      // Clear the form and display success message
      setFormData({
        name: '',
        email: '',
        role: '',
        skill: '',
        skills: [],
      });
      setRegistrationStatus('Candidate profile created');
    }
  };

  const handleReset = () => {
    // Reset the form data and clear the registration status
    setFormData({
      name: '',
      email: '',
      role: '',
      skill: '',
      skills: [],
    });
    setRegistrationStatus(null);
  };

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const validateForm = () => {
    // Implement form validation logic here
    // Check if the required fields are not empty and other validation rules
    // Return true if the form is valid, otherwise return false

    // Example validation: Name, Role, and Email are required
    if (!formData.name || !formData.role || !formData.email) {
      setRegistrationStatus('Please fill in all required fields.');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setRegistrationStatus('Please enter a valid email address.');
      return false;
    }


    return true;
  };

  return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid='registration-component' style={formBoxStyle}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                required
                style={inputStyle}
                data-testid='form-input-name'
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                data-testid='form-input-name'
                required
                style={{ ...inputStyle, ...(highlightInput ? highlight : {}) }}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Role"
                required
                style={inputStyle}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                data-testid="form-input-skill"
                type="text"
                name="skill"
                value={formData.skill}
                placeholder="Skill"
                onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                style={inputStyle}
              />
              <button data-testid="add-btn" type="button" style={addSkillButtonStyle} onClick={handleAddSkill}>
                Add Skill
              </button>
            </div>
            <div>
              {formData.skills.map((skill, index) => (
                <div key={index} data-testid="skill-tag" style={skillTagStyle}>
                  {skill}
                </div>
              ))}
            </div>
            <div style={buttonGroupStyle}>
              <button data-testid="submit-btn" type="submit" style={sharpEdgeButtonStyle}>
                Register
              </button>
              <button data-testid="reset-btn" type="button" style={sharpEdgeButtonStyle} onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
          {registrationStatus && (
            <div style={alertMessageStyle}>{registrationStatus}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;

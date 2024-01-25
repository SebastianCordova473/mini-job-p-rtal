import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CandidateList from "./components/CandidateList";
import CandidateRegistration from "./components/CandidateRegistration";

function App() {
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      const candidates = JSON.parse(storedCandidates);
      setCandidateCount(candidates.length);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar candidateCount={candidateCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate/list" element={<CandidateList />} />
          <Route path="/candidate/registration" element={<CandidateRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

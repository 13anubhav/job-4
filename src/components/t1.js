// pages/index.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageSelect = () => {
    // Redirect to the jobs page with the selected language as a query parameter
    router.push(`/jobs?language=${selectedLanguage}`);
  };

  return (
    <div>
      <h1>Welcome to the Job Search App</h1>
      <label>
        Select a programming language:
        <input
          type="text"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        />
      </label>
      <button onClick={handleLanguageSelect}>Search Jobs</button>
    </div>
  );
};

export default Home;

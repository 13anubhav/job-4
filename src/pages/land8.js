// pages/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Default value

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/adzuna1?what=${selectedLanguage}`);
      setJobs(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = () => {
    fetchData();
  };

  const shortenUrl = (url) => {
    return url.length > 30 ? url.substring(0, 30) + '...' : url;
  };

  return (
    <div>
      <h1>Adzuna Jobs</h1>
      <label>
        Select Language:
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="c++">C++</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Search Jobs</button>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Max Salary: {job.salary_max}</p>
            <p>Min Salary: {job.salary_min}</p>
            <p>Category: {job.category.label}</p>
            <p>Location: {job.location.area}</p>
            <p>Company Name: {job.company.display_name}</p>
            <p>URL: {shortenUrl(job.redirect_url)}</p>
            <Link href={{ pathname: '/job/[id]', query: { id: job.id, jobDetails: JSON.stringify(job) } }}>
              <p className="job-link">View Full Details</p>
            </Link>
            <p>Job id : {job.id}</p>
            <Link href={`/form/f3`}>
              <p className="job-link">Apply For this Job</p>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        div {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          color: #333;
          font-size: 32px;
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 10px;
        }

        select, button {
          font-size: 16px;
          padding: 8px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        .job-item {
          border: 1px solid #ddd;
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
        }

        h3 {
          color: #0070f3;
        }

        p {
          color: #555;
        }

        .job-link {
          color: #0070f3;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Home;

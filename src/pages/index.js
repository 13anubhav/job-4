// pages/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import HolidayChaloAI from './ai';
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Default value
  const [showScrollButton, setShowScrollButton] = useState(false);

  const fetchData = async () => {
    try {
      // const response = await axios.get(`/api/adzuna_282?what=${selectedLanguage}`);
      const response = await axios.get(`/api/adzuna_282?what=${selectedLanguage}`);
      setJobs(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedLanguage]);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = () => {
    fetchData();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shortenUrl = (url) => {
    return url.length > 30 ? url.substring(0, 30) + '...' : url;
  };

  return (
    <div className="container">
      <h1>Anubhav Job Search</h1>
      <label>
        Select Language:
        <select value={selectedLanguage} onChange={handleLanguageChange}>
         
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="nodeJs">NodeJs</option>
          <option value="datascience">Data Science</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Search Jobs</button>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <h3>{job.title}</h3>
            {/* <p>{job.description}</p> */}
            <p>Salary: 	£ {job.salary_max}</p>
            {/* <p>Min Salary: {job.salary_min}</p> */}
            {/* <p>Category: {job.category.label}</p> */}
            <p>Job Posted Time: {job.created}</p>
            <p>Location: {job.location.area}</p>
            <p>Company Name: {job.company.display_name}</p>
            <p>Job ID: {job.id}</p>
            {/* <p>URL: {shortenUrl(job.redirect_url)}</p> */}
            <Link href={{ pathname: '/job/[id]', query: { id: job.id, jobDetails: JSON.stringify(job) } }} target="_blank">
              <p className="job-link">View Full Details</p>
            </Link>
            {/* <p>Job ID: {job.id}</p> */}
            {/* <Link href={`/form/f3`}>
              <p className="job-link">Apply For this Job</p>
            </Link> */}
          </li>
        ))}
      </ul>

      {showScrollButton && (
        <div className="scroll-button" onClick={scrollToTop}>
          &uarr; 
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333;
          font-size: 32px;
          margin-bottom: 20px;
          text-align: center;
        }

        label {
          display: block;
          margin-bottom: 10px;
        }

        select,
        button {
          font-size: 16px;
          padding: 8px;
          margin-bottom: 20px;
        }

        button {
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        .job-item {
          border: 1px solid #ddd;
          margin: 20px 0;
          padding: 20px;
          border-radius: 10px;
          transition: box-shadow 0.3s ease-in-out;
        }

        .job-item:hover {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }

        h3 {
          color: #0070f3;
          margin-bottom: 10px;
        }

        p {
          color: #555;
          margin-bottom: 10px;
        }

        .job-link {
          color: #0070f3;
          text-decoration: underline;
          cursor: pointer;
        }

        .scroll-button {
          position: fixed;
          bottom: 28px;
          right: 20px; // Changed from 'right' to 'left'
          background-color: #0070f3;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>

    {/*  <HolidayChaloAI /> */}
    </div>
  );
};

export default Home;

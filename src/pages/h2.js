// pages/index.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Default value

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=9138079d&app_key=ae558c63fea85f27e8293e6c94f4b53f&what=${selectedLanguage}&results_per_page=15`
      );

      if (!response.ok) {
        throw new Error(`Adzuna API error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.results);
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
            {/* http://localhost:3000/job/ */}
            {/* <Link href={{ pathname: '/job/[id]', query: { id: job.id, jobDetails: JSON.stringify(job) } }}> */}
            <Link href={{ pathname: 'https://anubhav-job-portal.netlify.app/job/[id]', query: { id: job.id, jobDetails: JSON.stringify(job) } }}>
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

// // pages/api/adzuna.js
// export default async function handler(req, res) {
//   try {
//     const { what } = req.query;

//     const response = await fetch('https://api.adzuna.com/v1/api/jobs/gb/search/1', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       qs: {
//         app_id: '9138079d',
//         app_key: 'ae558c63fea85f27e8293e6c94f4b53f',
//         what, // Use the selected language passed from the frontend
//         results_per_page: 15,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Adzuna API error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Adzuna API error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

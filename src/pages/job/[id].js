import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ApplicationForm from '../form/f3';

const JobDetail = () => {
  const router = useRouter();
  const { id, jobDetails } = router.query;

  const [showApplicationForm, setShowApplicationForm] = useState(false);

  if (!jobDetails) {
    return <p>Loading...</p>;
  }

  const parsedJobDetails = JSON.parse(jobDetails);

  const handleApplyClick = () => {
    setShowApplicationForm(true);
  };

  return (
    <div>
      <h1>Job Details</h1>
      <p>Job ID: {id}</p>
      <p>Title: {parsedJobDetails.title}</p>
      <p>Description: {parsedJobDetails.description}</p>
      <p>Max Salary: {parsedJobDetails.salary_max}</p>
      <p>Min Salary: {parsedJobDetails.salary_min}</p>
      {/* Add more details as needed */}

      <button onClick={handleApplyClick}>Apply</button>

      {showApplicationForm && <ApplicationForm />}

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

        button {
          font-size: 16px;
          padding: 8px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        label {
          display: block;
          margin-bottom: 10px;
        }

        select {
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

export default JobDetail;

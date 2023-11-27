// pages/job/[id].js
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
    <div className="container">
      <h1>Job Details</h1>
      <div className="details-section">
        <p className="detail"><strong>Job ID:</strong> {id}</p>
        <p className="detail"><strong>Title:</strong> {parsedJobDetails.title}</p>
        <p className="detail"><strong>Description:</strong> {parsedJobDetails.description}</p>
        <p className="detail"><strong>Max Salary:</strong> {parsedJobDetails.salary_max}</p>
        <p className="detail"><strong>Min Salary:</strong> {parsedJobDetails.salary_min}</p>
      </div>

      <div className="details-section">
        <p className="detail"><strong>Category:</strong> {parsedJobDetails.category.label}</p>
        <p className="detail"><strong>Job Type:</strong> {parsedJobDetails.contract_type}</p>
        <p className="detail"><strong>Location:</strong> {parsedJobDetails.location.area}</p>
        <p className="detail"><strong>Location 2:</strong> {parsedJobDetails.location.display_name}</p>
        <p className="detail"><strong>Job Posted Time:</strong> {parsedJobDetails.created}</p>
      </div>

      {/* Add more details as needed */}

      <button onClick={handleApplyClick}>Apply Now</button>

<br />
<h1></h1>

      {showApplicationForm && <ApplicationForm />}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333;
          font-size: 32px;
          margin-bottom: 20px;
          text-align: center;
        }

        .details-section {
          margin-bottom: 20px;
        }

        .detail {
          color: #444;
          margin-bottom: 10px;
          font-size: 16px;
        }

        strong {
          font-weight: bold;
        }

        button {
          font-size: 16px;
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default JobDetail;

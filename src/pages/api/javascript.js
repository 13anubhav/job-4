// pages/jobs/javascript.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Jobs = ({ jobs }) => {
  return (
    <div>
      <h1>Jobs for {jobs.language}</h1>
      <ul>
        {jobs.list.map((job) => (
          <li key={job.id}>
            <Link href={`/jobs/${jobs.language}/${job.id}`}>
              <a>{job.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { language } = params;

  try {
    const { data } = await axios.get('/api/adzuna', {
      params: {
        app_id: '9138079d',
        app_key: 'ae558c63fea85f27e8293e6c94f4b53f',
        what: language,
      },
    });

    return {
      props: {
        jobs: {
          language,
          list: data.results,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        jobs: {
          language,
          list: [],
        },
      },
    };
  }
}

export default Jobs;

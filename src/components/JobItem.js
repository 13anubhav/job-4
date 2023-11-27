// components/JobItem.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const JobItem = ({ job }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/job/${job.id}`);
  };

  const shortenUrl = (url) => {
    return url.length > 30 ? url.substring(0, 30) + '...' : url;
  };

  return (
    <li key={job.id} className="job-item">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Max Salary: {job.salary_max}</p>
      <p>Min Salary: {job.salary_min}</p>
      <p>Category: {job.category.label}</p>
      <p>Location: {job.location.area}</p>
      <p>Company Name: {job.company.display_name}</p>
      <p>URL: {shortenUrl(job.redirect_url)}</p>
      <p className="job-link" onClick={handleViewDetails}>
        View Full Details
      </p>
      <p>Job id : {job.id}</p>
      <Link href={`/form/f3`}>
        <p className="job-link">Apply For this Job</p>
      </Link>
    </li>
  );
};

export default JobItem;
